function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user = 'TypeScript SuperUser';
document.body.innerHTML = greeter(user);
