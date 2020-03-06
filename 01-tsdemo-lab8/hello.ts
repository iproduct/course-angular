function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user = 'Angular User';
document.body.innerHTML = greeter(user);