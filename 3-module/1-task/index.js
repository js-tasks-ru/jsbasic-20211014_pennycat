let vasya = { name: 'Вася', age: 25 };
let petya = { name: 'Петя', age: 30 };
let masha = { name: 'Маша', age: 28 };

let users = [ vasya, petya, masha ];

function namify(users) {
  let userNames = [];
  for (let user of users){
    let userName = user.name;
    userNames.push(userName);
  }
  users = userNames;
  return users;
}

let names = namify(users); // ['Вася', 'Петя', 'Маша']
console.log(names);
