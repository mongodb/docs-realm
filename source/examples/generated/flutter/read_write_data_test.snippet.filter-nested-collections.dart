realm.write(() {
  realm.addAll([
    (Team(ObjectId(), 'Janitorial Staff',
        eventLog: RealmValue.from({
          '1': {
            'date': DateTime.utc(5622, 8, 18, 12, 30, 0),
            'type': ['work_order', 'maintenance'],
            'summary': 'leaking pipes in control room',
            'priority': 'high',
          },
          '2': {
            'date': DateTime.utc(5622, 9, 18, 12, 30, 0),
            'type': ['maintenance'],
            'summary': 'trash compactor jammed',
            'priority': 'low',
            'comment': 'this is the second time this week'
          }
        }))),
    (Team(ObjectId(), 'IT',
        eventLog: RealmValue.from({
          '1': {
            'date': DateTime.utc(5622, 9, 20, 12, 30, 0),
            'type': ['hardware', 'repair'],
            'summary': 'lightsaber damage to server room',
            'priority': 'high',
          }
        })))
  ]);

  final teams = realm.all<Team>();
  // Use [bracket notation] to query values at the specified path
  final teamsWithHighPriorityEvents =
      teams.query("eventLog[*].priority == 'high'");
  print(teamsWithHighPriorityEvents.length); // prints `2`

  final teamsWithMaintenanceEvents =
      teams.query("eventLog[*].type[FIRST] == 'maintenance'");
  print(teamsWithMaintenanceEvents.length); // prints `1`

  // Use @keys to query map keys
  final eventsWithComments =
      teams.query("eventLog[*].@keys == 'comment'");
  print(eventsWithComments.length); // prints `1`

  // Use @type to query the collection type
  final teamsWithEventsAsLists =
      teams.query("eventLog[*].type.@type == 'list'");
  print(teamsWithEventsAsLists.length); // prints `2`
});
