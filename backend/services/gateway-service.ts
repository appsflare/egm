import { Service, Token, Inject } from 'typedi';
import { IGatewayModel, IGatewayConfigModel, GatewayModel } from '../models';
import { Document, Model } from 'mongoose';

export interface IGatewayService {
    getAll(): Promise<IGatewayModel[]>;

    register(gateway: IGatewayModel): Promise<IGatewayModel>;

    saveConfig(id: any, config: IGatewayConfigModel): Promise<IGatewayConfigModel>;
}

@Service(GatewayService.type)
export class GatewayService implements IGatewayService {

    static type = new Token<GatewayService>();

    constructor( @Inject(GatewayModel.type) private readonly gatewayModel: Model<IGatewayModel & Document>) {
    }

    async  getAll(): Promise<IGatewayModel[]> {
        const result = await this.gatewayModel.find();
        return result.map(r => r.toJSON() as IGatewayModel);
    }

    async register(gateway: IGatewayModel): Promise<IGatewayModel> {
        const result = await this.gatewayModel.create(gateway);
        return result.toJSON() as IGatewayModel;

    }

    async saveConfig(id: any, config: IGatewayConfigModel): Promise<IGatewayConfigModel> {
        const gateway = await this.gatewayModel.findById(id).select('config');
        if (gateway === null) {
            throw new Error('Gateway not found');
        }
        const result = await this.gatewayModel.findByIdAndUpdate(gateway._id, { config: { ...gateway.config, ...config } });
        if (result === null) {
            throw new Error('Failed to update config');
        }
        return (result.toJSON() as IGatewayModel).config;
    }

}