val functionsManager: Functions = taskApp.getFunctions(user)
functionsManager.callFunctionAsync(
    "addTeamMember",
    listOf(input.text.toString()),
    Document::class.java
) { result ->
    if (result.isSuccess) {
        Log.v(
            TAG(),
            "Attempted to add team member. Result: ${result.get()}"
        )
        // rebuild the list of members to display the newly-added member
        setUpRecyclerView()
    } else {
        Log.e(TAG(), "failed to add team member with: " + result.error)
        Toast.makeText(this, result.error.errorMessage, Toast.LENGTH_LONG).show()
    }
}