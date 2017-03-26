export default function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript and Angular!';
}
let user = 'TypeScript User';
document.querySelector('#content').innerHTML = greeter(user);