package crc643f46942d9dd1fff9;


public class NongreedySnapHelper_InitialScrollListener
	extends android.support.v7.widget.RecyclerView.OnScrollListener
	implements
		mono.android.IGCUserPeer
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"n_onScrolled:(Landroid/support/v7/widget/RecyclerView;II)V:GetOnScrolled_Landroid_support_v7_widget_RecyclerView_IIHandler\n" +
			"";
		mono.android.Runtime.register ("Xamarin.Forms.Platform.Android.NongreedySnapHelper+InitialScrollListener, Xamarin.Forms.Platform.Android", NongreedySnapHelper_InitialScrollListener.class, __md_methods);
	}


	public NongreedySnapHelper_InitialScrollListener ()
	{
		super ();
		if (getClass () == NongreedySnapHelper_InitialScrollListener.class)
			mono.android.TypeManager.Activate ("Xamarin.Forms.Platform.Android.NongreedySnapHelper+InitialScrollListener, Xamarin.Forms.Platform.Android", "", this, new java.lang.Object[] {  });
	}

	public NongreedySnapHelper_InitialScrollListener (crc643f46942d9dd1fff9.NongreedySnapHelper p0)
	{
		super ();
		if (getClass () == NongreedySnapHelper_InitialScrollListener.class)
			mono.android.TypeManager.Activate ("Xamarin.Forms.Platform.Android.NongreedySnapHelper+InitialScrollListener, Xamarin.Forms.Platform.Android", "Xamarin.Forms.Platform.Android.NongreedySnapHelper, Xamarin.Forms.Platform.Android", this, new java.lang.Object[] { p0 });
	}


	public void onScrolled (android.support.v7.widget.RecyclerView p0, int p1, int p2)
	{
		n_onScrolled (p0, p1, p2);
	}

	private native void n_onScrolled (android.support.v7.widget.RecyclerView p0, int p1, int p2);

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
