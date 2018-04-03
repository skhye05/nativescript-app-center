package com.tns.gen.com.microsoft.appcenter.crashes;

public class AbstractCrashesListener_fbundle_l129_c88__ extends com.microsoft.appcenter.crashes.AbstractCrashesListener implements com.tns.NativeScriptHashCodeProvider {
	public AbstractCrashesListener_fbundle_l129_c88__(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public boolean shouldProcess(com.microsoft.appcenter.crashes.model.ErrorReport param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "shouldProcess", boolean.class, args);
	}

	public boolean shouldAwaitUserConfirmation()  {
		java.lang.Object[] args = null;
		return (boolean)com.tns.Runtime.callJSMethod(this, "shouldAwaitUserConfirmation", boolean.class, args);
	}

	public java.lang.Iterable getErrorAttachments(com.microsoft.appcenter.crashes.model.ErrorReport param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (java.lang.Iterable)com.tns.Runtime.callJSMethod(this, "getErrorAttachments", java.lang.Iterable.class, args);
	}

	public void onBeforeSending(com.microsoft.appcenter.crashes.model.ErrorReport param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onBeforeSending", void.class, args);
	}

	public void onSendingFailed(com.microsoft.appcenter.crashes.model.ErrorReport param_0, java.lang.Exception param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onSendingFailed", void.class, args);
	}

	public void onSendingSucceeded(com.microsoft.appcenter.crashes.model.ErrorReport param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onSendingSucceeded", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
