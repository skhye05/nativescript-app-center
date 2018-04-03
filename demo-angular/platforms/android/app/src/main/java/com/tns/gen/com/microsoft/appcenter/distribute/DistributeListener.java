package com.tns.gen.com.microsoft.appcenter.distribute;

public class DistributeListener implements com.microsoft.appcenter.distribute.DistributeListener {
	public DistributeListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onReleaseAvailable(android.app.Activity param_0, com.microsoft.appcenter.distribute.ReleaseDetails param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onReleaseAvailable", boolean.class, args);
	}

}
