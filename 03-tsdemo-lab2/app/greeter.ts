function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user = 'TypeScript T';
document.body.innerHTML = greeter(user);