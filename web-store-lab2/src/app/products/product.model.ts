import { Identifiable, KeyType } from '../shared/common-types';


export class Product implements Identifiable {
    constructor(
        public id: KeyType,
        public name: string,
        public price: number,
        public description?: string
    ) {}
}
