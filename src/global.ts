import { MBrowser } from "./utils/MBrowser"
let global_browser: MBrowser;
async function InitBrowser(filePath: string) {
    global_browser = new MBrowser(filePath);
    await global_browser.InitBrowser();
}

export { global_browser, InitBrowser }