import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.java.Student
import com.mongodb.realm.examples.model.kotlin.Student
import com.mongodb.realm.examples.model.kotlin.Teacher
import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmResults
import org.junit.Test

class FilterDataTest: RealmTest() {
    @Test
    fun testFilters() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Build the query looking at all teachers:
            val query = realm.where(Teacher::class.java)

            // Add query conditions:
            query.equalTo("name", "Ms. Langtree")
            query.or().equalTo("name", "Mrs. Jacobs")

            // Execute the query:
            val result1 = query.findAll()

            // Or alternatively do the same all at once (the "Fluent interface"):
            val result2 = realm.where(Teacher::class.java)
                .equalTo("name", "Ms. Langtree")
                .or()
                .equalTo("name", "Mrs. Jacobs")
                .findAll()

            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testLinkQueries() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Find all teachers who have students with the names "Wirt" or "Greg"
            val result = realm.where(Teacher::class.java)
                .equalTo("students.name", "Wirt")
                .or()
                .equalTo("students.name", "Greg")
                .findAll()

            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testLinkQueriesInverse() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Find all students who have teachers with the names "Ms. Langtree" or "Mrs. Jacobs"
            val result = realm.where(Student::class.java)
                .equalTo("teacher.name", "Ms. Langtree")
                .or()
                .equalTo("teacher.name", "Mrs. Jacobs")
                .findAll()

            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testSort() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Find all students in year 7, and sort them by name
            val result: RealmResults<Student> = realm.where(Student::class.java)
                .equalTo("year", 7L)
                .sort("name")
                .findAll()

            // Alternatively, find all students in year 7
            val unsortedResult: RealmResults<Student> = realm.where(Student::class.java)
                .equalTo("year", 7L)
                .findAll()
            // then sort the results set by name
            val sortedResult = unsortedResult.sort("name")
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testLimit() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Find all students in year 8, and limit the results collection to 10 items
            val result: RealmResults<Student> = realm.where(Student::class.java)
                .equalTo("year", 8L)
                .limit(10)
                .findAll()
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testUnique() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Find all students in year 9, and cap the result collection at 10 items
            val result: RealmResults<Student> = realm.where<Student>(Student::class.java)
                .equalTo("year", 9L)
                .distinct("name")
                .findAll()
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testChainQueries() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Find all students in year 9 and resolve the query into a results collection
            val result: RealmResults<Student> = realm.where(Student::class.java)
                .equalTo("year", 9L)
                .findAll()

            // filter the students results again by teacher name
            val filteredResults =
                result.where().equalTo("teacher.name", "Ms. Langtree").findAll()
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testRealmQueryLanguage() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            // Build a RealmQuery based on the Student type
            val query = realm.where(Student::class.java)

            // Simple query
            val studentsNamedJane = query.rawPredicate("name = 'Jane'").findAll()

            // Multiple predicates
            val studentsNamedJaneOrJohn =
                query.rawPredicate("name = 'Jane' OR name = 'John'").findAll()

            // Collection queries
            val studentsWithTeachers =
                query.rawPredicate("teacher.@count > 0").findAll()
            val studentsWithSeniorTeachers =
                query.rawPredicate("ALL teacher.numYearsTeaching > 5").findAll()

            // Sub queries
            val studentsWithMathTeachersNamedSteven =
                query.rawPredicate("SUBQUERY(teacher, \$teacher, \$teacher.subject = 'Mathematics' AND \$teacher.name = 'Mr. Stevens').@count > 0")
                    .findAll()

            // Sort, Distinct, Limit
            val students =
                query.rawPredicate("teacher.@count > 0 SORT(year ASCENDING) DISTINCT(name) LIMIT(5)")
                    .findAll()

            // Combine two raw predicates
            val studentsNamedJaneOrHenry = query.rawPredicate("name = 'Jane'")
                .rawPredicate("name = 'Henry'").findAll()

            // Combine raw predicate with type-safe predicate
            val studentsNamedJaneOrHenryAgain =
                query.rawPredicate("name = 'Jane'")
                    .equalTo("name", "Henry").findAll()
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}
