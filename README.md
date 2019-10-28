
# react-native-walkme

## Getting started

`$ npm install react-native-walkme --save`

### Mostly automatic installation

`$ react-native link react-native-walkme`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-walkme-rn` and add `RNWalkme.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNWalkme.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Add this line to your pod file: `pod 'react-native-walkme', :path => '../node_modules/react-native-walkme'`
5. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.homeis.RNWalkmePackage;` to the imports at the top of the file
  - Add `new RNWalkmePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-walkme'
  	project(':react-native-walkme').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-walkme/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-walkme')
  	```

## Usage
```javascript
import RNWalkme from 'react-native-walkme';

```
Get your walkme credentials and start by:

```javascript
RNWalkme.start(key, secret); 


```
