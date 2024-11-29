
const CryptoJS = require('./crypto-js-sha256.js')

// 需要CryptoJS
// ==================================================================================
var HOTP = function(secret = null, counter = 0) {
	this.secret = secret == null ? null : CryptoJS.enc.Utf8.parse(secret);
	this.counter = counter;
};

HOTP.prototype.setSecret = function(secret, format = null) {
	this.secret = this._convertSecret(secret, format);
}

HOTP.prototype.gen = function(counter = null) {
	if (counter === null) {
		if (this.counter === undefined || this.counter === null) {
			this.counter = 0;
		}
		counter = this.counter;
	}
	return this._gen(this.secret, counter);
}

HOTP.prototype.verify = function(token, counter = null) {
	if (counter === null) {
		if (this.counter === undefined || this.counter === null) {
			this.counter = 0;
		}
		counter = this.counter;
		if (token === this.gen(counter)) {
			this.counter += 1;
			return true;
		}
		return false;
	}
	return token === this.gen(counter);
}

HOTP.prototype._gen = function(secret, counter) {
	
	var data = CryptoJS.lib.WordArray.create([counter / 4294967296, counter & 0xffffffff]);
	var hash = CryptoJS.HmacSHA1(data, secret);
	
	var hash2 = [];
	for (var i = 0, j = 0; i < 5; i++) {
		var v = hash.words[i];
		hash2[j++] = ((v >> 24) & 0xFF);
		hash2[j++] = ((v >> 16) & 0xFF);
		hash2[j++] = ((v >>  8) & 0xFF);
		hash2[j++] = ((v >>  0) & 0xFF);
	}
	
	var offset = hash2[19] & 0xf;
	var num = (hash2[offset] & 0x7F) << 24 |
		(hash2[offset + 1] & 0xFF) << 16 |
		(hash2[offset + 2] & 0xFF) << 8  |
		(hash2[offset + 3] & 0xFF);

	
	num = num % 1000000;
	if (num >= 100000) {
		return String(num);
	}
	num = "000000" + num;
	return num.substring(num.length - 6);
}

HOTP.prototype._convertSecret = function(secret, format) {
	if (typeof(secret) === "string") {
		if ('hex' === format)
			return CryptoJS.enc.Hex.parse(secret);
		else if ('base64' === format)
			return CryptoJS.enc.Base64.parse(secret);
		else if ('string' === format)
			return CryptoJS.enc.Utf8.parse(secret);
		else
			throw Error('参数错误');
	} else if (secret instanceof CryptoJS.constructor) { // XXX WordArray
		return secret;
	} else {
		throw Error('参数错误');
	}
}

// ==================================================================================
var TOTP = function(secret = null, window = 3, interval = 30) {
	this.hotp = new HOTP(secret, 0);
	this.window = window;
	this.interval = interval;
}

TOTP.prototype.setSecret = function(secret, format = null) {
	this.hotp.setSecret(secret, format);
}

TOTP.prototype.gen = function(timestamp = null) {
	timestamp = timestamp === null ? new Date().getTime() : timestamp;
	var counter = Math.floor(timestamp / 1000 / this.interval);
	return this.hotp.gen(counter);
}

TOTP.prototype.gen2 = function(timestamp = null) {
	timestamp = timestamp === null ? new Date().getTime() : timestamp;
	var timestamp_second = Math.floor(timestamp / 1000);
	var counter = Math.floor(timestamp_second / this.interval);
	var token = this.hotp.gen(counter);
	var step = timestamp_second % this.interval;
	var refresh_time = tcounter * this.interval;
	return {
		token: token, // 生成的令牌
		loop_length: this.interval, // 循环角度，循环长度
		loop_step: step, // 循环角度，循环到的步骤
		refresh_interval: this.interval * 1000, // 刷新周期
		refresh_time: refresh_time * 1000, // 刷新时间
		timestamp: timestamp, // 当前时间
	};
}

TOTP.prototype.verify = function(token, timestamp = null) {
	timestamp = timestamp === null ? new Date().getTime() : timestamp;
	var counter = Math.floor(timestamp / 1000 / this.interval);
	for (var i = 0, w = 0; ; i++) {
		if (token === this.hotp.gen(counter - i))
			return true;
		if (++w >= this.window)
			break;
		if (i > 0) {
			if (token === this.hotp.gen(counter + i))
				return true;
			if (++w >= this.window)
				break;
		}
	}
	return false;
}

module.exports = {
  HOTP: HOTP,
  TOTP: TOTP,
}

/*
!function() {
	var p1 = new HOTP("123456", 0);
	console.log(p1.gen()); // 186818
	console.log(p1.gen(1234)); // 263197
	console.log(p1.verify("263197", 1234));

	var p2 = new TOTP("123456", 3, 30);
	console.log(p2.gen(1614054214456)); // 330925
	console.log(p2.verify("330925", 1614054214456));

	var p3 = new TOTP("helloworld", 3, 30);
	p3.setSecret("helloworld", "string");
	p3.setSecret("68656c6c6f776f726c64", "hex");
	p3.setSecret("aGVsbG93b3JsZA==", "base64");
	console.log(p3.gen(1614054214456)); // 759440
	console.log(p3.verify("759440", 1614054214456));
}();
*/