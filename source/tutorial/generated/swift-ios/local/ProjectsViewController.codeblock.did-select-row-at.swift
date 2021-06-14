func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    // TODO: open the realm for the selected project and navigate to the TasksViewController.
    // The project information is contained in the userData's memberOf field.
    // The userData may not have loaded yet. Regardless, the current user always has their own project.
    // A user's realm name is "project=username".
}
