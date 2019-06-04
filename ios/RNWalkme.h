
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
#import <WalkMeSDK/WalkMeSDK.h>

@interface RNWalkme : NSObject <RCTBridgeModule>

@end
  
