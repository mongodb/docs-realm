import 'package:realm_dart/realm.dart';
import "dart:io";
import "dart:convert";

HttpClient createCustomHttpsClient(String cert) {
  SecurityContext context = SecurityContext.defaultContext;
  try {
    final bytes = utf8.encode(cert);
    context.setTrustedCertificatesBytes(bytes);
  } on TlsException catch (e) {
    final message = e.osError?.message ?? "";
    if (!message.contains('CERT_ALREADY_IN_HASH_TABLE')) {
      rethrow;
    }
  }

  return HttpClient(context: context);
}

App createAppWithCustomHttpsClient(
    String letsEncryptCertificate, String appId) {
  HttpClient httpClient = createCustomHttpsClient(letsEncryptCertificate);
  final appConfig = AppConfiguration(appId, httpClient: httpClient);
  return App(appConfig);
}
