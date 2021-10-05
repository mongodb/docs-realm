using System;
using NUnit.Framework;
using Realms;
using Realms.Schema;

namespace Examples
{
    public class Schemas
    {
        public Schemas()
        {
        }

        [Test]
        public void TestSchemas()
        {
            // :code-block-start: schema_property
            // By default, all loaded RealmObject classes are included.
            // Use the RealmConfiguration when you want to 
            // construct a schema for only specific C# classes:
            var config = new RealmConfiguration
            {
                Schema = new[] { typeof(ClassA), typeof(ClassB) }
            };

            // More advanced: construct the schema manually
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

            // Most advanced: mix and match
            var mixedSchema = new ObjectSchema.Builder(typeof(ClassA));
            mixedSchema.Add(Property.FromType<int>("ThisIsNotInTheCSharpClass"));
            // mixedSchema now has all properties on the ClassA class
            // and an extra integer property called "ThisIsNotInTheCSharpClass"

            var mixedConfig = new RealmConfiguration
            {
                Schema = new[] { mixedSchema.Build() }
            };
            // :code-block-end:
        }
    }

    class ClassA : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }
    }
    class ClassB : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }
    }
}
