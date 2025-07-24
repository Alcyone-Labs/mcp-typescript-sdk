import { z, ZodTypeAny } from "zod";
export declare enum McpZodTypeKind {
    Completable = "McpCompletable"
}
export type CompleteCallback<T extends ZodTypeAny = ZodTypeAny> = (value: T["_input"], context?: {
    arguments?: Record<string, string>;
}) => T["_input"][] | Promise<T["_input"][]>;
export interface CompletableDef<T extends ZodTypeAny = ZodTypeAny> {
    type: T["_def"]["type"];
    complete: CompleteCallback<T>;
    typeName: McpZodTypeKind.Completable;
    wrappedType: T;
}
export declare class Completable<T extends ZodTypeAny> {
    readonly _def: CompletableDef<T>;
    private _wrappedType;
    get _output(): T["_output"];
    get _input(): T["_input"];
    get def(): z.core.$ZodTypeDef;
    get type(): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "int" | "null" | "void" | "never" | "any" | "unknown" | "date" | "record" | "file" | "array" | "tuple" | "union" | "intersection" | "map" | "set" | "enum" | "literal" | "nullable" | "optional" | "nonoptional" | "success" | "transform" | "default" | "prefault" | "catch" | "nan" | "pipe" | "readonly" | "template_literal" | "promise" | "lazy" | "custom";
    get _zod(): z.core.$ZodTypeInternals<unknown, unknown>;
    get "~standard"(): z.core.$ZodStandardSchema<T>;
    constructor(type: T, complete: CompleteCallback<T>);
    parse(input: unknown): T["_output"];
    safeParse(input: unknown): {
        success: true;
        data: T["_output"];
    } | {
        success: false;
        error: any;
    };
    parseAsync(input: unknown): Promise<T["_output"]>;
    safeParseAsync(input: unknown): Promise<{
        success: true;
        data: T["_output"];
    } | {
        success: false;
        error: any;
    }>;
    optional(): Completable<z.ZodOptional<T>>;
    nullable(): Completable<z.ZodNullable<T>>;
    nullish(): Completable<z.ZodOptional<z.ZodNullable<T>>>;
    nonoptional(): Completable<z.ZodNonOptional<T>>;
    array(): z.ZodArray<T>;
    or(schema: ZodTypeAny): z.ZodUnion<[T, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>]>;
    and(schema: ZodTypeAny): z.ZodIntersection<T, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>>;
    transform(transformer: any): z.ZodPipe<T, z.ZodTransform<unknown, z.core.output<T>>>;
    default(defaultValue: any): Completable<z.ZodDefault<T>>;
    catch(catchValue: any): Completable<z.ZodCatch<T>>;
    pipe(schema: ZodTypeAny): z.ZodPipe<T, any>;
    register(registry?: any, ...meta: any[]): T;
    spa(input: unknown): Promise<z.ZodSafeParseResult<z.core.output<T>>>;
    overwrite(overrides: any): Completable<T>;
    prefault(prefaultValue: any): Completable<z.ZodPrefault<T>>;
    refine(refinement: any, message?: any): T;
    superRefine(refinement: any): T;
    readonly(): z.ZodReadonly<T>;
    describe(description: string): Completable<T>;
    meta(meta?: any): T;
    brand(): T;
    check(check: any): T;
    clone(): Completable<T>;
    isOptional(): boolean;
    isNullable(): boolean;
    get description(): string | undefined;
    unwrap(): T;
    complete(value: T["_input"], context?: {
        arguments?: Record<string, string>;
    }): Promise<T["_input"][]>;
    static create: <T_1 extends ZodTypeAny>(type: T_1, complete: CompleteCallback<T_1>) => Completable<T_1>;
}
export declare function completable<T extends ZodTypeAny>(schema: T, complete: CompleteCallback<T>): Completable<T>;
//# sourceMappingURL=completable.d.ts.map