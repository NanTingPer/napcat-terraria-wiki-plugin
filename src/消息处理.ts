import { OB11Message } from 'napcat-types';
import type { NapCatPluginContext } from "napcat-types/napcat-onebot/network/plugin-manger";
import { Send, Utils } from './utils';
import puppeteer, { HTTPResponse } from 'puppeteer-core'

async function onMessage (ctx : NapCatPluginContext, event : OB11Message){
    let browserPath = "/root/.cache/puppeteer/chrome/linux-145.0.7632.46/chrome-linux64/chrome";//chrome
    let send = new Send(ctx);
    if(event.raw_message.includes('截图')){
        let browser = await puppeteer.launch({
            executablePath: browserPath,
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu', // 不用gpu
                '--disable-software-rasterizer',
                '--remote-debugging-pipe' // 不使用ws,而是管道 (强制)
            ],
            ignoreDefaultArgs: ['--disable-extensions'],
            browserWSEndpoint: undefined,
        });
        let page = await browser.newPage();
        let rep : HTTPResponse | null = await page.goto('https://www.baidu.com');
        let array: Uint8Array = await page.screenshot();
        let send = new Send(ctx);
        let base64 = Buffer.from(array).toString('base64');
        send.SendImage(base64, 'id', 'private');
    }
}
export { onMessage }