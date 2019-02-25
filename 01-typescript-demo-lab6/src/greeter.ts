import { Person } from "./person";

export function greeter({firstName, lastName} : Person) {
    return `Hello ${firstName} ${lastName}, from Typescript!`;
}

