function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript and Angular!';
}
let user = 'TypeScript User';
document.body.innerHTML = greeter(user);