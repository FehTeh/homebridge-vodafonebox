"use strict";

var Service, Characteristic, ChannelCharacteristic;

var inherits  = require('util').inherits;;

var vodafone = require('vodafone-controller');

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	
    makeChannelCharacteristic();
	
	homebridge.registerAccessory("homebridge-vodafonebox", "VodafoneBox", VodafoneBox);
}

function VodafoneBox(log, config) {
    this.log = log;
    this.config = config;
    this.name = config['name'];
	this.ip = config['ip']

	this.service = new Service.Switch(this.name);
	
    this.service.getCharacteristic(Characteristic.On)
        .on('get', this._getOn.bind(this))
		.on('set', this._setOn.bind(this));
		
	this.service.addCharacteristic(ChannelCharacteristic)
        .on('get', this._getChannel.bind(this))
        .on('set', this._setChannel.bind(this));
}

function makeChannelCharacteristic() {

    ChannelCharacteristic = function () {
        Characteristic.call(this, 'Channel', '212131F4-2E14-4FF4-AE13-C97C3232499D');
        this.setProps({
            format: Characteristic.Formats.STRING,
            unit: Characteristic.Units.NONE,
            perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
        });
        this.value = this.getDefaultValue();
    };

    inherits(ChannelCharacteristic, Characteristic);
}

VodafoneBox.prototype.getServices = function() {
    var informationService = new Service.AccessoryInformation();
    informationService
        .setCharacteristic(Characteristic.Name, this.name)
        .setCharacteristic(Characteristic.Manufacturer, 'Vodafone')
        .setCharacteristic(Characteristic.Model, '1.0.0')
        .setCharacteristic(Characteristic.SerialNumber, this.ip);
    return [this.service, informationService];
};

VodafoneBox.prototype._getOn = function(callback) {
	var accessory = this;

	var state = vodafone.getState(accessory.ip);

	callback(null, state == "ON");

};

VodafoneBox.prototype._setOn = function(on, callback) {
    var accessory = this;
	var command = "power";
	
	vodafone.setKey(accessory.ip, command);

	setTimeout(function() {

		var state = vodafone.getState(accessory.ip);

		callback(on ? (state == "ON" ? null : "Failed") : (state == "OFF" ? null : "Failed"));

	}, 5000);

};

VodafoneBox.prototype._getChannel = function(callback) {
	var accessory = this;
	
	var channel = vodafone.getChannel(accessory.ip)

	channel == "UNKNOWN" ? callback("Failed") : callback(null, channel);
}

VodafoneBox.prototype._setChannel = function(channel, callback) {
	var accessory = this;
	callback("Failed"); //null if ok
}