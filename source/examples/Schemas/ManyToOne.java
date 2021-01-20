public class Cat extends RealmObject {
    public Dog rival;

    public Cat(Dog rival) {
        this.rival = rival;
    }
}
