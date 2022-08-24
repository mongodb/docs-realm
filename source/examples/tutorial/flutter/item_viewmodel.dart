import 'package:realm/realm.dart';
import 'package:flutter_todo/realm/schemas.dart';

class ItemViewModel {
  final ObjectId id;
  String summary;
  bool isComplete;
  int priority;
  final String ownerId;
  late Item item;
  final Realm realm;

  ItemViewModel._(this.realm, this.item, this.id, this.summary, this.ownerId,
      this.isComplete, this.priority);
  ItemViewModel(Realm realm, Item item)
      : this._(realm, item, item.id, item.summary, item.ownerId,
            item.isComplete, item.priority ?? PriorityLevel.low);

  static ItemViewModel create(Realm realm, Item item) {
    final itemInRealm = realm.write<Item>(() => realm.add<Item>(item));
    return ItemViewModel(realm, item);
  }

  void delete() {
    realm.write(() => realm.delete(item));
  }

  void update({String? summary, bool? isComplete, int? priority}) {
    realm.write(() {
      if (summary != null) {
        this.summary = summary;
        item.summary = summary;
      }
      if (isComplete != null) {
        this.isComplete = isComplete;
        item.isComplete = isComplete;
      }
      if (priority != null) {
        this.priority = priority;
        item.priority = priority;
      }
    });
  }
}

abstract class PriorityLevel {
  static int severe = 0;
  static int high = 1;
  static int medium = 2;
  static int low = 3;
}
