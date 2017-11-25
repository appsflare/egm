import { ObjectType } from "typedi";
import { SchemaDefinition, SchemaTypeOpts, SchemaType } from "mongoose";
export type ValueType = SchemaTypeOpts<any> | SchemaType;
export enum MiddlewareType {
    Pre = "Pre",
    Post = "Post"
};

interface MiddlewareMap {
    [key: string]: Function
}

const schemaProps = new Map<string, SchemaDefinition>();
const middlewares: any = {};

middlewares[MiddlewareType.Pre] = new Map<string, MiddlewareMap>();
middlewares[MiddlewareType.Post] = new Map<string, MiddlewareMap>();


export function setPropsFor<T>(target: ObjectType<T>, propKey: string, value: ValueType) {
    const targetName = target.name;
    let existingChunks = schemaProps.get(targetName) || {};
    existingChunks[propKey] = value;
    schemaProps.set(targetName, existingChunks);
}

export function setMiddleware<T>(target: ObjectType<T>, type: MiddlewareType, eventKey: string, value: Function) {
    const map = middlewares[type] as Map<string, MiddlewareMap>;
    const targetName = target.name;
    let existingChunks = map.get(targetName) || {};
    existingChunks[eventKey] = value;
    map.set(targetName, existingChunks);
}

export function getMiddlewaresFor<T>(target: ObjectType<T>, type: MiddlewareType) {
    const targetName = target.name;
    return middlewares[type].get(targetName) || {};
}

export function getPropsFor<T>(target: ObjectType<T>) {
    const targetName = target.name;
    return schemaProps.get(targetName) || {};
}