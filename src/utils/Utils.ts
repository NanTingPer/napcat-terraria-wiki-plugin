import { existsSync, readFileSync, writeFileSync, mkdir } from 'fs'
import path from 'path';
import { global_browser } from '../global';
export class Utils{
    /**
     * 
     * @param filePath 文件路径
     * @returns 文件不存在返回undefined 否则返回base64字符串 不包含url
     */
    public static FileToBase64(filePath: string) : string | undefined{
        if(existsSync(filePath)){
            return undefined;
        }
        let buffer: Buffer<ArrayBuffer> = readFileSync(filePath);
        return buffer.toString('base64');
    }

    /**
     * 截取网页并保存到本地
     * @param filePath 要被保存的文件全路径
     * @param url 要被截取的url
     * @param bak 如果要删除元素，请传入
     * @returns 
     */
    public static async ScreenshotWriteFile(filePath: string, url: string, bak: () => void): Promise<Buffer<ArrayBuffer> | undefined>{
        let u8array: Uint8Array | undefined = await global_browser.ScreenshotUint8Array(url, 6000, bak);
        if(u8array == undefined){
            return;
        }
        let buffer = Buffer.from(u8array);
        let base64 = buffer.toString('base64');
        let dirname = path.dirname(filePath);
        if(!existsSync(dirname)){
            mkdir(dirname, { recursive: true }, (a, aa) => {});
        }
        writeFileSync(filePath, buffer)
        return buffer;
    }
}