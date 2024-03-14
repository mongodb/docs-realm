realm.write(() {
  final eventLog = realm.add(
      EventLog(ObjectId(), 'purchase', DateTime.now(), 'user123', details: {
    'ipAddress': RealmValue.from('192.168.1.1'),
    'items': RealmValue.from([
      {'id': 1, 'name': 'Laptop', 'price': 1200.00},
      {'id': 2, 'name': 'Mouse', 'price': 49.99}
    ]),
    'total': RealmValue.from(1249.99)
  }));

  print('''
  Event Type: ${eventLog.eventType}
  Timestamp: ${eventLog.timestamp}
  User ID: ${eventLog.userId}
  Details:
    IP Address: ${eventLog.details['ipAddress']}
  ''');
  final items = eventLog.details.values;
    for (var item in items) {
      
      print(' Item: $item');
  }
 print('Total: ${eventLog.details['total']}');
