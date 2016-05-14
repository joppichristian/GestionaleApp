package com.example.gestionaleclj;

import android.app.Activity;  
import android.os.Bundle;  
import android.view.Menu;  
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;  
import android.webkit.WebView;  
import android.webkit.WebViewClient;  
  
public class ActivityWebView extends Activity {  
      
    private WebView mWebView;  
     /** 
      * Dichiariamo l'attributo di classe url in cui  
      * salviamo l'indirizzo web che aprirà la webview 
      */  
    private String url = "http://dashboard.gestionaleclj.com/index.html";  
  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
      //Remove notification bar
        //this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
 
        //carichiamo la webview dentro il layout specificato  
        mWebView = (WebView) findViewById(R.id.webview);  
        mWebView.getSettings().setJavaScriptEnabled(true);  
        mWebView.getSettings().setLoadsImagesAutomatically(true);         
        //carichiamo finalmete la url  
        mWebView.setWebViewClient(new WebViewClient());  
        mWebView.loadUrl(url);  
    }
    @Override
    public void onBackPressed()
    {

       // super.onBackPressed(); // Comment this super call to avoid calling finish()
    }
  
      
} 