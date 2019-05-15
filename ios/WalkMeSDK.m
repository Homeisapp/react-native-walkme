//
//  WalkMeSDK.m
//  DemoWalkTree
//
//  Created by Padam on 13/05/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "WalkMeSDK.h"
#import <React/RCTLog.h>
@implementation WalkMeSDK

RCT_EXPORT_MODULE();

/**
 * Starts ABBI SDK.
 *
 * @param appId The Application Id provided by WalkMe
 * @param appSecretKey The Application Secret key provided by WalkMe
 *
 * To get your Application Id and Application Secret key, login to WalkMe console at https://console.mobile.walkme.com
 * and click the settings icon near your Application Name. You can find more info here - https://walkme-mobile.zendesk.com/hc
 */

RCT_EXPORT_METHOD(start:(NSString *)key secret:(NSString *)secret)
{
  RCTLogInfo(@"WalkMeSDK Key: %@ SecretKey: %@", key, secret);
  dispatch_async(dispatch_get_main_queue(), ^{
    [ABBI start:key withSecretKey:secret andApplicationType:ABBI_APP_HYBRID];
  });
}

/**
 * Restarts a new SDK session
 *
 */

RCT_EXPORT_METHOD(restart)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [ABBI restart];
  });
}

/**
 * Sends a Goal to ABBI's Backend.
 * A Goal is a user action that can be used to target your users.
 *
 * Usage Example :@
 *
 * [ABBI sendGoal:@"Bought a blue sword" withProperites:nil]
 * [ABBI sendGoal:@"Bought a blue sword" withProperites:@{@"item_name", @"unlimited_calls"}]
 *
 * @param goalName the Goal name.
 * @param properties the Goal properties, key-value structured (if any).
 */

RCT_EXPORT_METHOD(sendGoal:(NSString *)goalName secret:(NSDictionary *)properties)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [ABBI sendGoal:goalName withProperites:properties];
  });
}


@end
