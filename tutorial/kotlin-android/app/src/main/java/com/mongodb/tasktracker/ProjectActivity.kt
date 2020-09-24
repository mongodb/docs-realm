package com.mongodb.tasktracker

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.mongodb.tasktracker.model.Project
import com.mongodb.tasktracker.model.ProjectAdapter
import com.mongodb.tasktracker.model.User
import io.realm.OrderedRealmCollection
import io.realm.OrderedRealmCollectionChangeListener
import io.realm.Realm
import io.realm.RealmList
import io.realm.RealmResults
import io.realm.kotlin.where
import io.realm.mongodb.sync.SyncConfiguration

/*
* ProjectActivity: allows a user to view a collection of Projects. Clicking on a project launches a
* view of tasks in that project. Clicking on the options button for a project launches a view
* that allows the user to add or remove members from the project. All projects are stored in a
* read-only realm on the logged in user's User object.
*/
class ProjectActivity : AppCompatActivity() {
    private var user: io.realm.mongodb.User? = null
    private var userRealm: Realm? = null
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ProjectAdapter

    override fun onStart() {
        super.onStart()
        user = taskApp.currentUser()
        if (user == null) {
            // if no user is currently logged in, start the login activity so the user can authenticate
            startActivity(Intent(this, LoginActivity::class.java))
        } else {
            // configure realm to use the current user and the partition corresponding to the user's project
            val config = SyncConfiguration.Builder(user!!, "user=${user!!.id}")
                .build()

            // Sync all realm changes via a new instance, and when that instance has been successfully created connect it to an on-screen list (a recycler view)
            Realm.getInstanceAsync(config, object: Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    // since this realm should live exactly as long as this activity, assign the realm to a member variable
                    this@ProjectActivity.userRealm = realm
                    setUpRecyclerView(realm)
                }
            })
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_project)

        recyclerView = findViewById(R.id.project_list)
    }

    override fun onStop() {
        super.onStop()
        user.run {
            userRealm?.close()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        userRealm?.close()
        recyclerView.adapter = null
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.activity_task_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_logout -> {
                user?.logOutAsync {
                    if (it.isSuccess) {
                        user = null
                        Log.v(TAG(), "user logged out")
                        startActivity(Intent(this, LoginActivity::class.java))
                    } else {
                        Log.e(TAG(), "log out failed! Error: ${it.error}")
                    }
                }
                true
            }
            else -> {
                super.onOptionsItemSelected(item)
            }
        }
    }

    private fun setUpRecyclerView(realm: Realm) {
        // query for a user object in our user realm, which should only contain our user object
        val syncedUsers : RealmResults<User> = realm.where<User>().sort("_id").findAll()
        val syncedUser : User? = syncedUsers.getOrNull(0) // since there might be no user objects in the results, default to "null"

        // if a user object exists, create the recycler view and the corresponding adapter
        if (syncedUser != null) {
            val projectsList = syncedUser.memberOf
            adapter = ProjectAdapter(projectsList, user!!)
            recyclerView.layoutManager = LinearLayoutManager(this)
            recyclerView.adapter = adapter
            recyclerView.setHasFixedSize(true)
            recyclerView.addItemDecoration(
                DividerItemDecoration(
                    this,
                    DividerItemDecoration.VERTICAL
                )
            )
        } else {
            // since a trigger creates our user object after initial signup, the object might not exist immediately upon first login.
            // if the user object doesn't yet exist (that is, if there are no users in the user realm), call this function again when it is created
            Log.i(TAG(), "User object not yet initialized, waiting for initialization via Trigger before displaying projects.")
            // change listener on a query for our user object lets us know when the user object has been created by the auth trigger
            val changeListener = OrderedRealmCollectionChangeListener<RealmResults<User>> { results, changeSet ->
                Log.i(TAG(), "User object initialized, displaying project list.")
                setUpRecyclerView(realm)
            }
            syncedUsers?.addChangeListener(changeListener)
        }
    }
}
