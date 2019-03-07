
export type IdType = string;

export interface Identifiable {
  id: IdType;
}

export interface ResourceType<T> extends Function {
  typeId: string;
  new (...args: any[]): T;
}

export enum MessageType {
  ERROR, WARNING, SUCCESS, INFO, DEBUG
}

export interface MessageData {
  message: string;
  type: MessageType;
}
