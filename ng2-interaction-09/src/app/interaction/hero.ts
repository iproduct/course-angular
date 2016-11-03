export class Hero {
    public id: number;
    public name: string;
    public power: string;
    public alterEgo: string;
    public email: string;
    constructor(
        id: number,
        name: string,
        email?: string,
        power?: string,
        alterEgo?: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.power = power;
        this.alterEgo = alterEgo;
    }
}