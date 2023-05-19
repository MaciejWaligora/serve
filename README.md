## SERVE tool

    Express.js based tool to deploy an app

## Install

1. Clone repo
2. Add yourDir/serve to your %PATH in order for script to run anywhere

## Usage

1. Options:
   --port => set a port on whioch you want to serve you app (default 3000)
   --dir => set dir location of your app build folder by default current directory will be used

2. Build folder must have following structure:
   -YourBuildFolder:
    -static:
        -css
        -js
    -index.html

 Sample usage to run on port 2000 directly from your build folder:

```bash
cd your/build/dir
```

