propertyHandler = new PropertyChangedEventHandler((sender, e) => UpdateCurrentStats());
currentStat.PropertyChanged += propertyHandler;
