package com.tns.gen.com.microsoft.appcenter.analytics.channel;

public class AnalyticsListener implements com.microsoft.appcenter.analytics.channel.AnalyticsListener {
	public AnalyticsListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onBeforeSending(com.microsoft.appcenter.ingestion.models.Log param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onBeforeSending", void.class, args);
	}

	public void onSendingFailed(com.microsoft.appcenter.ingestion.models.Log param_0, java.lang.Exception param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onSendingFailed", void.class, args);
	}

	public void onSendingSucceeded(com.microsoft.appcenter.ingestion.models.Log param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onSendingSucceeded", void.class, args);
	}

}
