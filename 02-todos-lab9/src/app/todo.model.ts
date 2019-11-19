import { IdType, Identifiable } from './repository';
export enum TodoStatus {
  ACTIVE = 1, COMPLETED, CANCELED
}

export class Todo implements Identifiable {
  public id: IdType;
  constructor(public title: string, public status = TodoStatus.ACTIVE) {}
}
