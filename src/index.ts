import type { NapCatPluginContext, PluginModule } from 'napcat-types/napcat-onebot/network/plugin-manger';
import { onMessage } from './消息处理'
import { InitBrowser } from './global';

const plugin_init: PluginModule['plugin_init'] = plugin_init_headle;
const plugin_onmessage: PluginModule['plugin_onmessage'] = onMessage;

function plugin_init_headle(ctx: NapCatPluginContext) {
    ctx.logger.info('==============初始化浏览器====================');
    let browserPath = "/root/.cache/puppeteer/chrome/linux-145.0.7632.46/chrome-linux64/chrome";//chrome
    InitBrowser(browserPath);
    ctx.logger.info('====================================');
}

export { plugin_init, plugin_onmessage };