func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // You always have at least one project (your own)
    return userData?.memberOf.count ?? 1
}

// :code-block-start: cell-for-row-at
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") ?? UITableViewCell(style: .default, reuseIdentifier: "Cell")
    cell.selectionStyle = .none

    // User data may not have loaded yet. You always have your own project.
    let projectName = userData?.memberOf[indexPath.row].name ?? "My Project"
    cell.textLabel?.text = projectName
    
    return cell
}