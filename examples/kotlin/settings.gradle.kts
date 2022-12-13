pluginManagement {
    repositories {
        google()
        gradlePluginPortal()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
<<<<<<< HEAD
            version("realm", "1.3.0")
=======
<<<<<<< HEAD
>>>>>>> b9452381d (Kotlin Realm Files IA (#2340))
            version("realm", "1.5.1")
=======
            version("realm", "1.3.0")
>>>>>>> 7df524965 (Kotlin Realm Files IA (#2340))
            version("kotlinx-coroutines", "1.6.0-native-mt")
            library("realm-plugin", "io.realm.kotlin", "gradle-plugin").versionRef("realm")
            library("realm", "io.realm.kotlin", "library-base").versionRef("realm")
            library("realm-sync", "io.realm.kotlin", "library-sync").versionRef("realm")
            library("kotlinx-coroutines", "org.jetbrains.kotlinx", "kotlinx-coroutines-core").versionRef("kotlinx-coroutines")
            library("kotlinx-coroutines-android", "org.jetbrains.kotlinx", "kotlinx-coroutines-android").versionRef("kotlinx-coroutines")
            library("kotlinx-coroutines-test", "org.jetbrains.kotlinx", "kotlinx-coroutines-test").versionRef("kotlinx-coroutines")
        }
    }
}

rootProject.name = "RealmKMMApp"
include(":androidRealmKMMApp")
include(":shared")