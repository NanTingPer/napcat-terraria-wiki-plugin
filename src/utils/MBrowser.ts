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
    public async ScreenshotUint8Array(url: string, waitTime: number = 1000, evaluate: () => void = () => {}): Promise<Uint8Array | undefined> {
        if(this.browser == undefined) {
            await this.InitBrowser();
        }
        if(this.browser == undefined) return;
        let page = await this.browser.newPage();
        // let scale = 1.5;
        page.setViewport({ width: 0, height: 1080})
        page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
        });
        let rep : HTTPResponse | null = await page.goto(url);
        await this.sleep(waitTime);
        let fnStr = evaluate.toString();
        await page.evaluate((fnStr) => {
            try {
                eval(`(${fnStr})()`);
            } catch(e) {   }

            /** 
             * 在删除元素后页面大小要重新计算
             */
            document.body.style.visibility = 'hidden';
            document.body.style.visibility = 'visible';
            const forceReflow = document.body.offsetHeight;
            return new Promise(resolve => requestAnimationFrame(resolve));
        }, fnStr)

        let array: Uint8Array = await page.screenshot({
            fullPage: true,
            type: 'png',
            omitBackground: false
        });
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
    public async ScreenshotBase64(url: string, waitTime: number = 1000, evaluate: () => void = () => {}): Promise<string | undefined> {
        let u8result = await this.ScreenshotUint8Array(url, waitTime, evaluate);
        if(u8result == undefined) return;
        return Buffer.from(u8result).toString('base64');
    }

    /**
     * 关闭这个浏览器 {@link browser } 和全部页面
     */
    public async Close(){
        this.browser?.close();
    }

    private async CreateBrowser() : Promise<Browser>{
        let browser = await puppeteer.launch({
                executablePath: this.browserPath,
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu', // 不用gpu
                    '--disable-software-rasterizer',
                    '--remote-debugging-pipe', // 不使用ws,而是管道 (强制)
                    '--disable-blink-features=AutomationControlled'
                ],
                ignoreDefaultArgs: ['--disable-extensions'],
                browserWSEndpoint: undefined,
                waitForInitialPage: true, //等待加载完成
        });
        return browser;
    }

    private sleep(ms : number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
