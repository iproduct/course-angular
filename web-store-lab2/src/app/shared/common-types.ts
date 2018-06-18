export type KeyType = number;

export interface Identifiable {
    id: KeyType;
}

export interface CollectionResponse<T> {
    data: T[];
}

export interface IndividualResponse<T> {
    data: T;
}
