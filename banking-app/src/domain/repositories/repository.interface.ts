export interface IRepository<T, ID> {
    create(data: T): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: ID): Promise<T | null>;
    update(id: ID, data: Partial<T>): Promise<T>;
    delete(id: ID): Promise<void>;
}