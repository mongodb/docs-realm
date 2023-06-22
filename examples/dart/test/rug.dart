import 'package:realm_dart/realm.dart';

part 'rug.g.dart';

// :snippet-start: flutter-fts-annotation
@RealmModel()
class _Rug {
    @PrimaryKey()
    late ObjectId id;

    @Indexed(RealmIndexType.fullText)
    late String pattern;

    @Indexed(RealmIndexType.fullText)
    late String material;

    late int softness;
}
// :snippet-end:

