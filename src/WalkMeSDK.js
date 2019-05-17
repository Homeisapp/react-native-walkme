import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules} from 'react-native';
var WalkMeSDK = NativeModules.WalkMeSDK;


 export function start(key,secret) {
    WalkMeSDK.start(key,secret,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("start successfully");
        }
      });
}

export function restart() {
    WalkMeSDK.restart((error) => {
        if (error) {
          console.warn(error);
        }
        else{
            console.warn("restart successfully")
        }
      });
}

export function sendGoal(goalName,properties) {
    WalkMeSDK.sendGoal(goalName,properties,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("goal send successfully");
        }
      });
}

export function setUserAttribute(key,value) {
    WalkMeSDK.setUserAttribute(key,value,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("user attribute set successfully");
        }
      });
}

export function setUserAttributes(attributes) {
    WalkMeSDK.setUserAttributes(attributes,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("user attributes set successfully");
        }
      });
}

export function setPrivateUserAttribute(key,value) {
    WalkMeSDK.setPrivateUserAttribute(key,value,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("private user attribute set successfully");
        }
      });
}

export function setPrivateUserAttributes(attributes) {
    WalkMeSDK.setPrivateUserAttributes(attributes,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("private user attributes set successfully");
        }
      });
}

export function clearPrivateUserAttributes() {
    WalkMeSDK.clearPrivateUserAttributes((error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("clear private user attributes set successfully");
        }
      });
}

export function setFlag(num) {
    WalkMeSDK.setFlag(num,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("flag set successfully");
        }
      });
}

export function trigger(trigger,deepLink) {
    WalkMeSDK.trigger(trigger,deepLink,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("triggered successfully");
        }
      });
}

export function setUserID(userID) {
    WalkMeSDK.setUserID(userID,(error) => {
        if (error) {
          console.warn(error);
        } else {
          console.warn("user id set successfully");
        }
      });
}

