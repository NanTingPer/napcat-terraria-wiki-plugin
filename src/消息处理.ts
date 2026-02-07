import { OB11Message } from 'napcat-types';
import type { NapCatPluginContext } from "napcat-types/napcat-onebot/network/plugin-manger";
import { Send, Utils } from './utils'
import { global_browser } from './global';

async function onMessage (ctx : NapCatPluginContext, event : OB11Message){
    let send = new Send(ctx);
    if(event.raw_message.includes('截图')){
        let base64 = await global_browser.ScreenshotBase64("https://www.baidu.com");
        if(base64 == undefined) return;
        send.SendImage(base64, '', 'private');
    }
}
export { onMessage }