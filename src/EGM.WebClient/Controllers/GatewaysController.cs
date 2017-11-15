using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGM.Common.Models.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace EGM.WebClient.Controllers
{
    [Route("api/[controller]")]
    public class GatewaysController : Controller
    {
        private readonly IOptions<GatewaysInfo> _gatewaysInfoAccessor;
        public GatewaysController(IOptions<GatewaysInfo> gatewaysInfoAccessor)
        {
            _gatewaysInfoAccessor = gatewaysInfoAccessor;
        }

        [HttpGet("[action]")]
        public IEnumerable<GatewayInfo> List()
        {
            return _gatewaysInfoAccessor.Value.Gateways;
        }
    }
}
