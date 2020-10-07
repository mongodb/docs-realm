func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // You always have at least one project (your own)
    return userData?.memberOf.count ?? 1
}