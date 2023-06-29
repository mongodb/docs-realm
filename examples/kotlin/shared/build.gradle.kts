plugins {
    kotlin("multiplatform")
    id("com.android.library")
    id("io.realm.kotlin")
    id("org.jetbrains.kotlin.plugin.serialization") version "1.5.0"
}

version = "1.0"

kotlin {
    android()
    iosX64()
    iosArm64()
    jvm()
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(libs.realm.sync)
                implementation(libs.kotlinx.coroutines)
                implementation(libs.kotlinx.serialization)
                implementation("io.github.aakira:napier:2.4.0")
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.0")
                api("co.touchlab:kermit:0.1.8")
            }
        }
        sourceSets["commonMain"].kotlin.setSrcDirs(listOf("src/commonMain/kotlin"))
        val commonTest by getting {
            dependencies {
                implementation(libs.kotlinx.coroutines.test) // required to use coroutines in test suite
                implementation(kotlin("test-common"))
                implementation(kotlin("test-annotations-common"))
                implementation(kotlin("test-junit"))
                implementation("com.google.android.gms:play-services-auth:20.2.0")
                implementation("com.google.android.gms:play-services-base:18.0.1")
            }
        }
        sourceSets["commonTest"].kotlin.setSrcDirs(listOf("src/commonTest/kotlin"))
        val androidMain by getting {
            dependencies {
                implementation(libs.kotlinx.coroutines.android)
                implementation("com.google.android.gms:play-services-auth:20.2.0")
                implementation("com.google.android.gms:play-services-base:18.0.1")
            }
        }
        sourceSets["androidMain"].kotlin.setSrcDirs(listOf("src/androidMain/kotlin"))
        val androidTest by getting {
            dependencies {
                implementation(kotlin("test-junit"))
                implementation("junit:junit:4.13.2")
            }
        }
        sourceSets["androidTest"].kotlin.setSrcDirs(listOf("src/androidTest/kotlin"))
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
        jvm().compilations["main"].defaultSourceSet {
            dependencies {
                implementation(kotlin("stdlib-jdk8"))
                implementation(libs.kotlinx.coroutines)
                implementation(libs.kotlinx.coroutines.test)
            }
        }
    }
}

android {
    compileSdk = 33
    sourceSets["main"].manifest.srcFile("src/androidMain/AndroidManifest.xml")
    defaultConfig {
        minSdk = 28
        targetSdk = 33
    }
}
dependencies {
    implementation("androidx.core:core-ktx:1.9.0")
    implementation("androidx.appcompat:appcompat:1.3.1")
    implementation("androidx.activity:activity-ktx:1.2.0")
    implementation("androidx.fragment:fragment-ktx:1.3.0")
    implementation("com.facebook.android:facebook-login:latest.release")
    implementation("com.google.android.material:material:1.6.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("com.google.android.gms:play-services-base:18.0.1")
}

// Don't cache SNAPSHOT (changing) dependencies.
configurations.all {
    resolutionStrategy.cacheChangingModulesFor(0, "seconds")
}
