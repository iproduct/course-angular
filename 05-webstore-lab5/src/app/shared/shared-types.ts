
export type IdType = string;

export interface Identifiable {
  id: IdType;
}

export interface ResourseType<T> extends Function {
  typeId: string;
  new (...args: any[]): T;
}

export interface MessageData {
  message: string;
  type: string;
}
