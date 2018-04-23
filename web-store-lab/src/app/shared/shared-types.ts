export type IdType = number;

export interface Identifiable {
  id: IdType;
}

export interface CollectionResponse<T> {
  data: Array<T>;
}

export interface IndividualResponse<T> {
  data: T;
}
