Realm uses named pipes in order to support notifications and access to
the Realm file from multiple processes. While this is allowed by
default for normal user apps, it is disallowed for system apps.

System apps are defined by setting setting
``android:sharedUserId="android.uid.system"`` in the Android manifest
and if you are creating such an app you risk seeing a security
violation in Logcat that looks something like this:

.. code-block:: bash

  05-24 14:08:08.984  6921  6921 W .realmsystemapp: type=1400 audit(0.0:99): avc: denied { write } for name="realm.testapp.com.realmsystemapp-Bfqpnjj4mUvxWtfMcOXBCA==" dev="vdc" ino=14660 scontext=u:r:system_app:s0 tcontext=u:object_r:apk_data_file:s0 tclass=dir permissive=0
  05-24 14:08:08.984  6921  6921 W .realmsystemapp: type=1400 audit(0.0:100): avc: denied { write } for name="realm.testapp.com.realmsystemapp-Bfqpnjj4mUvxWtfMcOXBCA==" dev="vdc" ino=14660 scontext=u:r:system_app:s0 tcontext=u:object_r:apk_data_file:s0 tclass=dir permissive=0


In order to fix this you need to adjust the SELinux security rules in
the ROM. This can be done by using the tool ``audit2allow`` which is a
tool that ships as part of `AOSP https://source.android.com/`.

- First pull the current policy from the device ``adb pull /sys/fs/selinux/policy``.
- Copy the SELinux error inside a text file called ``input.txt``.
- Run the ``audit2allow`` tool: ``audit2allow -p policy -i input.txt``.
- The tool should output a rule you can add to your existing policy that allow you to use Realm.

``audit2allow`` is produced when compiling AOSP/ROM and only runs on
Linux. You can read more about it
`here https://source.android.com/security/selinux/validate#using_audit2allow`. Also
note that since Android Oreo, Google changed the way it configures
SELinux and the default security policies are now much more
modularized. Read more about that
`here https://source.android.com/security/selinux/images/SELinux_Treble.pdf`.
