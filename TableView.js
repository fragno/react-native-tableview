'use strict';
import React, { Component } from 'react';
import {
    NativeMethodsMixin,
    ReactNativeViewAttributes,
    NativeModules,
    StyleSheet,
    View,
    requireNativeComponent,
    EdgeInsetsPropType,
    PointPropType,
    findNodeHandle,
} from 'react-native';

const RNTableViewConsts = NativeModules.UIManager.RNTableView.Constants;
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

function extend(item, map) {
    for (let i in map)
        if (typeof(map[i]) != 'object')
            item[i] = map[i];
    return item;
}

const TableView = React.createClass({
    mixins: [NativeMethodsMixin],

    propTypes: {
        onPress: React.PropTypes.func,
        onAccessoryPress: React.PropTypes.func,
        onWillDisplayCell: React.PropTypes.func,
        onEndDisplayingCell: React.PropTypes.func,
        selectedValue: React.PropTypes.any, // string or integer basically
        autoFocus: React.PropTypes.bool,
        autoFocusAnimate: React.PropTypes.bool,
        alwaysBounceVertical: React.PropTypes.bool,
        moveWithinSectionOnly: React.PropTypes.bool,
        textColor: React.PropTypes.string,
        detailTextColor: React.PropTypes.string,
        tintColor: React.PropTypes.string,
        footerLabel: React.PropTypes.string,
        headerFont: React.PropTypes.number,
        headerTextColor: React.PropTypes.string,
        footerTextColor: React.PropTypes.string,
        separatorColor: React.PropTypes.string,
        scrollEnabled: React.PropTypes.bool,
        showsHorizontalScrollIndicator: React.PropTypes.bool,
        showsVerticalScrollIndicator: React.PropTypes.bool,
        onScroll: React.PropTypes.func,


        /**
         * The amount by which the content is inset from the edges
         * of the TableView. Defaults to `{0, 0, 0, 0}`.
         * @platform ios
         */
        contentInset: EdgeInsetsPropType,
        /**
         * Used to manually set the starting scroll offset.
         * The default value is `{x: 0, y: 0}`.
         * @platform ios
         */
        contentOffset: PointPropType,
        /**
         * The amount by which the scroll view indicators are inset from the
         * edges of the TableView. This should normally be set to the same
         * value as the `contentInset`. Defaults to `contentInset` or
         * `{0, 0, 0, 0}`.
         * @platform ios
         */
        scrollIndicatorInsets: EdgeInsetsPropType,
        tableViewCellEditingStyle: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            tableViewCellEditingStyle: RNTableViewConsts.CellEditingStyle.Delete,
            autoFocusAnimate: true,
            alwaysBounceVertical: true,
            scrollEnabled: true,
            showsHorizontalScrollIndicator: true,
            showsVerticalScrollIndicator: true,
        };
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        var state = this._stateFromProps(nextProps);
        this.setState(state);
    },

    /**
     * Translate TableView prop and children into stuff that RNTableView understands
     * this make it possible to avoid create too much unnessary cells
     * @param props
     * @returns {{sections: Array, additionalItems: Array, children: Array}}
     * @private
     */
    _stateFromProps: function(props) {
        let sections = [];
        let additionalItems = [];
        let children = [];

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            let items=[];
            let count = 0;
            if (section && section.type === TableView.Section) {
                let hasCustomCells = false;

                // iterate over rows
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    let item = {};
                    extend(item, section.props);
                    extend(item, child.props);
                    if (item.children) {
                        item.label = item.children;
                    }

                    if (item.image && typeof item.image === 'number') {
                        item.image = resolveAssetSource(item.image);
                    }

                    count++;
                    items.push(item);

                    if (child.type === TableView.Cell) {
                        hasCustomCells = true;
                        count++;
                        var element = React.cloneElement(child, {key: index+" "+itemIndex, section: index, row: itemIndex});
                        children.push(element);
                    }

                });

                sections.push({
                    hasCustomCells,
                    label: section.props.label,
                    footerLabel: section.props.footerLabel,
                    footerHeight: section.props.footerHeight,
                    headerHeight: section.props.headerHeight,
                    items: items,
                    count: count
                });

            } else if (section && section.type === TableView.Item) {
                let item = extend({}, section.props);
                if (!item.label){
                    item.label = item.children;
                }
                additionalItems.push(item);

            } else if (section) {
                children.push(section);
            }
        });
        this.sections = sections;
        return {sections, additionalItems, children};
    },

    scrollTo: function(x, y, animated) {
      NativeModules.RNTableViewManager.scrollTo(
        findNodeHandle(this.tableView),
        x,
        y,
        animated
      );
    },

    render: function() {
        return (
            <View style={[{flex:1}, this.props.style]}>
                <RNTableView
                    ref={(ref) => { this.tableView = ref; }}
                    style={this.props.style}
                    sections={this.state.sections}
                    additionalItems={this.state.additionalItems}
                    tableViewStyle={TableView.Consts.Style.Plain}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    tableViewCellEditingStyle={this.props.tableViewCellEditingStyle}
                    separatorStyle={TableView.Consts.SeparatorStyle.Line}
                    scrollIndicatorInsets={this.props.contentInset}
                    alwaysBounceVertical={this.props.alwaysBounceVertical}
                    {...this.props}
                    onScroll={this._onScroll}
                    onPress={this._onPress}
                    onAccessoryPress={this._onAccessoryPress}
                    onChange={this._onChange}
                    onWillDisplayCell={this._onWillDisplayCell}
                    onEndDisplayingCell={this._onEndDisplayingCell}>
                    {this.state.children}
                </RNTableView>
            </View>
        );
    },

    _onScroll: function(event) {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    },
    _onPress: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress(data);
        }
        if (this.props.onPress) {
            this.props.onPress(data);
        }
        event.stopPropagation();
    },
    _onAccessoryPress: function(event) {
        console.log('_onAccessoryPress', event);
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.accessoryIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.accessoryIndex].onAccessoryPress){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.accessoryIndex].onAccessoryPress(data);
        }
        if (this.props.onAccessoryPress) {
            this.props.onAccessoryPress(data);
        }
        event.stopPropagation();
    },
    _onChange: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange(data);
        }
        if (this.props.onChange) {
            this.props.onChange(data);
        }
        event.stopPropagation();
    },
    _onWillDisplayCell: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.section] &&
            this.sections[data.section].items[data.row] &&
            this.sections[data.section].items[data.row].onWillDisplayCell) {
            this.sections[data.section].items[data.row].onWillDisplayCell(data);
        }
        if (this.props.onWillDisplayCell) {
            this.props.onWillDisplayCell(data);
        }
        event.stopPropagation();
    },
    _onEndDisplayingCell: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.section] &&
            this.sections[data.section].items[data.row] &&
            this.sections[data.section].items[data.row].onEndDisplayingCell) {
            this.sections[data.section].items[data.row].onEndDisplayingCell(data);
        }
        if (this.props.onEndDisplayingCell) {
            this.props.onEndDisplayingCell(data);
        }
        event.stopPropagation();
    },
});

TableView.Item = React.createClass({
    propTypes: {
        value: React.PropTypes.any, // string or integer basically
        label: React.PropTypes.string,
    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

TableView.Footer = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNFooterView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}}
                             {...this.props}
                             componentWidth={this.state.width}
                             componentHeight={this.state.height}/>
    },
});
var RNFooterView = requireNativeComponent('RNTableFooterView', null);

TableView.Header = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNHeaderView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}}
                             {...this.props}
                             componentWidth={this.state.width}
                             componentHeight={this.state.height}/>
    },
});
var RNHeaderView = requireNativeComponent('RNTableHeaderView', null);

TableView.Cell = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNCellView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}}
                           {...this.props}
                           componentWidth={this.state.width}
                           componentHeight={this.state.height}/>
    },
});
var RNCellView = requireNativeComponent('RNCellView', null);

TableView.Section = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        footerLabel: React.PropTypes.string,
        arrow: React.PropTypes.bool,
        footerHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,

    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

var styles = StyleSheet.create({
    tableView: {
        // The picker will conform to whatever width is given, but we do
        // have to set the component's height explicitly on the
        // surrounding view to ensure it gets rendered.
        //height: RNTableViewConsts.ComponentHeight,
    },
});
TableView.Consts = RNTableViewConsts;

var RNTableView = requireNativeComponent('RNTableView', null);

module.exports = TableView;
