# SERVE tool

    Express.js based tool to deploy an app

## Install

1. Clone repo

```bash
cd cloned/dir
```

```bash
npm install
```

2. Add yourDir/serve to your %PATH in order for script to run anywhere

## Usage

1. Options:
   --port => set a port on which you want to serve you app (default 3000)\
   --dir => set dir location of your app build folder (default current directory)\
   --file => set entry html file (default "index.html")\
   --https => toggle https mode\
   --key => provide key.pem file PATH\
   --cert => provide cert.pem file PATH\

Sample usage to run on port 2000 directly from your build folder:

```bash
cd your/build/dir
```

```bash
serve --port="2000" --file="entry.html" --dir="dir/to/your/build" --https="true" --key="path/to/mykey.pem" --cert="path/to/my/cert.pem"
```
