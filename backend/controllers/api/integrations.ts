import { Authenticated, Controller, Post, BodyParams } from 'ts-express-decorators';
import { Inject } from 'typedi';
import { GatewayService, IGatewayService } from '../../services';
import { IGatewayModel } from '../../models';

@Authenticated()
@Controller("/api/integrations")
export class IntegrationsController {

  constructor( @Inject(GatewayService.type) private readonly gatewayService: IGatewayService) {
  }

  @Post("/gateways")
  registerGateway( @BodyParams() gateway: IGatewayModel) {
    return this.gatewayService.register(gateway);
  }
}