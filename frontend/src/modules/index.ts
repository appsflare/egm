import { ModuleManifest } from 'types';
import { AccountModuleInfo } from 'modules/account';
import { CoreModuleInfo } from 'modules/core';
import { GatewaysModuleInfo } from 'modules/gateways';

const modules = [AccountModuleInfo, CoreModuleInfo, GatewaysModuleInfo] as Array<ModuleManifest>;

export default modules.slice();