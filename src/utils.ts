import type { NapCatPluginContext } from "napcat-types/napcat-onebot/network/plugin-manger";
import { OB11MessageDataType, type OB11PostSendMsg, type OB11MessageImage, OB11MessageTextSchema, OB11MessageText } from 'napcat-types/napcat-types/index';

export class Send {
    private context : NapCatPluginContext;
    /**
     * 辅助类型 Send 用于发送内容
     */
    constructor(context: NapCatPluginContext) {
        this.context = context;   
    }

    /**
     * 发送消息
     * https://github.com/botuniverse/onebot-11/blob/d4456ee706f9ada9c2dfde56a2bcfc69752600e4/api/public.md#send_msg-%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF
     */
    public async SendMsg(msg : OB11PostSendMsg) {
        try {
            await this.context.actions.call('send_msg', msg, this.context.adapterName, this.context.pluginManager.config);
        } catch(ex: any){
            this.context.logger.error("SendMsg: " + ex);
        }
    }

    /**
     * 
     * @param msg 消息内容
     * @param type 消息类型
     * @param target_id 目标id
     */
    public async SendTextMsg(msg: string, type : 'private' | 'group', target_id: string | number){
        let ob11data: OB11MessageText = {
            type: OB11MessageDataType.text,
            data: {
                text: msg
            }
        } 
        let ob11msg = Send.CreateOB11PostMessage(type, target_id);
        ob11msg.message = ob11data;
        await this.SendMsg(ob11msg);
    }

    /**
     * 发送图片
     * @param fileBase64 图像文件的base64字串
     * @param target_id 目标qq号
     * @param type 
     * @param summary 消息描述
     */
    public async SendImage(fileBase64: string, target_id : string | number, type : 'group' | 'private', summary? : string){
        let message : OB11MessageImage = {
            type: OB11MessageDataType.image,
            data: {
                file: "base64://" + fileBase64,
                summary: summary
            }
        }
        
        let ob11msg = Send.CreateOB11PostMessage(type, target_id);
        ob11msg.message = message;
        await this.SendMsg(ob11msg);
    }

    /**
     * 创建一个message为 "" 的OB11PostSendMsg对象
     * @param type 消息类型
     * @param target_id 目标号
     * @returns 
     */
    private static CreateOB11PostMessage(type : 'group' | 'private', target_id : string | number) : OB11PostSendMsg{
        let msg : OB11PostSendMsg = {
            message: ""
        }
        msg.message_type = type;
        type == 'group' 
            ? msg.group_id = String(target_id) 
            : msg.user_id = String(target_id);
        return msg;
    }
}