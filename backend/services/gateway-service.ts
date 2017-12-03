import { Service,  Inject } from 'ts-express-decorators';
import { IGatewayModel, GatewayModel } from '../models';
import { Document, Model } from 'mongoose';

export interface IGatewayService {
    getAll(): Promise<IGatewayModel[]>;

    register(gateway: IGatewayModel): Promise<IGatewayModel>;    
}

@Service()
export class GatewayService implements IGatewayService {    

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

}