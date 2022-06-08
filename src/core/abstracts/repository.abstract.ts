export abstract class Repository<T> {
  public abstract create(item: T): Promise<T>;

  public abstract get(id: unknown): Promise<T | null>;

  public abstract remove(id: unknown): Promise<T | null>;

  public abstract update(id: unknown, item: Partial<T>): Promise<T | null>;
}
