package com.mongodb.tasktracker.model

import android.util.Log
import android.view.*
import android.widget.PopupMenu
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mongodb.tasktracker.R
import com.mongodb.tasktracker.TAG
import io.realm.OrderedRealmCollection
import io.realm.Realm
import io.realm.RealmRecyclerViewAdapter
import io.realm.kotlin.where
import io.realm.mongodb.sync.SyncConfiguration
import org.bson.types.ObjectId

/*
* TaskAdapter: extends the Realm-provided RealmRecyclerViewAdapter to provide data for a RecyclerView to display
* Realm objects on screen to a user.
*/
internal class TaskAdapter(data: OrderedRealmCollection<Task>, val user: io.realm.mongodb.User, private val partition: String) : RealmRecyclerViewAdapter<Task, TaskAdapter.TaskViewHolder?>(data, true) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val itemView: View = LayoutInflater.from(parent.context).inflate(R.layout.task_view, parent, false)
        return TaskViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        val obj: Task? = getItem(position)
        holder.data = obj
        holder.name.text = obj?.name
        holder.status.text = obj?.statusEnum?.displayName

        // multiselect popup to control status
        holder.itemView.setOnClickListener {
            run {
                val popup = PopupMenu(holder.itemView.context, holder.menu)
                val menu = popup.menu

                // the menu should only contain statuses different from the current status
                if (holder.data?.statusEnum != TaskStatus.Open) {
                    menu.add(0, TaskStatus.Open.ordinal, Menu.NONE, TaskStatus.Open.displayName)
                }
                if (holder.data?.statusEnum != TaskStatus.InProgress) {
                    menu.add(0, TaskStatus.InProgress.ordinal, Menu.NONE, TaskStatus.InProgress.displayName)
                }
                if (holder.data?.statusEnum != TaskStatus.Complete) {
                    menu.add(0, TaskStatus.Complete.ordinal, Menu.NONE, TaskStatus.Complete.displayName)
                }

                // add a delete button to the menu, identified by the delete code
                val deleteCode = -1
                menu.add(0, deleteCode, Menu.NONE, "Delete Task")

                // handle clicks for each button based on the code the button passes the listener
                popup.setOnMenuItemClickListener { item: MenuItem? ->
                    var status: TaskStatus? = null
                    when (item!!.itemId) {
                        TaskStatus.Open.ordinal -> {
                            status = TaskStatus.Open
                        }
                        TaskStatus.InProgress.ordinal -> {
                            status = TaskStatus.InProgress
                        }
                        TaskStatus.Complete.ordinal -> {
                            status = TaskStatus.Complete
                        }
                        deleteCode -> {
                            removeAt(holder.data?._id!!)
                        }
                    }

                    // if the status variable has a new value, update the status of the task in realm
                    if (status != null) {
                        Log.v(TAG(), "Changing status of ${holder.data?.name} (${holder.data?._id}) to $status")
                        changeStatus(status!!, holder.data?._id)
                    }
                    true
                }
                popup.show()
            }
        }
    }

    private fun changeStatus(status: TaskStatus, _id: ObjectId?) {
        // :code-block-start: change-task-status
        // :hide-start:
        // need to create a separate instance of realm to issue an update, since this event is
        // handled by a background thread and realm instances cannot be shared across threads
        val config = SyncConfiguration.Builder(user, partition)
            .build()

        // Sync all realm changes via a new instance, and when that instance has been successfully created connect it to an on-screen list (a recycler view)
        val realm: Realm = Realm.getInstance(config)
        // execute Transaction (not async) because changeStatus should execute on a background thread
        realm.executeTransaction {
            // using our thread-local new realm instance, query for and update the task status
            val item = it.where<Task>().equalTo("_id", _id).findFirst()
            item?.statusEnum = status
        }
        // always close realms when you are done with them!
        realm.close()
        // :replace-with:
        //// TODO: Change the status of the specified Task object in the project realm.
        //// Step 1: Connect to the project realm using the `partition` member variable of the adapter.
        //// Step 2: Query the realm for the Task with the specified _id value.
        //// Step 3: Set the `statusEnum` property of the Task to the specified status value.
        // :hide-end:
        // :code-block-end:
    }

    private fun removeAt(id: ObjectId) {
        // :code-block-start: delete-task
        // :hide-start:
        // need to create a separate instance of realm to issue an update, since this event is
        // handled by a background thread and realm instances cannot be shared across threads
        val config = SyncConfiguration.Builder(user, partition)
            .build()

        // Sync all realm changes via a new instance, and when that instance has been successfully created connect it to an on-screen list (a recycler view)
        val realm: Realm = Realm.getInstance(config)
        // execute Transaction (not async) because remoteAt should execute on a background thread
        realm.executeTransaction {
            // using our thread-local new realm instance, query for and delete the task
            val item = it.where<Task>().equalTo("_id", id).findFirst()
            item?.deleteFromRealm()
        }
        // always close realms when you are done with them!
        realm.close()
        // :replace-with:
        //// TODO: Delete the specified Task object from the project realm.
        //// Step 1: Connect to the project realm using the `partition` member variable of the adapter.
        //// Step 2: Query the realm for the Task with the specified _id value.
        //// Step 3: Delete the Task from the project realm.
        // :hide-end:
        // :code-block-end:
    }

    internal inner class TaskViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var name: TextView = view.findViewById(R.id.name)
        var status: TextView = view.findViewById(R.id.status)
        var data: Task? = null
        var menu: TextView = view.findViewById(R.id.menu)

    }
}
