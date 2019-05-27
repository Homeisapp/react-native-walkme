
import { NativeModules } from 'react-native';

const { RNWalkme } = NativeModules;

export default RNWalkme{
     function start(key,secret) {
        RNWalkme.start(key,secret,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("start successfully");
            }
          });
    }
    
     function restart() {
        RNWalkme.restart((error) => {
            if (error) {
              console.warn(error);
            }
            else{
                console.warn("restart successfully")
            }
          });
    }
    
    function sendGoal(goalName,properties) {
        RNWalkme.sendGoal(goalName,properties,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("goal send successfully");
            }
          });
    }
    
     function setUserAttribute(key,value) {
        RNWalkme.setUserAttribute(key,value,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("user attribute set successfully");
            }
          });
    }
    
    function setUserAttributes(attributes) {
        RNWalkme.setUserAttributes(attributes,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("user attributes set successfully");
            }
          });
    }
    
     function setPrivateUserAttribute(key,value) {
        RNWalkme.setPrivateUserAttribute(key,value,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("private user attribute set successfully");
            }
          });
    }
    
    function setPrivateUserAttributes(attributes) {
        RNWalkme.setPrivateUserAttributes(attributes,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("private user attributes set successfully");
            }
          });
    }
    
    function clearPrivateUserAttributes() {
        RNWalkme.clearPrivateUserAttributes((error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("clear private user attributes set successfully");
            }
          });
    }
    
    function setFlag(num) {
        RNWalkme.setFlag(num,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("flag set successfully");
            }
          });
    }
    
    function trigger(trigger,deepLink) {
        RNWalkme.trigger(trigger,deepLink,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("triggered successfully");
            }
          });
    }
    
    function setUserID(userID) {
        RNWalkme.setUserID(userID,(error) => {
            if (error) {
              console.warn(error);
            } else {
              console.warn("user id set successfully");
            }
          });
    }
}
