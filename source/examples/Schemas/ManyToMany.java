public class Cat extends RealmObject {
    public RealmList<Dog> rivals;

    public Cat(RealmList<Dog> rivals) {
        if (rivals != null) {
            this.rivals = rivals;
        } else {
            this.rivals = new RealmList<Dog>();
        }
    }
}
