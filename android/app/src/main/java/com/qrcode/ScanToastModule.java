package com.qrcode;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.SimpleAdapter;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Timer;
/**
 * Created by jialin on 2018/8/16.
 */
public class ScanToastModule extends ReactContextBaseJavaModule {

    private static String TAG= ScanToastModule.class.getSimpleName();

    //    private ScanThread scanThread;
    private List<Barcode> listBarcode=new ArrayList<>();
    private List<Map<String,String>> listMap;
    private SimpleAdapter adapter = null;
    private Callback callback;
    private Timer scanTimer = null;

    private KeyReceiver keyReceiver;
    private ScanThread scanThread;

    public ScanToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.init();
    }

    private void init() {
        try{
            this.scanThread=new ScanThread(getReactApplicationContext());
        }catch (Exception e){

        }

        this.scanThread.start();

        Util.initSoundPool(getReactApplicationContext());

        this.keyReceiver=new KeyReceiver();
        IntentFilter filter=new IntentFilter();
        filter.addAction("android.rfid.FUN_KEY");
        filter.addAction("android.intent.action.FUN_KEY");
        getReactApplicationContext().registerReceiver(keyReceiver , filter);
    }

    @Override
    public String getName() {
        return "ScanToastAndroid";
    }

//
//    private Handler mHandler=new Handler() {
//        @Override
//        public void handleMessage(Message msg) {
//            if(msg.what==ScanThread.SCAN){
//                String data=msg.getData().getString("data");
//                Log.e(TAG,"data="+data);
//
//
//                Util.play(1,0);
//            }
//        }
//    };



    @ReactMethod
    public void scanQRCode(){
        Util.play(1,0);
        scanThread.scan();
    }



    private boolean mIsPressed;

    private class KeyReceiver extends BroadcastReceiver {



        @Override
        public void onReceive(Context context, Intent intent) {
            int keyCode=intent.getIntExtra("keyCode",0);

            if(keyCode==0){
                keyCode=intent.getIntExtra("keyCode",0);
            }

            boolean keyDown=intent.getBooleanExtra("keydown",false);
            if(keyDown&&!mIsPressed){
                switch (keyCode) {
                    case KeyEvent.KEYCODE_F1:
                        Util.play(1,0);
                        break;
                    case KeyEvent.KEYCODE_F2:

                    case KeyEvent.KEYCODE_F3:

                    case KeyEvent.KEYCODE_F4:

                    case KeyEvent.KEYCODE_F5:
                        Util.play(1,0);
                        mIsPressed = true;
                        scanThread.scan();
                        break;
                    default:
                        Util.play(1,0);
                        //开启扫描
                        mIsPressed = true;
                        scanThread.scan();
                        break;
                }
            }else
            {
                mIsPressed=false;
            }
        }
    }
}

