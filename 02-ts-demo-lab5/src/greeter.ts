function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user = 'Trayan';
document.body.innerHTML = greeter(user);