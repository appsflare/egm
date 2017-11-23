import { ObjectType } from "typedi";
import { BaseModel, buildSchema } from "../lib";
import { model } from 'mongoose';

export function createModel<TModel extends BaseModel>(modelClass: ObjectType<TModel>) {
    const schema = buildSchema(modelClass);
    schema.loadClass(modelClass);
    return model(modelClass.name, schema);
}