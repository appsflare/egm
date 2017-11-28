import { Service } from 'typedi';
import { createModel, prop, BaseModel } from '../lib';

export interface IGatewayModel {
    name: string;

    adminApi: string;

    adminPingEndpoint: string;

    gatewayPingEndpoint: string;    
}

function factory() {
    return createModel(GatewayModel);
}

@Service({ id: GatewayModel.type, factory })
export class GatewayModel extends BaseModel implements IGatewayModel {

    static type = GatewayModel.name;

    @prop()
    name: string;

    @prop()
    adminApi: string;

    @prop()
    adminPingEndpoint: string;

    @prop()
    gatewayPingEndpoint: string;
}


