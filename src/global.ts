import { PluginConfigSchema  } from "napcat-types/napcat-onebot/network/plugin-manger";
import { MBrowser } from "./utils/MBrowser"
import { ConfigType } from "./types/ConfigType";
let global_browser: MBrowser;

async function InitBrowser(filePath: string) {
    global_browser = new MBrowser(filePath);
    await global_browser.InitBrowser();
}
/** 配置选项 */
let global_config_schema: PluginConfigSchema = [];
/** 配置值项 */
let global_config_value: ConfigType = {};

export { /** 全局浏览器 */ global_browser, InitBrowser, global_config_schema, global_config_value }