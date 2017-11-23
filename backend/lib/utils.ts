export function toArray(obj: any) {
    return Object.keys(obj).map(k => obj[k]);
}

export function pack(key: string, value: any) {
    const obj: any = {};
    obj[key] = value;
    return obj;
}