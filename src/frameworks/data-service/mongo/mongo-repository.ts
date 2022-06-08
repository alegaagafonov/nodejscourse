import { ReasonPhrases } from "http-status-codes";
import { Error, Model, UpdateQuery } from "mongoose";
import messages from "../../../config/messages";
import { APIError, BadRequestError, Repository } from "../../../core";

export class MongoRepository<T> extends Repository<T> {
  private readonly _repository: Model<T>;

  constructor(repository: Model<T>) {
    super();
    this._repository = repository;
  }

  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore noImplicitReturns
  public async create(item: T): Promise<T> {
    try {
      return await this._repository.create(item);
    } catch (error: unknown) {
      console.log("error caught", error);
    }
  }

  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore noImplicitReturns
  public async get(id: unknown): Promise<T | null> {
    try {
      return await this._repository.findById(id).exec();
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore noImplicitReturns
  public async remove(id: unknown): Promise<T | null> {
    try {
      return await this._repository.findByIdAndRemove(id).exec();
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore noImplicitReturns
  public async update(id: unknown, item: UpdateQuery<T>): Promise<T | null> {
    try {
      return await this._repository
        .findByIdAndUpdate(id, item, { new: true })
        .exec();
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    console.log("error", error);
    if (
      error instanceof Error.ValidationError ||
      error instanceof Error.DocumentNotFoundError
    ) {
      throw new BadRequestError(error.message, error.name);
    }
    if (error instanceof Error.CastError) {
      throw new APIError(
        messages.validation.idNotProvided,
        (error as Error.CastError).name
      );
    }
    if (error instanceof Error) {
      throw new APIError(error.message, error.name, true);
    }
    throw new APIError(
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      false
    );
  }
}
