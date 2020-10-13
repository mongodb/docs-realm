public class CustomUserData
{
    public string _id { get; private set; }

    public string FavoriteColor { get; set; }

    public string LocalTimeZone { get; set; }

    public bool IsCool { get; set; }

    public CustomUserData(string id)
    {
        this._id = id;
    }
}