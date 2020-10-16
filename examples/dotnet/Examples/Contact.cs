using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class Contact : RealmObject
    {

        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        public string Name { get; set; }

        public Address Address { get; set; } // embed a single address 

        public Contact() { }

    }

}

