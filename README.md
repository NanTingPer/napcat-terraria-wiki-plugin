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

