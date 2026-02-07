计划将[原内容](https://github.com/NanTingPer/NapCatScriptPlugins/blob/main/TestPlugin/CalamityWiki.cs)迁移到官方插件。

[NapCat的插件开发之旅](https://github.com/NanTingPer/Learning-Notes/blob/master/NapCat%E7%9A%84%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%E4%B9%8B%E6%97%85.md)就一点点...

# 目录结构

```md
napcat-terraria-wiki-plugin/
├── src/
│   ├── core/                 # 核心功能模块
│   │   ├── Init.ts           # 插件初始化逻辑
│   │   └── 消息处理.ts       # 消息处理与响应逻辑
│   │
│   ├── ids/                  # 模组物品/NPC ID 数据
│   │   ├── CalamityModItems.ts    # 灾厄模组物品 ID
│   │   ├── CalamityModNPCs.ts     # 灾厄模组 NPC ID
│   │   └── index.ts
│   │
│   ├── types/                # 类型定义
│   │   ├── ConfigEnum.ts     # 配置枚举定义
│   │   ├── ConfigType.ts     # 配置类型定义
│   │   ├── ModName.ts        # 模组名称枚举
│   │   └── index.ts
│   │
│   ├── utils/                # 工具类
│   │   ├── MBrowser.ts       # 浏览器封装类（基于 Puppeteer）
│   │   ├── Send.ts           # 消息发送工具
│   │   ├── Utils.ts          # 通用工具函数
│   │   └── index.ts
│   │
│   ├── global.ts             # 全局变量与配置
│   └── index.ts              # 插件入口文件
├── copy.js                   # 构建后文件复制脚本
```



---

# 项目说明

现在已经支持正常截取灾厄Wiki的页面。使用`-` + `名称` 如 `-天蓝锭`就会访问wiki界面并截取。随后保存到本地。

---

# 使用方式

安装插件后需要配置浏览器位置和文件保存路径，可以在插件配置中设置。

需要执行 `npm install puppeteer` 用于下载`puppeteer`所需的浏览器环境。

其下载的浏览器位于`$home/.cache/puppeteer/chrome`，`.cache`目录默认被隐藏，需要使用` ls -la` / `ls -a`。

安装完成后使用`ldd chrome`查看是否有缺少运行库。如有，请安装。

```sh
sudo yum install -y \
  alsa-lib \
  atk \
  cups-libs \
  dbus-glib \
  expat \
  fontconfig \
  gdk-pixbuf2 \
  glib2 \
  gtk3 \
  libXcomposite \
  libXcursor \
  libXdamage \
  libXext \
  libXi \
  libXrandr \
  libXScrnSaver \
  libXtst \
  nss \
  pango \
  xorg-x11-fonts-100dpi \
  xorg-x11-fonts-75dpi \
  xorg-x11-fonts-cyrillic \
  xorg-x11-fonts-misc \
  xorg-x11-fonts-Type1 \
  xorg-x11-utils \
  libdrm \
  liberation-fonts \
  ca-certificates \
  wget \
  lsb-release
```

