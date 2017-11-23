import { ObjectType } from "typedi";
import { SchemaDefinition, SchemaTypeOpts, SchemaType } from "mongoose";
export type ValueType = SchemaTypeOpts<any> | SchemaType;
const schemaProps = new Map<string, SchemaDefinition>();

export function setPropsFor<T>(target: ObjectType<T>, propKey: string, value: ValueType) {
    const targetName = target.name;
    let existingChunks = schemaProps.get(targetName) || {};
    existingChunks[propKey] = value;
    schemaProps.set(targetName, existingChunks);
}

export function getPropsFor<T>(target: ObjectType<T>) {
    const targetName = target.name;
    return schemaProps.get(targetName) || {};
}