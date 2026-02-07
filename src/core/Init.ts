import { InitBrowser as ib, global_config_schema, global_config_value } from "../global";
import { NapCatPluginContext } from "napcat-types/napcat-onebot/network/plugin-manger";
import { ConfigEnum } from '../types/index'
import { existsSync, readFileSync } from 'fs'
import { CalamityItemsIds } from "../ids";

export class InitPlugin {
    private context: NapCatPluginContext;
    /**
     *
     */
    constructor(context: NapCatPluginContext) {
        this.context = context;
    }

    public InitConfig() : InitPlugin {
        let defaultPath = "/root/.cache/puppeteer/chrome/linux-145.0.7632.46/chrome-linux64/chrome";
        let value = this.context.NapCatConfig.combine(
            this.context.NapCatConfig.text(
                ConfigEnum.browser_path, 
                "浏览器路径",
                defaultPath,
                undefined,
                true 
            ),

            this.context.NapCatConfig.text(
                ConfigEnum.ower_id,
                "测试目标QQ号",
                undefined,
                undefined,
                true
            ),

            this.context.NapCatConfig.text(
                ConfigEnum.res_path,
                "图片文件的存储路径",
                undefined,
                undefined,
                true
            )
        )
        global_config_schema.push(...value);
        try {
            if (existsSync(this.context.configPath)) {
                const savedConfig = JSON.parse(readFileSync(this.context.configPath, 'utf-8'));
                Object.assign(global_config_value, savedConfig);
                this.context.logger.error("被保存的配置: \n" + JSON.stringify(savedConfig));
                if(global_config_value.browser_path == undefined){
                    global_config_value.browser_path = defaultPath;
                }
            } else {
                global_config_value.browser_path = defaultPath;
            }
        } catch (e) {
            this.context.logger.error("配置文件不存在");
        }
        return this;
    }

    public InitBrowser() : InitPlugin{
        let browserPath = global_config_value.browser_path;
        if(browserPath == undefined) {
            this.context.logger.error("浏览器路径未配置");
            return this;
        }
        this.context.logger.error("路径: " + browserPath);
        ib(browserPath);
        return this;
    }

    public GetAllImage() : InitPlugin {
        CalamityItemsIds.forEach(name => {
            
        });
        return this;
    }
}