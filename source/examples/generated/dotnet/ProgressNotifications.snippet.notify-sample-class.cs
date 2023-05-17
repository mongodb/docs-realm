public partial class Container : IRealmObject
{
    public ISet<string> StringSet { get; } = null!;
    public IDictionary<string, int> IntDictionary { get; } = null!;
    public IList<string> StringList { get; } = null!;
}
