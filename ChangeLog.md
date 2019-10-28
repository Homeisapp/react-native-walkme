2019-10-28 Version 1.1.1

Revert of Autolinking, due to issue with iOS compilation.

2019-10-28 Version 1.1.0

[Android] - Fixed a bug with 2 methods (setUserAttributes, setPrivateUserAttributes) that didn't work.

**Breaking**

[iOS] - Autolinking support

In ios/podfile - rename the pod reference to:
  pod 'react-native-walkme', :path => '../node_modules/react-native-walkme'
