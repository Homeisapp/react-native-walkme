import { NativeModules } from 'react-native';

const { RNWalkme } = NativeModules;

const RNWalkMeSDK = {
    start: function (key, secret) {
        RNWalkme.start(key, secret, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    restart: function () {
        RNWalkme.restart((error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    sendGoal: function (goalName, properties) {
        RNWalkme.sendGoal(goalName, properties, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    setUserAttribute: function (key, value) {
        RNWalkme.setUserAttribute(key, value, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    setUserAttributes: function (attributes) {
        RNWalkme.setUserAttributes(attributes, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    setPrivateUserAttribute: function (key, value) {
        RNWalkme.setPrivateUserAttribute(key, value, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    setPrivateUserAttributes: function (attributes) {
        RNWalkme.setPrivateUserAttributes(attributes, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    clearPrivateUserAttributes: function () {
        RNWalkme.clearPrivateUserAttributes((error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    setFlag: function (num) {
        RNWalkme.setFlag(num, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    trigger: function (trigger, deepLink) {
        RNWalkme.trigger(trigger, deepLink, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    },
    setUserID: function (userID) {
        RNWalkme.setUserID(userID, (error) => {
            if (error) {
                console.warn(error);
            }
        });
    }
};

export default RNWalkMeSDK;
