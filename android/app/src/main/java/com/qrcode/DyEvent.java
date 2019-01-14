package com.qrcode;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class DyEvent {
    public static ReactContext myContext;

    public void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,params);
    }
}
