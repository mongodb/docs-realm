import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'dart:async';
import 'dart:isolate';
import 'package:realm_dart/src/realm_class.dart' show RealmInternal;
import 'package:logging/logging.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

class LoggedMessage {
  final Level level;
  final String message;

  const LoggedMessage(this.level, this.message);

  factory LoggedMessage.empty() => LoggedMessage(RealmLogLevel.off, "");

  @override
  // ignore: hash_and_equals
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other is! LoggedMessage) return false;
    return level == other.level && message == other.message;
  }

  @override
  String toString() => "level:$level message:$message";
}

void main() {
  group('Set log level and customize logger', () {
    test('Set the log level', () async {
      LoggedMessage actual = await Isolate.run(() async {
        final completer = Completer<LoggedMessage>();

        // :snippet-start: set-the-log-level
        Realm.logger.level = RealmLogLevel.trace;
        // :snippet-end:
        // :snippet-start: attach-to-logger
        Realm.logger.onRecord.listen((event) {
          // Do something with the log event - for example, print to console
          print("Realm log message: '$event'");
          // :remove-start:
          completer.complete(LoggedMessage(event.level, event.message));
          // :remove-end:
        });
        // :snippet-end:

        RealmInternal.logMessageForTesting(
            RealmLogLevel.trace, "Realm log message for log level testing");

        return await completer.future;
      });

      expect(
          actual,
          LoggedMessage(
              RealmLogLevel.trace, "Realm log message for log level testing"));
    });
    test('Set a custom logger', () async {
      LoggedMessage actual = await Isolate.run(() async {
        final completer = Completer<LoggedMessage>();

        Realm.logger.onRecord.listen((event) {
          throw RealmError(
              "Default logger should not log messages if custom logger is set");
        });

        // :snippet-start: set-custom-logger
        Realm.logger = Logger.detached("custom logger");
        // :snippet-end:
        Realm.logger.onRecord.listen((event) {
          completer.complete(LoggedMessage(event.level, event.message));
        });

        RealmInternal.logMessageForTesting(
            RealmLogLevel.info, "Custom Realm log entry for testing");

        return await completer.future;
      });

      expect(
          actual,
          LoggedMessage(
              RealmLogLevel.info, "Custom Realm log entry for testing"));
    });
    test('Change the log level as needed', () async {
      bool logMessageReceived = false;

      Realm.logger.onRecord.listen((event) {
        logMessageReceived = true;
      });

      void executeAppCode() {
        // Placeholder
      }

      void executeComplexCodeToDebug() {
        // Placeholder
      }

      // :snippet-start: change-log-level
      // Set a default log level that's not too verbose
      Realm.logger.level = RealmLogLevel.info;
      executeAppCode();
      // Later, change the log level to debug an issue when running specific code
      Realm.logger.level = RealmLogLevel.trace;
      executeComplexCodeToDebug();
      // :snippet-end:

      // Because we changed logging from .info to .trace, this should log a message.
      RealmInternal.logMessageForTesting(RealmLogLevel.trace,
          "This message should be logged because the log level was changed");

      await Future.delayed(Duration(seconds: 2));

      expect(logMessageReceived, isTrue);
    });
    test('Set the log level to off', () async {
      bool logMessageReceived = false;

      Realm.logger.onRecord.listen((event) {
        logMessageReceived = true;
      });

      // Set the log level to the level in our test message to ensure
      // the listener would log the event if logging did not turn off.
      Realm.logger.level = RealmLogLevel.trace;
      // :snippet-start: set-log-level-to-off
      Realm.logger.level = RealmLogLevel.off;
      // :snippet-end:

      // If logging was enabled at this log level, this should log a message.
      // But because the log level is off, it should not log a message.
      RealmInternal.logMessageForTesting(RealmLogLevel.trace,
          "This message should not appear because the logger is off");

      await Future.delayed(Duration(seconds: 2));

      expect(logMessageReceived, isFalse);
    });

    test('Disable logging by clearing listeners', () async {
      bool logMessageReceived = false;

      Realm.logger.onRecord.listen((event) {
        logMessageReceived = true;
      });

      // Set the log level to the level in our test message to ensure
      // the listener would log the event if it was active.
      Realm.logger.level = RealmLogLevel.trace;
      // :snippet-start: clear-listeners
      Realm.logger.clearListeners();
      // :snippet-end:

      // If logging was enabled at this log level, this should log a message.
      // But because we have cleared log listeners, it should not log a message.
      RealmInternal.logMessageForTesting(RealmLogLevel.trace,
          "This message should not appear because listeners have been cleared");

      await Future.delayed(Duration(seconds: 2));

      expect(logMessageReceived, isFalse);
    });
  });
}
