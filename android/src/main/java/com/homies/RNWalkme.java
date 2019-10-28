
package com.homeis;


import android.content.Context;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import abbi.io.abbisdk.ABBI;
import abbi.io.abbisdk.ABBIFlags;
import javax.annotation.Nonnull;



/**
 * This class echoes a string called from JavaScript.
 */

public class RNWalkme extends ReactContextBaseJavaModule {
  private Context context;

  @Nonnull
  @Override
  public String getName() {
    return "RNWalkme";
  }

  public RNWalkme(ReactApplicationContext reactContext) {
    super(reactContext);
    this.context = reactContext;
  }

  /**
   * Starts ABBI SDK.
   *
   * @param key The Application Id provided by WalkMe
   * @param secret The Application Secret key provided by WalkMe
   *
   * To get your Application Id and Application Secret key, login to WalkMe console at https://console.mobile.walkme.com
   * and click the settings icon near your Application Name. You can find more info here - https://walkme-mobile.zendesk.com/hc
   */

  @ReactMethod
  public void start(String key, String secret,Callback callback){
    if (this.getCurrentActivity() == null) {
         callback.invoke("Activity is null");
    } else if (key != null && secret != null) {
      ABBI.setFlag(ABBIFlags.ABBI_APP_HYBRID.getValue());
      ABBI.start(key, secret, this.getCurrentActivity());
      callback.invoke((Object)null);
    } else {
      callback.invoke("key or secret should not be undefined");
    }
  }

  /**
   * Restarts a new SDK session
   *
   */

  @ReactMethod
  public void restart(Callback callback){
    ABBI.restart();
    callback.invoke((Object)null);
  }

  /**
   * Sends a Goal to ABBI's Backend.
   * A Goal is a user action that can be used to target your users.
   *
   * Usage Example :@
   *
   *  ABBI.sendGoal("Bought a blue sword", null);
   *  ABBI.sendGoal("Bought a blue sword", {"item_name":"unlimited_calls"});
   *
   * @param goalName the Goal name.
   * @param object the Goal properties, key-value structured (if any).
   */
  @ReactMethod
  public void sendGoal(String goalName, JSONObject object,Callback callback){
    if (goalName != null) {
      Map<String, Object> properties = null;
      if (object != null) {
        properties = toMap(object);
      }
      ABBI.sendGoal(goalName, properties);
      callback.invoke((Object)null);
    }
    else{
      callback.invoke("goalname should not be undefined");
    }
  }

  /**
   * Sets a user attribute
   *
   * @param key the attribute key
   * @param value the attribute value
   *
   * @code
   * Usage Examples:
   * ABBI.setUserAttributeWithKey("isProUser", true);
   * ABBI.setUserAttributeWithKey("isLoggedIn", 0);
   *
   */

  @ReactMethod
  public void setUserAttribute(String key, Object value,Callback callback){
    if (key != null && value != null) {
      ABBI.setUserAttribute(key, value);
      callback.invoke((Object)null);
    } else {
      callback.invoke("key or value should not be undefined");
    }
  }

  /**
   * Sets multiple user attributes
   *
   * @param attributes the user attributes
   *
   * @code
   * Usage Example:
   * ABBI.setUserAttributes({"isProUser":true,"isLoggedIn":0});
   */
  @ReactMethod
  public void setUserAttributes(ReadableMap object,Callback callback){
    if (object != null) {
      ABBI.setUserAttributes(object.toHashMap());
      callback.invoke((Object)null);
    } else {
      callback.invoke("attributes should not be undefined");
    }
  }

  /**
   * Sets a private user attribute
   *
   * @param key the attribute key
   * @param value the attribute value
   *
   * @code
   * Usage Examples:
   * ABBI.setPrivateUserAttribute("gender", "female");
   * ABBI.setPrivateUserAttribute("balance", 1000);
   */

  @ReactMethod
  public void setPrivateUserAttribute(String key, Object value,Callback callback){
    if (key != null && value != null) {
      ABBI.setPrivateUserAttribute(key, value);
      callback.invoke((Object)null);
    } else {
      callback.invoke("key or value should not be undefined");
    }
  }

  /**
   * Sets multiple private user attributes
   *
   * @param object the private user attributes
   *
   * @code
   * Usage Example:
   * ABBI.setPrivateUserAttributes({"gender":"female","balance":1000});
   */

  @ReactMethod
  public void setPrivateUserAttributes(ReadableMap object,Callback callback){
    if (object != null) {
      ABBI.setPrivateUserAttributes(object.toHashMap());
      callback.invoke((Object)null);
    } else {
      callback.invoke("attributes should not be undefined");
    }
  }

  /**
   * Clears all private user attributes
   */

  @ReactMethod
  public void clearPrivateUserAttributes(Callback callback){
    ABBI.clearPrivateUserAttributes();
    callback.invoke((Object)null);
  }

  /**
   * Utility function for remote sessions with ABBI support team.
   *
   * @param flag Will be given by ABBI support team when needed
   *
   * @code
   * Usage Example:
   * ABBI.setFlag(1);
   */

  @ReactMethod
  public void setFlag(int flag,Callback callback){
    ABBI.setFlag(flag);
    callback.invoke((Object)null);
  }

  /**
   * Launches a campaign by trigger key after redirecting the user to the given deep link
   * Once invoked, the method will show the campaign WITHOUT any of its segments (if defined)
   *
   * @code
   * Usage Example :
   * ABBI.trigger("Show How To Order Credit Card", "myapp://main_screen");
   */

  @ReactMethod
  public void trigger(String trigger,String deeplink,Callback callback){
    if (trigger != null && deeplink != null) {
      ABBI.trigger(trigger, deeplink);
      callback.invoke((Object)null);
    } else {
      callback.invoke("trigger or deeplink should not be undefined");
    }
  }

  /**
   * Sets user id
   *
   * @param userId the user id as NSString
   *
   * @code
   * Usage Example:
   * ABBI.setUserId("myuserid");
   */

  @ReactMethod
  public void setUserID(String userId,Callback callback){
    if (userId != null) {
      ABBI.setUserId(userId);
      callback.invoke((Object)null);
    } else {
      callback.invoke("userId should not be undefined");
    }
  }


  // Helpers
  private Map<String, Object> toMap(JSONObject object) {
    Map<String, Object> map = new HashMap<>();

    try {
      Iterator<String> keysItr = object.keys();
      while (keysItr.hasNext()) {
        String key = keysItr.next();
        Object value = object.get(key);

        if (value instanceof JSONArray) {
          value = toList((JSONArray) value);
        } else if (value instanceof JSONObject) {
          value = toMap((JSONObject) value);
        }
        map.put(key, value);
      }
    } catch (Exception ignored) {
      return null;
    }

    return map;
  }

  private List<Object> toList(JSONArray array) {
    List<Object> list = new ArrayList<>();
    try {
      for (int i = 0; i < array.length(); i++) {
        Object value = array.get(i);
        if (value instanceof JSONArray) {
          value = toList((JSONArray) value);
        } else if (value instanceof JSONObject) {
          value = toMap((JSONObject) value);
        }

        list.add(value);
      }
    } catch (Exception ignored) {
      return null;
    }

    return list;
  }

}
