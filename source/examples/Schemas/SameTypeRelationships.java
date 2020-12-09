public class Cat extends RealmObject {
    public RealmList<Cat> friend;

    public Cat(RealmList<Cat> friends) {
        if (friends != null) {
            this.friends = friends;
        } else {
            this.friends = new RealmList<Cat>();
        }
    }
}
