app = App.Create(myRealmAppId);
user = await app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar"));
var config = new SyncConfiguration("ufda", user);

mongoClient = user.GetMongoClient("mongodb-atlas");
dbTracker = mongoClient.GetDatabase("tracker");
cudCollection = dbTracker.GetCollection<CustomUserData>("user_data");

var cud = new CustomUserData(user.Id)
{
    FavoriteColor = "pink",
    LocalTimeZone = "+8",
    IsCool = true
};

var insertResult = await cudCollection.InsertOneAsync(cud);