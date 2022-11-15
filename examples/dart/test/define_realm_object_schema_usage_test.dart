import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
// :snippet-start: use-realm-object
import './schemas.dart';

final hondaCivic = Car(1, 'Honda', model: 'Civic', miles: 99);
// :snippet-end:
void main() {
  // tests the above 'use-realm-object' example, which includes the import statement
  test('test Honda Civic', () {
    expect(hondaCivic.id, 1);
    expect(hondaCivic.miles, 99);
    expect(hondaCivic.make, 'Honda');
    expect(hondaCivic.model, 'Civic');
  });
}
