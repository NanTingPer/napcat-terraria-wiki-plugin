import { OB11Message } from 'napcat-types';
import type { NapCatPluginContext } from "napcat-types/napcat-onebot/network/plugin-manger";
import { Send } from './utils';
import { existsSync, readFileSync  } from 'fs'

async function onMessage (ctx : NapCatPluginContext, event : OB11Message){
    let send = new Send(ctx);
    existsSync('/test.jpg');
    let buffer: Buffer<ArrayBuffer> =  readFileSync('/test.jpg');
    send.SendImage(buffer.toString('base64'), 'qqid', 'private');
}
export { onMessage }