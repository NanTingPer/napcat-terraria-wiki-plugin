import { NapCatPluginContext, PluginConfigUIController } from "napcat-types/napcat-onebot/network/plugin-manger";
import { global_config_schema, global_config_value } from "../global";
export async function UpdateConfig(
    context: NapCatPluginContext, 
    uiController: PluginConfigUIController, 
    key: string, 
    value: any, 
    currentConfig: Record<string, any>) {
    // 不动态更新了， 让用户重启插件吧
}