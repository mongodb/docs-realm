#ifndef testHelpers_h
#define testHelpers_h

#include <cpprealm/sdk.hpp>

/**
    Removes all objects of all types from a realm.
 */
template<typename... Ts>
void removeAll(realm::db<Ts...> &realm) {
    // Iterate over the template parameter pack (Ts...)
    ([&realm] {
        // For each T in realm, fetch all objects of type T
        auto objects = realm.template objects<Ts>();
        realm.write([&realm, &objects] {
            // Iterate over the results to delete each object (at time of writing,
            // realm.removeAll() and realm.remove(collection) do not exist)
            for (auto object : objects) {
                realm.template remove(object);
            }
        });
    }(), ...); // This is called a "fold expression"
}

#endif
