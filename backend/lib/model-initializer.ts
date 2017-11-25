import { ObjectType } from "typedi";
import { BaseModel, buildSchema } from "../lib";
import { model } from 'mongoose';

export function createModel<TModel extends BaseModel>(modelClass: ObjectType<TModel>, ...plugins: any[]) {
    const schema = buildSchema(modelClass);
    schema.loadClass(modelClass);
    plugins && plugins.forEach(p=>schema.plugin(p));
    return model(modelClass.name, schema);
}