package com.qrcode;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import cn.pda.serialport.SerialPort;


public class ScanThread extends Thread {

    private static String TAG = ScanThread.class.getSimpleName();

    private SerialPort mSerialPort;
    private InputStream is;
    private OutputStream os;
    /* serialport parameter */
    private int port = 0;
    private int baudrate = 9600;
    //	private int baudrate = 4800;
    private int flags = 0;
    private ReactApplicationContext context;

    public final static int SCAN = 1001; // messege recv mode

    /**
     * if throw exception, serialport initialize fail.
     *
     * @throws SecurityException
     * @throws IOException
     */
    public ScanThread(ReactApplicationContext reactApplicationContext) throws SecurityException, IOException {

        this.context=reactApplicationContext;
        mSerialPort = new SerialPort(port, baudrate, flags);
        mSerialPort.scaner_poweron();
        mSerialPort.rfid_poweron();
        is = mSerialPort.getInputStream();
        os = mSerialPort.getOutputStream();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        /** clear useless data **/
        byte[] temp = new byte[1024];
        is.read(temp);
    }

    @Override
    public void run() {
        try {
            int size = 0;
            byte[] buffer = new byte[1024];
            int available = 0;
            while (!isInterrupted()) {
                available = is.available();
                if (available > 0) {
                    Log.e(TAG, "available = " + available);
                    size = is.read(buffer);
                    if (size > 0) {
                        sendMessege(buffer, size, SCAN,context);
                    }
                    Thread.sleep(50);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        super.run();
    }

    private void sendMessege(byte[] data, int dataLen, int mode,ReactApplicationContext context) {
        try {
            String dataStr = new String(data, 0, dataLen);
            Bundle bundle = new Bundle();
            bundle.putString("data", dataStr);
            Message msg = new Message();
            msg.what = mode;
            msg.setData(bundle);
          //  handler.sendMessage(msg);
            WritableMap wm = new WritableNativeMap();
            //wm.putString("SCAN", msg.getData().toString());
            wm.putString("SCAN", dataStr);
            new DyEvent().sendEvent(context, "EventName", wm);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void scan() {
        if (mSerialPort.scaner_trig_stat() == true) {
            mSerialPort.scaner_trigoff();
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        mSerialPort.scaner_trigon();
    }

    public void close() {
        if (mSerialPort != null) {
            mSerialPort.scaner_poweroff();
            mSerialPort.rfid_poweroff();
            try {
                if (is != null) {
                    is.close();
                }
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            mSerialPort.close(port);
        }
    }

}
