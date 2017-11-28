import { Schema } from "mongoose";
import { ObjectType } from 'typedi';
import { getPropsFor, getMiddlewaresFor, MiddlewareType } from './decorators/data';
import { BaseModel } from "./base-model";

export function buildSchema<TModel extends BaseModel>(target: ObjectType<TModel>): Schema {
    console.log('building schema definition for:', target.name);
    const schemaDefinition = getPropsFor(target);
    const schema = new Schema(schemaDefinition);

    const preMiddlewares = getMiddlewaresFor(target, MiddlewareType.Pre);
    const postMiddlewares = getMiddlewaresFor(target, MiddlewareType.Post);
    Object.keys(preMiddlewares).forEach(eventKey => schema.pre(eventKey, preMiddlewares[eventKey]));
    Object.keys(postMiddlewares).forEach(eventKey => schema.pre(eventKey, postMiddlewares[eventKey]));

    return schema;
}