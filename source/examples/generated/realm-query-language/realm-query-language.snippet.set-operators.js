  // Projects with no complete items.
  "NONE items.isComplete == true"

  // Projects that contain a item with priority 10
  "ANY items.priority == 10"

  // Projects that only contain completed items
  "ALL items.isComplete == true"

  // Projects with at least one item assigned to either Alex or Ali
  "ANY items.assignee IN { 'Alex', 'Ali' }"

  // Projects with no items assigned to either Alex or Ali
  "NONE items.assignee IN { 'Alex', 'Ali' }"
