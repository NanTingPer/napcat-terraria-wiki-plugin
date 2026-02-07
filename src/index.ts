import type { NapCatPluginContext, PluginModule } from 'napcat-types/napcat-onebot/network/plugin-manger';
import { onMessage } from './core/消息处理'
import { UpdateConfig } from './core/ConfigChange';
import { InitPlugin } from './core/Init';
import { global_config_schema } from './global';

const plugin_init: PluginModule['plugin_init'] = plugin_init_headle;
const plugin_onmessage: PluginModule['plugin_onmessage'] = onMessage;
const plugin_on_config_change: PluginModule['plugin_on_config_change'] = UpdateConfig;

export const plugin_config_ui = global_config_schema;
function plugin_init_headle(ctx: NapCatPluginContext) {
    ctx.logger.info('==============初始化====================');
    let ip = new InitPlugin(ctx);
    ip
        .InitConfig()
        .InitBrowser();
    ctx.logger.info('====================================');
}

export { plugin_init, plugin_onmessage, plugin_on_config_change };