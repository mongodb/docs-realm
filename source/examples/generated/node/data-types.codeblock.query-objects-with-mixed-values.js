// query for Blaise's birthDate by filtering for his name to get the entire Realm object and using dot notation to get the birthDate
let blaiseBirthDate = realm.objects("Dog").filtered(`name = 'Blaise'`)[0].birthDate;
console.log(`Blaise's birth date is ${blaiseBirthDate}`);
