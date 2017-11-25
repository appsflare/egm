import { SchemaTypeOpts, SchemaType } from 'mongoose';
import { setMiddleware, setPropsFor, getPropsFor, MiddlewareType } from './data';

const isPrimitive = (Type: any) => ['String', 'Number', 'Boolean', 'Date'].indexOf(Type.name) > -1;

export function prop(options?: SchemaTypeOpts<any> | SchemaType) {
    return function (target: any, propertyKey: string) {

        const Type = Reflect.getMetadata('design:type', target, propertyKey);

        if (!Type) {
            throw new Error(`No metadata defined for the key: ${propertyKey}`);
        }

        if (options !== undefined && (options as any).type === undefined && isPrimitive(Type)) {
            (options as any).type = Type;
        }

        const finalOptions = options || (isPrimitive(Type) ? { type: Type } : getPropsFor(Type));

        if (!finalOptions) {
            return;
        }

        setPropsFor(target.constructor, propertyKey, finalOptions);
    }
}

function preOrPost(eventKey: string, type: MiddlewareType) {
    return function (target: any, propertyKey: string) {

        const Type = Reflect.getMetadata('design:type', target, propertyKey);

        if (!Type) {
            throw new Error(`No metadata defined for the key: ${propertyKey}`);
        }

        setMiddleware(target.constructor, type, eventKey, target[propertyKey]);
    }
}

export function pre(eventKey: string) {
    return preOrPost(eventKey, MiddlewareType.Pre);
}

export function post(eventKey: string) {
    return preOrPost(eventKey, MiddlewareType.Pre);
}