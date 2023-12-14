std::map<std::string, std::string> customHttpHeaders;
customHttpHeaders.emplace("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE");

auto app = realm::App(realm::App::configuration({APP_ID, std::nullopt, std::nullopt, customHttpHeaders}));
