import type { NapCatPluginContext, PluginModule } from 'napcat-types/napcat-onebot/network/plugin-manger';
import { onMessage } from './消息处理'

const plugin_init: PluginModule['plugin_init'] = plugin_init_headle;
const plugin_onmessage: PluginModule['plugin_onmessage'] = onMessage;

function plugin_init_headle(ctx: NapCatPluginContext) {
    ctx.logger.info('==============初始化====================');
    ctx.logger.info('awdaaaaaaaaaaaaaaawf');
    ctx.logger.info('====================================');
}

export { plugin_init, plugin_onmessage };