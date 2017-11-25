import { ModuleManifest } from 'types';
import { GatewaysModuleInfo } from 'modules/gateways';
import { CoreModuleInfo } from 'modules/core';
const modules = [CoreModuleInfo, GatewaysModuleInfo] as Array<ModuleManifest>;

export default modules.slice();