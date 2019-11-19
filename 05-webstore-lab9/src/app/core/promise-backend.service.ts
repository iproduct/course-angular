import { Identifiable, IdType, ResourceType } from '../shared/common-types';

export  interface PromiseBackendService {
  findAll<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
}

