func delete(at index: Int) throws {
    try realm.write(withoutNotifying: [token]) {
        realm.delete(results[index])
    }
    tableView.deleteRow(at: [IndexPath(row: index, section: 0)], with: .automatic)
}