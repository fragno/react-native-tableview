//
//  RNTableHeaderView.m
//  RNTableView
//
//  Created by Pavlo Aksonov on 09.11.15.
//  Copyright © 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableHeaderView.h"

@implementation RNTableHeaderView

-(void)setComponentHeight:(float)componentHeight {
    _componentHeight = componentHeight;
    if (componentHeight){
        _tableView.tableHeaderView = self;
    }
}

-(void)setComponentWidth:(float)componentWidth {
    _componentWidth = componentWidth;
    if (componentWidth){
        _tableView.tableHeaderView = self;
    }
}

@end
