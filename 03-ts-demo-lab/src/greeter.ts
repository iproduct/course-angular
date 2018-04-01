function greeter(person: string) {
    return `Hello, ${person} from TypeScript!`;
}
const user = 'TypeScript User';
document.body.innerHTML = greeter(user);