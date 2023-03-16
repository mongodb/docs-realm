.. note::
    Automatic compaction is sufficient for minimizing
    the Realm file size for most applications. However, automatic compaction begins 
    when the size of unused space in the file is more than twice the size of 
    user data in the file. Manual compaction can be used for applications that require
    stricter management of file size or that use an older version of the SDK that 
    does not support automatic compaction.
