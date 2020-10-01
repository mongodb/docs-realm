func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
    guard editingStyle == .delete else { return }

    // User can swipe to delete items.
    let task = tasks[indexPath.row]
    
    // All modifications to a realm must happen in a write block.
    try! realm.write {
        // Delete the Task.
        realm.delete(task)
    }
}