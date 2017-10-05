function greeter(person) {
    return 'Hello, ' + person + ' from Typescript and Angular!';
}
var user = 'TypeScript User';
document.body.innerHTML = `<h2>${greeter(user)}</h2>`;
