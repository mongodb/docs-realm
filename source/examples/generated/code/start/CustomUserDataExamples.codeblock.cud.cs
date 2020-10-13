public class CustomUserData
{
    [Required]
    public string _id { get; set; }

    public string FavoriteColor { get; set; }

    public string LocalTimeZone { get; set; }

    public bool IsCool { get; set; }

    public CustomUserData(string id)
    {
        this._id = id;
    }
}