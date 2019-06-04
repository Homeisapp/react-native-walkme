
#import "RNWalkme.h"

@implementation RNWalkme

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

/**
 * Starts ABBI SDK.
 *
 * @param appId The Application Id provided by WalkMe
 * @param appSecretKey The Application Secret key provided by WalkMe
 *
 * To get your Application Id and Application Secret key, login to WalkMe console at https://console.mobile.walkme.com
 * and click the settings icon near your Application Name. You can find more info here - https://walkme-mobile.zendesk.com/hc
 */

RCT_EXPORT_METHOD(start:(NSString *)key secret:(NSString *)secret
                  callback:(RCTResponseSenderBlock)callback)
{
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if(key == nil || secret == nil){
            callback(@[@"key or secret should not be undefined"]);
        }else{
            [ABBI start:key withSecretKey:secret andApplicationType:ABBI_APP_HYBRID];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Restarts a new SDK session
 *
 */

RCT_EXPORT_METHOD(restart:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [ABBI restart];
        callback(@[[NSNull null]]);
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

RCT_EXPORT_METHOD(sendGoal:(NSString *)goalName secret:(NSDictionary *)properties callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (goalName == nil) {
            callback(@[@"goalname should not be undefined"]);
        }else{
            [ABBI sendGoal:goalName withProperites:properties];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Sets a user attribute
 *
 * @param key the attribute key
 * @param value the attribute value
 *
 * @code
 * Usage Examples:
 * [ABBI setUserAttributeWithKey:@"isProUser" andValue:@YES];
 * [ABBI setUserAttributeWithKey:@"isLoggedIn" andValue:@(0)];
 */

RCT_EXPORT_METHOD(setUserAttribute:(NSString *)key value:(id)value callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(key == nil || value == nil){
            callback(@[@"key or value should not be undefined"]);
        }else{
            [ABBI setUserAttributeWithKey:key andValue:value];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Sets multiple user attributes
 *
 * @param attributes the user attributes
 *
 * @code
 * Usage Example:
 * [ABBI setUserAttributes:@{@"isProUser": @YES, @"isLoggedIn": @(0)}];
 */

RCT_EXPORT_METHOD(setUserAttributes:(NSDictionary *)attributes callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(attributes == nil){
            callback(@[@"attributes should not be undefined"]);
        }else{
            [ABBI setUserAttributes:attributes];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Sets a private user attribute
 *
 * @param key the attribute key
 * @param value the attribute value
 *
 * @code
 * Usage Examples:
 * [ABBI setPrivateUserAttributeWithKey:@"gender" andValue:@"female"];
 * [ABBI setPrivateUserAttributeWithKey:@"balance" andValue:@(1000)];
 */

RCT_EXPORT_METHOD(setPrivateUserAttribute:(NSString *)key value:(id)value callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(key == nil || value == nil){
            callback(@[@"key or value should not be undefined"]);
        }else{
            [ABBI setPrivateUserAttributeWithKey:key andValue:value];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Sets multiple private user attributes
 *
 * @param attributes the private user attributes
 *
 * @code
 * Usage Example:
 * [ABBI setPrivateUserAttributes:@{@"gender": @"female", @"balance": @(1000)}];
 */

RCT_EXPORT_METHOD(setPrivateUserAttributes:(NSDictionary *)attributes callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(attributes == nil){
            callback(@[@"attributes should not be undefined"]);
        }else{
            [ABBI setPrivateUserAttributes:attributes];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Clears all private user attributes
 */

RCT_EXPORT_METHOD(clearPrivateUserAttributes:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [ABBI clearPrivateUserAttributes];
        callback(@[[NSNull null]]);
    });
}

/**
 * Utility function for remote sessions with ABBI support team.
 *
 * @param n Will be given by ABBI support team when needed
 */

RCT_EXPORT_METHOD(setFlag:(NSNumber *)num callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(num == nil){
            callback(@[@"num value should not be undefined"]);
        }else{
            [ABBI setFlag:num.intValue];
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Launches a campaign by trigger key after redirecting the user to the given deep link
 * Once invoked, the method will show the campaign WITHOUT any of its segments (if defined)
 *
 * @code
 * Usage Example :
 * [ABBI trigger:@"Show How To Order Credit Card" withDeepLink:@"myapp://main_screen"];
 */

RCT_EXPORT_METHOD(trigger:(NSString *)trigger deepLink:(NSString *)deepLink callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(trigger == nil){
            callback(@[@"Trigger should not be undefined"]);
        }
        else{
            if (deepLink == nil) {
                [ABBI trigger:trigger];
            }else{
                [ABBI trigger:trigger withDeepLink:deepLink];
            }
            callback(@[[NSNull null]]);
        }
    });
}

/**
 * Sets user id
 *
 * @param userId the user id as NSString
 *
 * @code
 * Usage Example:
 * [ABBI setUserID:@"myuserid"];
 */

RCT_EXPORT_METHOD(setUserID:(NSString *)userId callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (userId == nil) {
            callback(@[@"UserId should not be undefined"]);
        }else{
            [ABBI setUserID:userId];
            callback(@[[NSNull null]]);
        }
    });
}

@end
  
