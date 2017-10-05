export default function greeter(name: string) {
    return `Hello, ${name} from TypeScript!`;
} 

const user = "MyUser";
document.body.innerHTML = greeter(user);