.. code-block:: cpp
   :emphasize-lines: 2, 17, 22

   // Inherit from realm::embedded_object to declare an embedded object
   struct ContactDetails : realm::embedded_object { 
       // Because ContactDetails is an embedded object, it cannot have its own _id
       // It does not have a lifecycle outside of the top-level object
       realm::persisted<std::string> emailAddress;
       realm::persisted<std::string> phoneNumber;

       static constexpr auto schema = realm::schema("ContactDetails",
           realm::property<&ContactDetails::emailAddress>("emailAddress"),
           realm::property<&ContactDetails::phoneNumber>("phoneNumber"));
   };

   struct Business : realm::object {
       realm::persisted<std::string> _id;
       realm::persisted<std::string> name;
       // Unlike to-one relationships, an embedded object can be a required property
       realm::persisted<ContactDetails> contactDetails; 

       static constexpr auto schema = realm::schema("Business",
           realm::property<&Business::_id, true>("_id"),
           realm::property<&Business::name>("name"),
           realm::property<&Business::contactDetails>("contactDetails")); 
   };
