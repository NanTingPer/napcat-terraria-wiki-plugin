import { existsSync, readFileSync  } from 'fs'
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
}