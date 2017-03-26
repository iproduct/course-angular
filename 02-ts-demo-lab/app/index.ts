export default function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript and Angular 2!';
}
let user = 'TypeScript User';
document.querySelector('#content').innerHTML = greeter(user);