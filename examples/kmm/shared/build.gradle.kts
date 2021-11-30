plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
    id("com.android.library")
    id("io.realm.kotlin")
    id("org.jetbrains.kotlin.android")
}

val realmVersion = "0.10.0-SNAPSHOT" // DON'T FORGET TO UPDATE VERSION IN PROJECT/ANDROID GRADLE
val coroutinesVersion = "1.6.0-native-mt"
version = "1.0"

kotlin {
    android()
    iosX64()
    iosArm64()

    cocoapods {
        summary = "Some description for the Shared Module"
        homepage = "Link to the Shared Module homepage"
        ios.deploymentTarget = "14.1"
        podfile = project.file("../iosRealmKMMApp/Podfile")
        framework {
            baseName = "shared"
        }
    }
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesVersion")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:$coroutinesVersion")
                implementation("io.realm.kotlin:library-sync:${realmVersion}")
                implementation(kotlin("test-common"))
                implementation(kotlin("test-annotations-common"))
            }
        }
        val commonTest by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesVersion")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:$coroutinesVersion") // required to use coroutines in test suite
                implementation("io.realm.kotlin:library-sync:${realmVersion}")
                implementation(kotlin("test-common"))
                implementation(kotlin("test-annotations-common"))
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesVersion")
                implementation("io.realm.kotlin:library-sync:${realmVersion}")
                implementation(kotlin("test-junit"))
                implementation("junit:junit:4.13.2")
            }
        }
        val androidTest by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesVersion")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:$coroutinesVersion") // required to use coroutines in test suite
                implementation("io.realm.kotlin:library-sync:${realmVersion}")
                implementation(kotlin("test-junit"))
                implementation("junit:junit:4.13.2")
            }
        }
        val iosX64Main by getting
        val iosArm64Main by getting
        val iosMain by creating {
            dependsOn(commonMain)
            iosX64Main.dependsOn(this)
            iosArm64Main.dependsOn(this)
        }
        val iosX64Test by getting
        val iosArm64Test by getting
        val iosTest by creating {
            dependsOn(commonTest)
            iosX64Test.dependsOn(this)
            iosArm64Test.dependsOn(this)
        }
    }
}

android {
    compileSdk = 30
    sourceSets["main"].manifest.srcFile("src/androidMain/AndroidManifest.xml")
    defaultConfig {
        minSdk = 28
        targetSdk = 30
    }
}
dependencies {
    implementation("androidx.test:core-ktx:1.4.0")
    implementation("androidx.appcompat:appcompat:1.4.1")
    implementation("com.google.android.material:material:1.5.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.3")
}
