In Swift, you don't have to explicitly specify the database schema when you
configure the database. Swift SDK executables can automatically read and write
any valid SDK object whose model is included in the executable. If you want to
restrict a database to manage only a subset of the SDK models in the executable,
you *can* explicitly pass the models when configuring a database.

For more information, refer to :ref:`sdks-provide-a-subset-of-classes-to-a-database`.
