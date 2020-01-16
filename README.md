# homebridge-vodafonebox
![](https://github.com/jarvisFT/homebridge-vodafonebox/workflows/Node.js%20Package/badge.svg) [![npm](https://img.shields.io/npm/v/homebridge-vodafonebox.svg)](https://www.npmjs.com/package/homebridge-vodafonebox)
[![npm](https://img.shields.io/npm/dt/homebridge-vodafonebox.svg)](https://www.npmjs.com/package/homebridge-vodafonebox)

## Homebridge plugin for Vodafone set-top-box
This plugin uses the tcp port of the mediaroom set-top-box to control it.

## Configuration

Configuration sample:

 ```
"accessories": [
        {
            "accessory": "VodafoneBox",
            "name": "Box Living room",
            "ip": "192.168.178.20"
        }
    ]
```
