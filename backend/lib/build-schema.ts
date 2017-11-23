import { Schema } from "mongoose";
import { ObjectType } from 'typedi';
import { getPropsFor } from './decorators/data';
import { BaseModel } from "./base-model";

export function buildSchema<TModel extends BaseModel>(target: ObjectType<TModel>): Schema {
    console.log('building schema definition for:', target.name);
    const schemaDefinition = getPropsFor(target);

    return new Schema(schemaDefinition);
}