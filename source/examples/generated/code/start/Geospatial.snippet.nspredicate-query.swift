let filterArguments = NSMutableArray()
filterArguments.add(largeBox)
let companiesInLargeBox = realm.objects(Geospatial_Company.self)
    .filter(NSPredicate(format: "location IN %@", argumentArray: filterArguments as? [Any]))
print("Number of companies in large box: \(companiesInLargeBox.count)")
