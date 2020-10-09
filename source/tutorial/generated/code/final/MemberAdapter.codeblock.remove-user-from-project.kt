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