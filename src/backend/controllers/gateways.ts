import { Controller, Get } from 'routing-controllers';

@Controller("api/gateways")
export class GatewaysController {

  @Get("/list")
  getList() {
    return [{ name: "default" }];
  }
}