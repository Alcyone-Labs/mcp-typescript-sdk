"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Completable = exports.McpZodTypeKind = void 0;
exports.completable = completable;
var McpZodTypeKind;
(function (McpZodTypeKind) {
    McpZodTypeKind["Completable"] = "McpCompletable";
})(McpZodTypeKind || (exports.McpZodTypeKind = McpZodTypeKind = {}));
class Completable {
    // ZodType compatibility properties
    get _output() {
        return this._wrappedType._output;
    }
    get _input() {
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
    constructor(type, complete) {
        this._wrappedType = type;
        this._def = {
            type: type._def.type,
            complete,
            typeName: McpZodTypeKind.Completable,
            wrappedType: type,
        };
    }
    // Core parsing methods
    parse(input) {
        return this._wrappedType.parse(input);
    }
    safeParse(input) {
        return this._wrappedType.safeParse(input);
    }
    parseAsync(input) {
        return this._wrappedType.parseAsync(input);
    }
    safeParseAsync(input) {
        return this._wrappedType.safeParseAsync(input);
    }
    // Schema manipulation methods
    optional() {
        return new Completable(this._wrappedType.optional(), this._def.complete);
    }
    nullable() {
        return new Completable(this._wrappedType.nullable(), this._def.complete);
    }
    nullish() {
        return new Completable(this._wrappedType.nullish(), this._def.complete);
    }
    nonoptional() {
        return new Completable(this._wrappedType.nonoptional(), this._def.complete);
    }
    array() {
        return this._wrappedType.array();
    }
    or(schema) {
        return this._wrappedType.or(schema);
    }
    and(schema) {
        return this._wrappedType.and(schema);
    }
    // Transformation methods
    transform(transformer) {
        return this._wrappedType.transform(transformer);
    }
    default(defaultValue) {
        return new Completable(this._wrappedType.default(defaultValue), this._def.complete);
    }
    catch(catchValue) {
        return new Completable(this._wrappedType.catch(catchValue), this._def.complete);
    }
    pipe(schema) {
        return this._wrappedType.pipe(schema);
    }
    // Additional ZodType v4 methods
    register(registry, ...meta) {
        return this._wrappedType.register(registry, ...meta);
    }
    spa(input) {
        return this._wrappedType.spa(input);
    }
    overwrite(overrides) {
        return new Completable(this._wrappedType.overwrite(overrides), this._def.complete);
    }
    prefault(prefaultValue) {
        return new Completable(this._wrappedType.prefault(prefaultValue), this._def.complete);
    }
    // Refinement methods
    refine(refinement, message) {
        return this._wrappedType.refine(refinement, message);
    }
    superRefine(refinement) {
        return this._wrappedType.superRefine(refinement);
    }
    // Utility methods
    readonly() {
        return this._wrappedType.readonly();
    }
    describe(description) {
        return new Completable(this._wrappedType.describe(description), this._def.complete);
    }
    meta(meta) {
        return this._wrappedType.meta(meta);
    }
    brand() {
        return this._wrappedType.brand();
    }
    check(check) {
        return this._wrappedType.check(check);
    }
    clone() {
        return new Completable(this._wrappedType.clone(), this._def.complete);
    }
    // Status check methods
    isOptional() {
        return this._wrappedType.isOptional();
    }
    isNullable() {
        return this._wrappedType.isNullable();
    }
    // Utility getters
    get description() {
        return this._wrappedType.description;
    }
    // Completable-specific methods
    unwrap() {
        return this._def.wrappedType;
    }
    async complete(value, context) {
        return this._def.complete(value, context);
    }
}
exports.Completable = Completable;
Completable.create = (type, complete) => {
    return new Completable(type, complete);
};
function completable(schema, complete) {
    return Completable.create(schema, complete);
}
//# sourceMappingURL=completable.js.map