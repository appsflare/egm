import { Service } from 'typedi';
import { createModel, prop, BaseModel } from '../lib';

export interface IGatewayConfigModel {
    keyId: string;
    keySecret: string;
}

export interface IGatewayModel {
    name: string;

    adminApi: string;

    adminPingEndpoint: string;

    gatewayPingEndpoint: string;

    config: IGatewayConfigModel;
}

function factory() {
    return createModel(GatewayModel);
}

class GatewayConfigModel extends BaseModel implements IGatewayConfigModel {
    @prop()
    keyId: string;
    @prop()
    keySecret: string;
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

    @prop()
    config: GatewayConfigModel;

}


