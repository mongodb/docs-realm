std::map<std::string, std::string> customHttpHeaders;
customHttpHeaders.insert(std::pair<std::string, std::string>("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE"));
auto app = realm::App(APP_ID, std::nullopt, std::nullopt, customHttpHeaders);
