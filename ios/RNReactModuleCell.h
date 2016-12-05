//
//  RNReactModuleCell.h
//  RCTTableView
//
//  Created by Pavlo Aksonov on 24.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//
#import <UIKit/UIKit.h>

@interface RNReactModuleCell : UITableViewCell

- (id)initWithStyle:(UITableViewCellStyle)style
    reuseIdentifier:(NSString *)reuseIdentifier
             bridge:(RCTBridge*) bridge
               data:(NSDictionary*)data
          indexPath:(NSIndexPath*)indexPath
        reactModule:(NSString*)reactModule
       tableViewTag:(NSNumber*)reactTag;

-(void)setUpAndConfigure:(NSDictionary*)data
                  bridge:(RCTBridge*)bridge
               indexPath:(NSIndexPath*)indexPath
             reactModule:(NSString*)reactModule
            tableViewTag:(NSNumber*)reactTag;

@end
