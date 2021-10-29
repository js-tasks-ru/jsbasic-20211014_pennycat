function showSalary(users, age) {
  let usersString = '';
  let newUsers = users.filter(user => user.age <= age);
  let last = newUsers.length - 1;
  newUsers.forEach((newUser, i) =>{
    if(i == last){
      usersString += `${newUser.name}, ${newUser.balance}`;
    } else {
      usersString += `${newUser.name}, ${newUser.balance}\n`;
    }
  });
  return usersString;
}



