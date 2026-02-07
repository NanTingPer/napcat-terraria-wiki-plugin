import { OB11Message } from 'napcat-types';
import type { NapCatPluginContext } from "napcat-types/napcat-onebot/network/plugin-manger";
import { Send, Utils } from '../utils'
import { ModName } from '../types/ModName';
import { global_browser, global_config_value, baseUrl } from '../global';
import * as fs from 'fs'
import * as path from 'path'

async function onMessage (ctx : NapCatPluginContext, event : OB11Message){
    let send = new Send(ctx);
    let message = event.raw_message;
    if(message.startsWith('-')){
        let valueName = message.slice(1).trim();
        ScreenshotOrReadFile(ctx, event, "Calamity", valueName);
    }
}


/**
 * 如果文件存在，返回，如果文件不存在，截取
 * @param params 
 */
async function ScreenshotOrReadFile(ctx : NapCatPluginContext, event: OB11Message, modName:string, valueName: string) {
    let send = new Send(ctx);
    if(global_config_value.res_path == undefined) {
        ctx.logger.error("资源目录未设置！");
        return;
    }
    
    let url: string | undefined;
    if (Object.values(ModName).includes(modName as ModName)) {
        url = baseUrl.get(modName as ModName);
    } else {
        send.SendTextMsg("未知模组名称: " + modName, event.message_type, event.group_id == undefined ? event.user_id : event.group_id);
        return;
    }

    let dirPath = path.join(global_config_value.res_path, modName);
    let filePath = path.join(dirPath, valueName + '.png');
    if(!fs.existsSync(dirPath)){ //判断目标模组的资源目录是否存在
        fs.mkdir(dirPath, { recursive: true }, (a, aa) => {});
    }

    if(fs.existsSync(filePath)){ // 存在直接all in 发送
        let base64 = Utils.FileToBase64(filePath);
        if(base64 != undefined){
            send.SendImage(base64,
                event.group_id == undefined ? event.user_id : event.group_id,
                event.message_type
            );
            return;
        }
    }

    /** 后续就是不存在文件了 */
    url = url + valueName;
    let u8array: Uint8Array | undefined = await global_browser.ScreenshotUint8Array(url, 6000, RemoveElement);
    if(u8array == undefined){
        send.SendTextMsg("物品截取失败: " + modName, event.message_type, event.group_id == undefined ? event.user_id : event.group_id);
        return;
    }
    let buffer = Buffer.from(u8array);
    let base64 = buffer.toString('base64');
    send.SendImage(base64,
        event.group_id == undefined ? event.user_id : event.group_id,
        event.message_type
    );
    fs.writeFileSync(filePath, buffer)
}

function RemoveElement(){
    let element = document.querySelectorAll('.calamitas.mw-collapsible.mw-made-collapsible');
    element.forEach(f => f.remove());

    let element2 = document.querySelectorAll('.calamity.mw-collapsible.mw-made-collapsible.mw-collapsed');
    element2.forEach(f => f.remove());

    // 头
    let head = document.querySelectorAll('skin-subnav');
    head.forEach(f => f.remove());

    // 导航
    let tocul = document.querySelectorAll('#toc');
    tocul.forEach(f => f.remove())
    
    document.querySelectorAll('.owl-wrapper-outer').forEach(f => f.remove());

    // 底部停机坪 不删除全部 需要保留版权声明
    document.querySelectorAll('#localNotice').forEach(f => f.remove());
}

export { onMessage }