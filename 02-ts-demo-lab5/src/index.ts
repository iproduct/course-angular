interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName + ' from Typescript!';
}

const user1 = {
    firstName: 'John',
    lastName: 'Smith'
};

document.getElementById('content').innerHTML = greeter(user1);