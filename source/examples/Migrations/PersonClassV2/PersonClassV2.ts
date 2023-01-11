class Person {
  public name: string = "";
  public birthdate: Date = new Date();
  public dogs: Realm.List<Dog> = [];

  public static schema: Realm.ObjectSchema = {
    name: "Person",
    properties: {
      name: "string",
      birthdate: "date",
      dogs: "Dog[]"
    }
  };
}

class Dog {
  public name: string = "";
  public age: number = 0;
  public breed?: string;
  public owner?: Person;

  public static schema: Realm.ObjectSchema = {
    name: "Dog",
    properties: {
      name: "string",
      age: "int",
      breed: "string?",
      owner: "Person?"
    }
  }
};
