The Swift SDK does not require you to manually create object schemas. Instead,
it uses reflection to automatically create schemas for your SDK object types.

Your project must not set
``SWIFT_REFLECTION_METADATA_LEVEL = none``, or the SDK cannot discover
properties in your models. Reflection is enabled by default if your project
does not specifically set a level for this setting.
