# AccelerometerHash

AccelerometerHash is a simple Android library that collects last byte of accelerometer data and converts it into a byte array. It is primarily designed to hash accelerometer data for various applications.

## Installation

To use AccelerometerHash in your Android project, follow these steps:

1. Add the JitPack repository to your build file. Add it in your root build.gradle at the end of repositories:

    ```gradle
	dependencyResolutionManagement {
		repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
		repositories {
			mavenCentral()
			maven { url 'https://jitpack.io' }
		}
	}
    ```

2. Add the dependency:

    ```gradle
    dependencies {
        implementation 'com.github.lolipodass:AccelerometerHash:Tag'
    }
    ```

   Replace `Tag` with the latest release tag or commit hash.

## Usage

1. Initialize AccelerometerHash with a context:

    ```kotlin
    val accelerometerHash = AccelerometerHash(context)
    ```

2. Start reading accelerometer data:

    ```kotlin
    accelerometerHash.startReading()
    ```

3. Stop reading accelerometer data:

    ```kotlin
    accelerometerHash.stopReading()
    ```

4. Get the collected sensor data as a byte array:

    ```kotlin
    val data = accelerometerHash.sensorDataToBytes()
    ```

5. Check if the data size limit has been reached:

    ```kotlin
    val isDataSizeReached = accelerometerHash.isDataSizeReached()
    ```

## Example

```kotlin
val accelerometerHash = AccelerometerHash(context)
accelerometerHash.startReading()

// Wait for data collection...

if (accelerometerHash.isDataSizeReached()) {
    accelerometerHash.stopReading()
    val data = accelerometerHash.sensorDataToBytes()
    // Process the collected data...
}
