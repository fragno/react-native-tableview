'use strict';

const React = require('react');
const ReactNative = require('react-native');
const { 
    AppRegistry,
    Text,
    Dimensions,
    View,
    TouchableHighlight,
    TextInput,
    Image,
    Navigator,
    ListView
} = ReactNative;

const TableView = require('react-native-tableview');
const Section = TableView.Section;
const Item = TableView.Item;
const Cell = TableView.Cell;
const Header = TableView.Header;
const Footer = TableView.Footer;

class ExampleCustomCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionLabel: 'Section', 
            cellLabel: 'Cell 1', 
            cells:[
                <Cell key="3">
                    <Text>Cell 3</Text>
                </Cell>
            ]
        };
    }

    componentDidMount(){
        setTimeout(()=>this.setState({
            sectionLabel: 'Section #1',
            cellLabel: 'Cell #1',
            cells:[
                <Cell key="3">
                    <Text>Cell #3</Text>
                </Cell>,
                <Cell key="4">
                    <Text>Cell #4</Text>
                </Cell>]
        }));
    }

    render() {
        return (
            <TableView style={{flex:1, marginTop: 20}} onPress={(event) => alert(JSON.stringify(event))}>
                <Section label={this.state.sectionLabel}>
                    <Cell style={{backgroundColor:'gray'}} value='ds' key="1">
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{height:200, backgroundColor:'red'}} key="2">
                        <Text>{this.state.cellLabel}</Text>
                    </Cell>
                    <Cell style={{height:100}} key="4">
                        <Text>Cell 4</Text>
                    </Cell>
                    <Cell key="5"  image={require('./logo.png')}>
                        <Text>Cell 5</Text>
                    </Cell>
                </Section>
                <Section label="section 2">
                    <Cell style={{backgroundColor:'gray'}} value="1" key="1.1">
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1.1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1.1</Text>
                    </Cell>
                    <Cell style={{height:200, backgroundColor:'red'}} key="1.2">
                        <Text>Cell 1.2</Text>
                    </Cell>
                    <Cell key="3">
                        <Text>Cell 3</Text>
                    </Cell>
                    <Cell style={{height:100}} key="4">
                        <Text>Cell 4</Text>
                    </Cell>
                    <Cell key="5">
                        <Text>Cell 5</Text>
                    </Cell>
                </Section>
                <Section label="section 3">
                    {this.state.cells}
                </Section>
            </TableView>
        );
    }
}

class ExampleMultiSections extends React.Component {
    render(){
        return (
            <TableView style={{flex:1, marginTop: 20}}
                       allowsToggle={true}
                       allowsMultipleSelection={true}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Section label="Section 1" arrow={true}>
                    <Item value="1" detail="Detail1" >Item 1</Item>
                    <Item value="2">Item 2</Item>
                    <Item>Item 3</Item>
                    <Item>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                    <Item>Item 7</Item>
                    <Item>Item 8</Item>
                    <Item>Item 9</Item>
                    <Item>Item 10</Item>
                    <Item>Item 11</Item>
                    <Item>Item 12</Item>
                    <Item>Item 13</Item>
                    <Item>Item 14</Item>
                    <Item>Item 15</Item>
                    <Item>Item 16</Item>
                </Section>
                <Section label="Section 2" arrow={false}>
                    <Item selected={true}>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label="Section 3" arrow={false}>
                    <Item>Item 1</Item>
                    <Item selected={true}>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
            </TableView>
        );
    }
}

//Similar to ExampleMultiSections but use "TableViewExampleCell" reusable cells
class ReusableExampleMultiSections extends React.Component {
    render(){
        const numAdditionaItems = 1000;
        let moreItems = [];
        for(let i = 0; i < numAdditionaItems; ++i) {
            moreItems.push(i);
        }
        return (
            <TableView reactModuleForCell="TableViewExampleCell"
                       style={{flex:1, marginTop: 20}}
                       allowsToggle={true}
                       allowsMultipleSelection={true}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Section label="Section 1" arrow={true}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                    <Item backgroundColor="gray" height={44}>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                    <Item>Item 7</Item>
                    <Item>Item 8</Item>
                    <Item>Item 9</Item>
                    <Item backgroundColor="red" height={200}>Item 10</Item>
                    <Item>Item 11</Item>
                    <Item>Item 12</Item>
                    <Item>Item 13</Item>
                    <Item>Item 14</Item>
                    <Item>Item 15</Item>
                    <Item>Item 16</Item>
                </Section>
                <Section label="Section 2" arrow={false}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label="Section 3" arrow={true}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label={"large section - "+numAdditionaItems+" items"}>
                    {moreItems.map((i)=><Item key={i+1}>{i+1}</Item>)}
                </Section>
            </TableView>
        );
    }
}

class ListViewExample extends React.Component {
    constructor(props){
        super(props);
        this.numAdditionaItems = 1000;
        this.data = {};
        for(let i = 0; i < this.numAdditionaItems; ++i) {
            this.data[i] = i;
        }
        this.state = {dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })};
    }
    render() {
        let data = this.data;
        return (
            <ListView style={{marginTop: 64}}
                dataSource={this.state.dataSource.cloneWithRows(Object.keys(data))}
                renderRow={(k) => <Text onPress={(e)=>alert("item:"+k+", "+data[k])}> data: {data[k]}</Text>}
                />
        );
    }
}

class LargeTableExample extends React.Component {
    render() {
        const numAdditionaItems = 1000;
        const items = [];
        for (let i = 0; i < numAdditionaItems; ++i) {
            items.push(i);
        }
        return (
            <TableView reactModuleForCell="TableViewExampleCell"
                       style={{flex: 1, marginTop: 20}}
                       allowsToggle={true}
                       allowsMultipleSelection={true}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Section label={"large section - " + numAdditionaItems + " items"} arrow={true}>
                    {items.map((i) => <Item key={i + 1}>{i + 1}</Item>)}
                </Section>
            </TableView>
        );
    }
}

class CustomEditableExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:null,editing:false,text:""};
        this.reactCellModule = "TableViewExampleCell2";
    }
    onExternalData(data) {
        const self = this;
        if (self.state.editing) {
            console.warn("Ignoring update from firebase while editing data locally");
        } else {
            self.setState({data:data});
        }
    }
    editOrSave() {
        if (this.state.editing) {
            //Save edited data

            const self = this;
            let newData = (this.dataItemKeysBeingEdited || []).map(itemKey=>self.preEditData[itemKey]);
            this.dataItemKeysBeingEdited = null;
            this.preEditData = null;

            this.setState({editing: false, data: newData}, function() {
                //Simulate saving data remotely and getting a data-changed callback
                setTimeout(()=> self.onExternalData(newData), 2);
            });
        } else {
            this.preEditData = (this.state.data || []).slice(0);
            //Must be same ordering as used in rendering items
            this.dataItemKeysBeingEdited = Object.keys(this.state.data || {});
            this.setState({editing: true});
        }
    }
    cancelEditing() {
        let data = this.preEditData;
        this.dataItemKeysBeingEdited = null;
        this.preEditData = null;
        const self = this;

        self.setState({editing: false, data: data});
    }
    moveItem(info) {
        if (!this.dataItemKeysBeingEdited || info.sourceIndex >= this.dataItemKeysBeingEdited.length
            || info.destinationIndex >= this.dataItemKeysBeingEdited.length) {
            console.error("moved row source/destination indices are out of range");
            return;
        }
        const itemKey = this.dataItemKeysBeingEdited[info.sourceIndex];
        this.dataItemKeysBeingEdited.splice(info.sourceIndex, 1);
        this.dataItemKeysBeingEdited.splice(info.destinationIndex, 0, itemKey);

        const self = this;
        let newData = (this.dataItemKeysBeingEdited || []).map(itemKey=>self.preEditData[itemKey]);
        this.setState({data: newData});
    }
    deleteItem(info) {
        if (!this.dataItemKeysBeingEdited || info.selectedIndex >= this.dataItemKeysBeingEdited.length) {
            console.error("deleted row index is out of range");
            return;
        }
        this.dataItemKeysBeingEdited.splice(info.selectedIndex, 1);

        const self = this;
        let newData = (this.dataItemKeysBeingEdited || []).map(itemKey=>self.preEditData[itemKey]);
        this.setState({data: newData});
    }
    addItem() {
        const {text} = this.state;
        if (!text) return;
        const self = this;

        //Simulate saving data remotely and getting a data-changed callback
        setTimeout(()=>self.onExternalData(!this.state.data?[text]:[...(this.state.data), text]), 2);

        //clear text & hide keyboard
        this.setState({text:""});
        this.refs.addTextInput.blur();
    }
    onChange(info) {
        if (info.mode == 'move') {
            this.moveItem(info);
        } else if (info.mode == 'delete') {
            this.deleteItem(info);
        } else {
            console.error("unknown change mode: "+info.mode);
        }
    }
    renderItem(itemData, key, index) {
        return (
            <Item key={key} label={itemData}>
            </Item>);
    }
    getNavProps() {
        const self = this;
        const navProps = {
            title:{title:"Custom Editable"},
            rightButton: {
                title: (this.state.editing? 'Save':'Edit'),
                handler: function onNext() {
                    self.editOrSave();
                }
            }
        };
        navProps.leftButton = {
            title: (this.state.editing?'Cancel':'Back'),
            handler: function onNext() {
                if (self.state.editing)
                    self.cancelEditing();
                else {
                    Actions.pop();
                }
            }
        };
        return navProps;
    }
    getAddItemRow() {
        return (
            <View style={{paddingBottom: 4, height:44, flexDirection:"row", alignItems:"stretch"}}>
                <TextInput ref="addTextInput"
                           style={{flex:1, height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20}}
                           onChangeText={(text) => this.setState({text:text})}
                           value={this.state.text}
                />

                <TouchableHighlight onPress={(event)=>{this.addItem()}}
                                    style={{borderRadius:5, width:100,backgroundColor:"red",alignItems:"center",justifyContent:"center"}}>
                    <Text>Add</Text>
                </TouchableHighlight>
            </View>
        );
    }
    render() {
        let {data, editing} = this.state;
        if (!data) {
            data = {};
        }

        const self = this;
        const items = Object.keys(data).map((key,index)=>self.renderItem(data[key], key, index));

        return (
            <View style={{flex:1, marginTop:0}}>

                {!editing && this.getAddItemRow()}

                <TableView editing={editing}
                           style={{flex:1, marginTop: 20}}
                           reactModuleForCell={this.reactCellModule}
                           tableViewCellStyle={TableView.Consts.CellStyle.Default}
                           onChange={this.onChange.bind(this)}
                >
                    <Section label="editable" canMove={editing} canEdit={editing} arrow={!editing}>
                        {items}
                    </Section>
                </TableView>
            </View>
        );
    }
}

class ExampleCustomEditable extends React.Component {
    constructor(props){
        super(props);
        this.state = {editing: false};
    }
    render(){
        const self = this;
        return (
            <View style={{flex:1}}>
                <TableView style={{flex:1, marginTop: 20}}
                           editing={this.state.editing}
                           onPress={(event) => alert(JSON.stringify(event))}
                           onChange={(event) => alert("CHANGED:"+JSON.stringify(event))}>
                    <Section label="editable" canMove={true} canEdit={true}>
                        <Item canEdit={false}>Item 1</Item>
                        <Item>Item 2</Item>
                        <Item>Item 3</Item>
                        <Item>Item 4</Item>
                        <Item>Item 5</Item>
                        <Item>Item 6</Item>
                        <Item>Item 7</Item>
                        <Item>Item 8</Item>
                    </Section>
                </TableView>
            </View>
        );
    }
}

class Launch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sectionLabel: 'Section'};
    }

    componentDidMount(){
        setTimeout(()=>this.setState({sectionLabel: 'Section #1'}));
    }

    render(){
        return (
            <TableView style={{flex:1, marginTop: 20}}>
                <Section label={this.state.sectionLabel}  footerLabel="footerLabel" arrow={true}>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[1])}>
                        Example with custom cells
                    </Item>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[2])}>
                        Example with multiple sections
                    </Item>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[3])}>
                        Example with multiple sections (Use Reuse Cells)
                    </Item>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[4])}>
                        Large ListView (scroll memory growth)
                    </Item>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[5])}>
                        Reusable Large TableView Example
                    </Item>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[6])}>
                        Example with editing mode
                    </Item>
                    <Item onPress={() => this.props.navigator.push(this.props.routes[7])}>
                        Custom Editing Example
                    </Item>
                </Section>
            </TableView>
        );
    }
}

class TableViewExample extends React.Component {
    render() {
        const routes = [
            {title: 'TableView Demo', index: 0, component: Launch},
            {title: 'ExampleCustomCell', index: 1, component: ExampleCustomCell},
            {title: 'ExampleMultiSections', index: 2, component: ExampleMultiSections},
            {title: 'ReusableExampleMultiSections', index: 3, component: ReusableExampleMultiSections},
            {title: 'Large ListView Example', index: 4, component: ListViewExample},
            {title: 'Reusable Large TableView Example', index: 5, component: LargeTableExample},
            {title: 'ExampleCustomEditable', index: 6, component: ExampleCustomEditable},
            {title: 'Custom Editing Example', index: 7, component: CustomEditableExample},
        ];

        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} routes={routes} />
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                return (
                                    <Text onPress={ () => { navigator.pop() }}>
                                        Back
                                    </Text>);
                            },
                            RightButton: (route, navigator, index, navState) => {
                                return (<Text>Done</Text>);
                            },
                            Title: (route, navigator, index, navState) => {
                                return (<Text>{route.title}</Text>);
                            },
                        }}
                    />
                }/>
        );
    }
}

//Should be pure... setState on top-level component doesn't seem to work
class TableViewExampleCell extends React.Component {
    render(){
        //flex=1, Fill full height of the cell
        const style = {borderColor:"#aaaaaa", borderWidth:1, borderRadius:3, flex:1, marginTop: 20};
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }
        return (
            <View style={style}>
                <Text>section:{this.props.section},row:{this.props.row},label:{this.props.data.label}</Text>
            </View>);
    }
}

//Should be pure... setState on top-level component doesn't seem to work
class TableViewExampleCell2 extends React.Component {
    render(){
        //Fill full height of the cell
        const style = {flex:1, marginTop: 20};
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }
        return (
            <View style={style}>
                <Text>{this.props.data.label}</Text>
            </View>);
    }
}

AppRegistry.registerComponent('TableViewExample', () => TableViewExample);
AppRegistry.registerComponent('TableViewExampleCell', () => TableViewExampleCell);
AppRegistry.registerComponent('TableViewExampleCell2', () => TableViewExampleCell2);
