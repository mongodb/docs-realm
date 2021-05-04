const scruffyDog = realm.objects("Dog").filtered("name = 'Scruffy'")[0];
const spotDog = realm.objects("Dog").filtered("name = 'Spot'")[0];
console.log(`Scruffy the dog: ${JSON.stringify(scruffyDog, null, 2)}`);
console.log(`Spot the dog: ${JSON.stringify(spotDog, null, 2)}`);
