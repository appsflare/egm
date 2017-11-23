import { SchemaTypeOpts, SchemaType } from 'mongoose';
import { setPropsFor, getPropsFor } from './data';

const isPrimitive = (Type: any) => ['String', 'Number', 'Boolean', 'Date'].indexOf(Type.name) > -1;

export function prop(options?: SchemaTypeOpts<any> | SchemaType) {
    return function (target: any, propertyKey: string) {

        const Type = Reflect.getMetadata('design:type', target, propertyKey);

        if (!Type) {
            throw new Error(`No metadata defined for the key: ${propertyKey}`);
        }
        const finalOptions = options || isPrimitive(Type) ? { type: Type } : getPropsFor(Type);

        if (!finalOptions) {
            return;
        }

        setPropsFor(target.constructor, propertyKey, finalOptions);
    }
}

