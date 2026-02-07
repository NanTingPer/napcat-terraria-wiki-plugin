import puppeteer, { HTTPResponse, Browser } from 'puppeteer-core'
export class MBrowser{
    private browser?: Browser;
    private browserPath: string;
    /**
     * 
     * @param browserExePath 浏览器的可执行文件路径
     */
    constructor(browserExePath: string) {
        this.browserPath = browserExePath;
    }
    /**
     * 初始化浏览器
     */
    public async InitBrowser() {
        if(this.browser != undefined) return;
        this.browser = await this.CreateBrowser();
    }

    /**
     * 如果浏览器未被定义，请先执行InitBrowser方法
     * @param url 要被截取的url
     * @returns 图片Uint8Array
     */
    public async ScreenshotUint8Array(url: string): Promise<Uint8Array | undefined> {
        if(this.browser == undefined) {
            await this.InitBrowser();
        }
        if(this.browser == undefined) return;
        let page = await this.browser.newPage();
        let rep : HTTPResponse | null = await page.goto(url);
        let array: Uint8Array = await page.screenshot();
        try {
            await page.close();
        } catch {}
        return array;
    }

    /**
     * 
     * @param url 要被截取的url
     * @returns 图片base64字串, 失败返回undefined
     */
    public async ScreenshotBase64(url: string): Promise<string | undefined> {
        let u8result = await this.ScreenshotUint8Array(url);
        if(u8result == undefined) return;
        return Buffer.from(u8result).toString('base64');
    }

    /**
     * 关闭这个浏览器 {@link browser } 和全部页面
     */
    public async Close(){
        this.browser?.close();
    }

    private CreateBrowser() : Promise<Browser>{
        return puppeteer.launch({
                executablePath: this.browserPath,
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
    }
}
