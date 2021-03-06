package com.mongodb.realm.examples.kotlin
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "StudentKt": "Student",
//       "TeacherKt": "Teacher"
//    }
// }
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.java.Student
import com.mongodb.realm.examples.model.kotlin.StudentKt
import com.mongodb.realm.examples.model.kotlin.TeacherKt
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
            // :code-block-start: filters
            // Build the query looking at all teachers:
            val query = realm.where(TeacherKt::class.java)

            // Add query conditions:
            query.equalTo("name", "Ms. Langtree")
            query.or().equalTo("name", "Mrs. Jacobs")

            // Execute the query:
            val result1 = query.findAll()

            // Or alternatively do the same all at once (the "Fluent interface"):
            val result2 = realm.where(TeacherKt::class.java)
                .equalTo("name", "Ms. Langtree")
                .or()
                .equalTo("name", "Mrs. Jacobs")
                .findAll()

            // :code-block-end:
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
            // :code-block-start: link-queries
            // Find all teachers who have students with the names "Wirt" or "Greg"
            val result = realm.where(TeacherKt::class.java)
                .equalTo("students.name", "Wirt")
                .or()
                .equalTo("students.name", "Greg")
                .findAll()

            // :code-block-end:
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
            // :code-block-start: link-queries-inverse
            // Find all students who have teachers with the names "Ms. Langtree" or "Mrs. Jacobs"
            val result = realm.where(StudentKt::class.java)
                .equalTo("teacher.name", "Ms. Langtree")
                .or()
                .equalTo("teacher.name", "Mrs. Jacobs")
                .findAll()

            // :code-block-end:
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
            // :code-block-start: sort
            // Find all students in year 7, and sort them by name
            val result: RealmResults<StudentKt> = realm.where(StudentKt::class.java)
                .equalTo("year", 7L)
                .sort("name")
                .findAll()

            // Alternatively, find all students in year 7
            val unsortedResult: RealmResults<StudentKt> = realm.where(StudentKt::class.java)
                .equalTo("year", 7L)
                .findAll()
            // then sort the results set by name
            val sortedResult = unsortedResult.sort("name")
            // :code-block-end:
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
            // :code-block-start: limit
            // Find all students in year 8, and limit the results collection to 10 items
            val result: RealmResults<StudentKt> = realm.where(StudentKt::class.java)
                .equalTo("year", 8L)
                .limit(10)
                .findAll()
            // :code-block-end:
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
            // :code-block-start: unique
            // Find all students in year 9, and cap the result collection at 10 items
            val result: RealmResults<StudentKt> = realm.where<StudentKt>(StudentKt::class.java)
                .equalTo("year", 9L)
                .distinct("name")
                .findAll()
            // :code-block-end:
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
            // :code-block-start: chain-queries
            // Find all students in year 9 and resolve the query into a results collection
            val result: RealmResults<StudentKt> = realm.where(StudentKt::class.java)
                .equalTo("year", 9L)
                .findAll()

            // filter the students results again by teacher name
            val filteredResults =
                result.where().equalTo("teacher.name", "Ms. Langtree").findAll()
            // :code-block-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}
// :replace-end:
// :code-block-end: