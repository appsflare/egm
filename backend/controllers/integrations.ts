import { JsonController, Post, Body } from 'routing-controllers';
import { Inject } from 'typedi';
import { GatewayService, IGatewayService } from '../services';
import { IGatewayModel } from '../models';

@JsonController("/api/integrations")
export class IntegrationsController {

  constructor( @Inject(GatewayService.type) private readonly gatewayService: IGatewayService) {
  }

  @Post("/gateways")
  registerGateway(@Body()gateway: IGatewayModel) {    
    return this.gatewayService.register(gateway);
  }
}