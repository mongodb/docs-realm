Use ``DateTime`` to store timestamp data.

However, it is important to note that the SDK stores ``DateTime`` in UTC.
When you use ``DateTime``, you must create it in UTC or convert it 
with ``.toUtc()`` before you store it. If your application requires it, 
you can convert it back to local or the desired time zone when reading 
from the database.
