var geopointQuery =
    realm.query<Company>("location GEOWITHIN $circle1").find()
