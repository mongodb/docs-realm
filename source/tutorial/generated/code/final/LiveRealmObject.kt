package com.mongodb.realm.livedataquickstart.model


import androidx.annotation.MainThread
import androidx.lifecycle.LiveData
import io.realm.RealmModel
import io.realm.RealmObject
import io.realm.RealmObjectChangeListener


/**
 * This class represents a RealmObject wrapped inside a LiveData.
 *
 * The provided RealmObject must be a managed object that exists in a realm on creation.
 *
 * When the enclosing LifecycleOwner is killed, the listener is automatically unsubscribed.
 *
 * Realm keeps the managed RealmObject up-to-date whenever a change occurs on any thread.
 * When the RealmObject changes, LiveRealmObject notifies the observer.
 *
 * LiveRealmObject observes the object until it is invalidated. You can invalidate the RealmObject by
 * deleting it or by closing the realm that owns it.
 *
 * @param <T> the type of the RealmModel
</T> */
class LiveRealmObject<T : RealmModel?> @MainThread constructor(obj: T?) : LiveData<T>() {

    private val listener =
        RealmObjectChangeListener<T> { obj, objectChangeSet ->
            if (!objectChangeSet!!.isDeleted) {
                setValue(obj)
            } else { // Because invalidated objects are unsafe to set in LiveData, pass null instead.
                setValue(null)
            }
        }

    /**
     * Starts observing the RealmObject if we have observers and the object is still valid.
     */
    override fun onActive() {
        super.onActive()
        val obj = value
        if (obj != null && RealmObject.isValid(obj)) {
            RealmObject.addChangeListener(obj, listener)
        }
    }

    /**
     * Stops observing the RealmObject.
     */
    override fun onInactive() {
        super.onInactive()
        val obj = value
        if (obj != null && RealmObject.isValid(obj)) {
            RealmObject.removeChangeListener(obj, listener)
        }
    }

    /**
     * Wraps the provided managed RealmObject as a LiveData.
     *
     * The provided object should be managed, and should be valid.
     *
     * @param object the managed RealmModel to wrap as LiveData
     */
    init {
        require(RealmObject.isManaged(obj)) { "LiveRealmObject only supports managed RealmModel instances!" }
        require(RealmObject.isValid(obj)) { "The provided RealmObject is no longer valid, and therefore cannot be observed for changes." }
        if (RealmObject.isLoaded(obj)) {
            // we should not notify observers when results aren't ready yet (async query).
            // however, synchronous query should be set explicitly.
            setValue(obj)
        }
    }
}