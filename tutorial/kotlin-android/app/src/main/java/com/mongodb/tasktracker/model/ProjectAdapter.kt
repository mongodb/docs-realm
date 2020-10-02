package com.mongodb.tasktracker.model

import android.content.Intent
import android.util.Log
import android.view.*
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.mongodb.tasktracker.*
import io.realm.RealmList
import io.realm.RealmRecyclerViewAdapter
import io.realm.mongodb.User

/*
* ProjectAdapter: extends the Realm-provided RealmRecyclerViewAdapter to provide data for a RecyclerView to display
* Realm objects on screen to a user.
*/
internal class ProjectAdapter(data: RealmList<Project>, var user: User) : RealmRecyclerViewAdapter<Project, ProjectAdapter.ProjectViewHolder?>(data, true) {
    lateinit var parent : ViewGroup

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProjectViewHolder {
        // save a reference to the parent view so we can use the context to launch TaskActivity on item clicks
        this.parent = parent
        val itemView: View = LayoutInflater.from(parent.context).inflate(R.layout.task_view, parent, false)
        return ProjectViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ProjectViewHolder, position: Int) {
        val obj: Project? = getItem(position)
        holder.data = obj
        holder.name.text = obj?.name
        holder.menu.visibility = View.VISIBLE // ensure that this view is always visible when bound, since it is sometimes invisible

        // if the project described by this view is NOT the user's project, hide the menu button
        if (!obj?.partition.equals("project=${user.id}")) {
            holder.menu.visibility = View.INVISIBLE
        }

        holder.menu.setOnClickListener {
            run {
                // when a user clicks the menu button for their project, launch the membership management screen
                Log.v(TAG(), "Opening membership for project: ${obj?.partition}")
                if (obj?.partition.equals("project=${user.id}")) {
                    var intent: Intent = Intent(parent.context, MemberActivity::class.java)
                    intent.putExtra(PARTITION_EXTRA_KEY, obj?.partition)
                    intent.putExtra(PROJECT_NAME_EXTRA_KEY, obj?.name)
                    parent.context.startActivity(intent)
                } else {
                    Toast.makeText(parent.context, "You can only edit the membership of your own project.", Toast.LENGTH_LONG).show()
                }
            }
        }

        holder.itemView.setOnClickListener {
            run {
                // when a user clicks on a project, bring them to the task view for that project
                var intent : Intent = Intent(parent.context, TaskActivity::class.java)
                intent.putExtra(PARTITION_EXTRA_KEY, obj?.partition)
                intent.putExtra(PROJECT_NAME_EXTRA_KEY, obj?.name)
                parent.context.startActivity(intent)
            }
        }
    }

    internal inner class ProjectViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var name: TextView = view.findViewById(R.id.name)
        var status: TextView = view.findViewById(R.id.status)
        var data: Project? = null
        var menu: TextView = view.findViewById(R.id.menu)

    }
}
