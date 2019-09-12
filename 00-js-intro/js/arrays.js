
var i, copy;
var employees = [
  { name: 'John', age: 35 },
  { name: 'Bill', age: 45 },
  { name: 'Amy', age: 27 },
  { name: 'Ivan', age: 27 }
];

var person1 = {};
person1.name = 'Petar';
person1.age = 30;
person1.qualifications = ['javascript', 'react', 'TDD'];

var person2 = new Object();
person2.name = 'Dimitar';
person2.age = 40;
person2.qualifications = ['C++', '.NET'];

employees.push(person1, person2);

// var copy = employees.slice(0);// shallow copy
var copy = JSON.parse(JSON.stringify(employees));// deep copy

var result = employees
  .filter( employee => employee.age < 40)
  .map((emp, index) => ({ name: emp.name.toUpperCase(), index, age: emp.age }))
  .sort( (a, b) => a.name.localeCompare(b.name))
  .reduce( (accum, res) => accum + `${res.index} ==> ${res.name}, ${res.age}\n`, '');
  // .forEach((res) =>
  //   console.log(`${res.index} ==> ${res.name}, ${res.age}`)
  // );

console.log(result);



