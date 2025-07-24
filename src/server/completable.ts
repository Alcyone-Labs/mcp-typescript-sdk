import { z, ZodTypeAny } from "zod";

export enum McpZodTypeKind {
  Completable = "McpCompletable",
}

export type CompleteCallback<T extends ZodTypeAny = ZodTypeAny> = (
  value: T["_input"],
  context?: {
    arguments?: Record<string, string>;
  },
) => T["_input"][] | Promise<T["_input"][]>;

export interface CompletableDef<T extends ZodTypeAny = ZodTypeAny> {
  type: T["_def"]["type"];
  complete: CompleteCallback<T>;
  typeName: McpZodTypeKind.Completable;
  wrappedType: T;
}

export class Completable<T extends ZodTypeAny> {
  public readonly _def: CompletableDef<T>;
  private _wrappedType: T;

  // ZodType compatibility properties
  get _output(): T["_output"] {
    return this._wrappedType._output;
  }
  get _input(): T["_input"] {
    return this._wrappedType._input;
  }
  get def() {
    return this._wrappedType.def;
  }
  get type() {
    return this._wrappedType.type;
  }
  get _zod() {
    return this._wrappedType._zod;
  }
  get "~standard"() {
    return this._wrappedType["~standard"];
  }

  constructor(type: T, complete: CompleteCallback<T>) {
    this._wrappedType = type;
    this._def = {
      type: type._def.type,
      complete,
      typeName: McpZodTypeKind.Completable,
      wrappedType: type,
    };
  }

  // Core parsing methods
  parse(input: unknown): T["_output"] {
    return this._wrappedType.parse(input);
  }

  safeParse(
    input: unknown,
  ): { success: true; data: T["_output"] } | { success: false; error: any } {
    return this._wrappedType.safeParse(input);
  }

  parseAsync(input: unknown): Promise<T["_output"]> {
    return this._wrappedType.parseAsync(input);
  }

  safeParseAsync(
    input: unknown,
  ): Promise<
    { success: true; data: T["_output"] } | { success: false; error: any }
  > {
    return this._wrappedType.safeParseAsync(input);
  }

  // Schema manipulation methods
  optional() {
    return new Completable(
      this._wrappedType.optional(),
      this._def.complete as any,
    );
  }
  nullable() {
    return new Completable(
      this._wrappedType.nullable(),
      this._def.complete as any,
    );
  }
  nullish() {
    return new Completable(
      this._wrappedType.nullish(),
      this._def.complete as any,
    );
  }
  nonoptional() {
    return new Completable(
      this._wrappedType.nonoptional(),
      this._def.complete as any,
    );
  }
  array() {
    return this._wrappedType.array();
  }
  or(schema: ZodTypeAny) {
    return this._wrappedType.or(schema);
  }
  and(schema: ZodTypeAny) {
    return this._wrappedType.and(schema);
  }

  // Transformation methods
  transform(transformer: any) {
    return this._wrappedType.transform(transformer);
  }
  default(defaultValue: any) {
    return new Completable(
      this._wrappedType.default(defaultValue),
      this._def.complete as any,
    );
  }
  catch(catchValue: any) {
    return new Completable(
      this._wrappedType.catch(catchValue),
      this._def.complete as any,
    );
  }
  pipe(schema: ZodTypeAny) {
    return this._wrappedType.pipe(schema as any);
  }

  // Additional ZodType v4 methods
  register(registry?: any, ...meta: any[]) {
    return this._wrappedType.register(registry, ...(meta as any));
  }
  spa(input: unknown) {
    return this._wrappedType.spa(input);
  }
  overwrite(overrides: any) {
    return new Completable(
      this._wrappedType.overwrite(overrides),
      this._def.complete as any,
    );
  }
  prefault(prefaultValue: any) {
    return new Completable(
      this._wrappedType.prefault(prefaultValue),
      this._def.complete as any,
    );
  }

  // Refinement methods
  refine(refinement: any, message?: any) {
    return this._wrappedType.refine(refinement, message);
  }
  superRefine(refinement: any) {
    return this._wrappedType.superRefine(refinement);
  }

  // Utility methods
  readonly() {
    return this._wrappedType.readonly();
  }
  describe(description: string) {
    return new Completable(
      this._wrappedType.describe(description),
      this._def.complete as any,
    );
  }
  meta(meta?: any) {
    return this._wrappedType.meta(meta);
  }
  brand() {
    return this._wrappedType.brand();
  }
  check(check: any) {
    return this._wrappedType.check(check);
  }
  clone() {
    return new Completable(
      this._wrappedType.clone(),
      this._def.complete as any,
    );
  }

  // Status check methods
  isOptional(): boolean {
    return this._wrappedType.isOptional();
  }

  isNullable(): boolean {
    return this._wrappedType.isNullable();
  }

  // Utility getters
  get description(): string | undefined {
    return this._wrappedType.description;
  }

  // Completable-specific methods
  unwrap(): T {
    return this._def.wrappedType;
  }

  async complete(
    value: T["_input"],
    context?: {
      arguments?: Record<string, string>;
    },
  ): Promise<T["_input"][]> {
    return this._def.complete(value, context);
  }

  static create = <T extends ZodTypeAny>(
    type: T,
    complete: CompleteCallback<T>,
  ): Completable<T> => {
    return new Completable(type, complete);
  };
}

export function completable<T extends ZodTypeAny>(
  schema: T,
  complete: CompleteCallback<T>,
): Completable<T> {
  return Completable.create(schema, complete);
}
