final user = app.currentUser!;

final functionResponse =
    await user.functions.call("writeCustomUserData", [
  {
    "userId": user.id,
    "favoriteFood": "pizza",
    "lastUpdated": DateTime.now().millisecondsSinceEpoch
  }
]);
