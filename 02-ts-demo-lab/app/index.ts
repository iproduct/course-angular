export default function greeter(name: string) {
    return `Hello, ${name} from TypeScript!`;
} 

const user = "TypeScript User";
document.body.innerHTML = greeter(user);