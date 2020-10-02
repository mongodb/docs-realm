val functionsManager: Functions = taskApp.getFunctions(user)
// get team members by calling a Realm Function which returns a list of members
functionsManager.callFunctionAsync("getMyTeamMembers", ArrayList<String>(), ArrayList::class.java) { result ->
    if (result.isSuccess) {
        Log.v(TAG(), "successfully fetched team members. Number of team members: ${result.get().size}")
        // The `getMyTeamMembers` function returns team members as Document objects. Convert them into Member objects so the MemberAdapter can display them.
        this.members = ArrayList(result.get().map { item -> Member(item as Document) })
        adapter = MemberAdapter(members, user!!)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter
        recyclerView.setHasFixedSize(true)
        recyclerView.addItemDecoration(DividerItemDecoration(this, DividerItemDecoration.VERTICAL))
    } else {
        Log.e(TAG(), "failed to get team members with: " + result.error)
    }
}