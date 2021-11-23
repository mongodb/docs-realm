// The list shows the items in the realm.
List {
    ForEach(items) { item in
        ItemRow(item: item)
    }
}
.searchable(text: $searchFilter,
            collection: $items,
            keyPath: \.name) {
    ForEach(items) { itemsFiltered in
        Text(itemsFiltered.name).searchCompletion(itemsFiltered.name)
    }
}
