public class Kid
        extends RealmObject {
    public RealmList<Frog> frogs =
            new RealmList<Frog>();
    // one-to-many relationships cannot
    // be marked required in the Java SDK,
    // so no nullableFrogs
}
