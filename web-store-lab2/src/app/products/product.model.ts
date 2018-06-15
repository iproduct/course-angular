import { Identifiable, KeyType } from '../shared/common-types';


export class Product implements Identifiable {
    static nextId = 0;
    id: KeyType = Product.nextId ++;
    constructor(
        public name: string,
        public price: number,
        public description?: string
    ) {}
}
