async function prepareRadix() {
  radiks.configure({
    // TODO I will set up better radiks server on radiks.dece.app and replace with 
    apiServer: 'https://radiks.dece.app',
    userSession
  });

  let radiksUserSession = radiks.getConfig().userSession;

  await radiks.User.createWithCurrentUser();
}

prepareRadix();

class Person extends radiks.Model {
  static className = 'Person';

  static schema = {
    name: String,
    age: Number,
    isHuman: {
      type: Boolean,
      decrypted: true
    },
    likesDogs: {
      type: Boolean,
      decrypted: true // all users will know if this record likes dogs!
    }
  }

  static defaults = {
    likesDogs: true
  }
}

async function createNewPerson() {
  const person = new Person({
    name: 'Hank',
    isHuman: false,
    likesDogs: false // just an example, I love dogs!
  });
  console.log(person);
  await person.save();
  alert('New entity added :)');
}

async function getPeople() {
  let people = await Person.fetchList({
    // Here you can specify selector
  });
  return people;
}

async function onGetDataButtonClicked() {
  let people = await getPeople();
  console.log('Data fetched');
  console.log(people);
  document.getElementById('fetched-data').innerHTML = JSON.stringify(people, '\t', 2);
}
