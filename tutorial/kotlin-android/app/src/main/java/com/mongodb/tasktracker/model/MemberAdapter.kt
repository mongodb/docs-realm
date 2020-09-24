package com.mongodb.tasktracker.model

import android.app.AlertDialog
import android.util.Log
import android.view.*
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.mongodb.tasktracker.R
import com.mongodb.tasktracker.TAG
import com.mongodb.tasktracker.taskApp
import io.realm.mongodb.functions.Functions
import org.bson.Document

/*
* MemberAdapter: extends the Android RecyclerView Adapter to display a collection of Member objects
* in a RecyclerView.
*/

internal class MemberAdapter(private val data: ArrayList<Member>, private val user : io.realm.mongodb.User) :
    RecyclerView.Adapter<MemberAdapter.MemberViewHolder>() {
    lateinit var parent : ViewGroup

    override fun onCreateViewHolder(parent: ViewGroup,
                                    viewType: Int): MemberAdapter.MemberViewHolder {
        // save a reference to the parent view so we can create dialogs later
        this.parent = parent
        Log.i(TAG(), "Displaying a list of project members. Size: ${data.size}")
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.member_view, parent, false)
        return MemberViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MemberViewHolder, position: Int) {
        val obj: Member = data[position]
        holder.data = obj
        holder.name.text = obj.name

        holder.delete.setOnClickListener {
            run {
                // Double-check with the user that they would like to remove the user with a dialog
                val dialogBuilder = AlertDialog.Builder(parent.context)
                dialogBuilder.setMessage("Are you sure you want to remove this user from the project?")
                    .setCancelable(true)
                    .setPositiveButton("Remove User") { dialog, _ ->
                        val functionsManager: Functions = taskApp.getFunctions(user)
                        functionsManager.callFunctionAsync("removeTeamMember",
                            listOf(obj.name), Document::class.java) { result ->
                            run {
                                dialog.dismiss()
                                if (result.isSuccess) {
                                    Log.v(TAG(), "removed team member: ${result.get()}")
                                    data.removeAt(position)
                                    notifyItemRemoved(position)
                                } else {
                                    Log.e(TAG(), "failed to remove team member with: " + result.error)
                                    Toast.makeText(parent.context, result.error.toString(), Toast.LENGTH_LONG).show()
                                }
                            }
                        }
                    }
                    .setNegativeButton("Cancel") { dialog, _ ->
                        dialog.cancel()
                    }

                val dialog = dialogBuilder.create()
                dialog.setTitle("Remove Team Member?")
                dialog.show()
            }
        }
    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = data.size

    internal inner class MemberViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var name: TextView = view.findViewById(R.id.name)
        var data: Member? = null
        var delete: TextView = view.findViewById(R.id.delete)

    }
}
