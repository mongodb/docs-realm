// Action bar at bottom contains Add button.
HStack {
    Spacer()
    Button(action: {
        // The bound collection automatically
        // handles write transactions, so we can
        // append directly to it.
        $itemGroup.items.append(Item())
    }) { Image(systemName: "plus") }
}.padding()
