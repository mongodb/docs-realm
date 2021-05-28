func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") ?? UITableViewCell(style: .default, reuseIdentifier: "Cell")
    cell.selectionStyle = .none

    // User data may not have loaded yet. You always have your own project.
    let projectName = "My Project"
    cell.textLabel?.text = projectName

    return cell
}
