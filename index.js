import { NativeModules } from 'react-native';

const { RNWalkme } = NativeModules;

const RNWalkMeSDK = {
    start: function (key, secret) {
        RNWalkme.start(key, secret, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('start successfully');
            }
        });
    },
    restart: function () {
        RNWalkme.restart((error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('restart successfully')
            }
        });
    },
    sendGoal: function (goalName, properties) {
        RNWalkme.sendGoal(goalName, properties, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('goal send successfully');
            }
        });
    },
    setUserAttribute: function (key, value) {
        RNWalkme.setUserAttribute(key, value, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('user attribute set successfully');
            }
        });
    },
    setUserAttributes: function (attributes) {
        RNWalkme.setUserAttributes(attributes, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('user attributes set successfully');
            }
        });
    },
    setPrivateUserAttribute: function (key, value) {
        RNWalkme.setPrivateUserAttribute(key, value, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('private user attribute set successfully');
            }
        });
    },
    setPrivateUserAttributes: function (attributes) {
        RNWalkme.setPrivateUserAttributes(attributes, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('private user attributes set successfully');
            }
        });
    },
    clearPrivateUserAttributes: function () {
        RNWalkme.clearPrivateUserAttributes((error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('clear private user attributes set successfully');
            }
        });
    },
    setFlag: function (num) {
        RNWalkme.setFlag(num, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('flag set successfully');
            }
        });
    },
    trigger: function (trigger, deepLink) {
        RNWalkme.trigger(trigger, deepLink, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('triggered successfully');
            }
        });
    },
    setUserID: function (userID) {
        RNWalkme.setUserID(userID, (error) => {
            if (error) {
                console.warn(error);
            } else {
                console.warn('user id set successfully');
            }
        });
    }
};

export default RNWalkMeSDK;
