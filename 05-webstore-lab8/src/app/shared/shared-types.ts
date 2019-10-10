export type IdType = string;

export interface Identifiable {
  id: IdType;
}

export interface ResourceType<T extends Identifiable> {
  typeId: string;
  new(...args: any[]): T;
}

