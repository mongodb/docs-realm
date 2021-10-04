// Construct the config automatically from C# classes
var config = new RealmConfiguration
{
    Schema = new[] { typeof(ClassA), typeof(ClassB) }
};

// More advanced: construct the configuration manually
var manualConfig = new RealmConfiguration
{
    Schema = new RealmSchema.Builder
    {
        new ObjectSchema.Builder("ClassA", isEmbedded: false)
        {
            Property.Primitive("Id", RealmValueType.Guid, isPrimaryKey: true),
            Property.Primitive("LastName", RealmValueType.String, isNullable: true, isIndexed: true)
        }
    }
};

// Most advanced: Mix and match
var mixedSchema = new ObjectSchema.Builder(typeof(ClassA));
mixedSchema.Add(Property.FromType<int>("ThisIsNotInTheCSharpClass"));
// mixedSchema now has all properties on the ClassA class
// and an extra integer property called "ThisIsNotInTheCSharpClass"

var mixedConfig = new RealmConfiguration
{
    Schema = new[] { mixedSchema.Build() }
};
