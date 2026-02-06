import type { NapCatPluginContext } from 'napcat-types/napcat-onebot/network/plugin-manger';

import { onMessage } from './消息处理'
function plugin_init(ctx: NapCatPluginContext) : void {
    ctx.logger.info("111");
}

export { plugin_init };
export const plugin_onmessage  = onMessage;