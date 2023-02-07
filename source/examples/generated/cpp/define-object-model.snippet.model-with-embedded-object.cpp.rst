.. code-block:: text
   :emphasize-lines: 2, 16, 21

   // Inherit from realm::embedded_object to declare an embedded object
   struct ContactDetails : realm::embedded_object<ContactDetails> { 
       // Because ContactDetails is an embedded object, it cannot have its own _id
       // It does not have a lifecycle outside of the top-level object
       realm::persisted<std::string> emailAddress;
       realm::persisted<std::string> phoneNumber;

       static constexpr auto schema = realm::schema("ContactDetails",
           realm::property<&ContactDetails::emailAddress>("emailAddress"),
           realm::property<&ContactDetails::phoneNumber>("phoneNumber"));
   };

   struct Business : realm::object<Business> {
       realm::persisted<int64_t> _id;
       realm::persisted<std::string> name;
       realm::persisted<std::optional<ContactDetails>> contactDetails; 

       static constexpr auto schema = realm::schema("Business",
           realm::property<&Business::_id, true>("_id"),
           realm::property<&Business::name>("name"),
           realm::property<&Business::contactDetails>("contactDetails")); 
   };
