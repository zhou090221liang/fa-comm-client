// import * as lib_proto_array from './array';
// import * as lib_proto_date from './date';
import { Verify } from '../verify';
import { Convert } from '../convert';
// import sha1 from 'crypto-js/sha1';
// import md5 from 'crypto-js/md5';
// import aes from 'crypto-js/aes';
import * as CryptoJS from 'crypto-js';

/**
 * 格式化字符串
 * 例:var str = "您的订单{0}已经提交成功，预计{1}送达";str = str.format("20150616001","06月20日");
 * @param {*} args 多个需要格式化的参数值
 * @returns
 */
String.prototype.format = String.prototype.Format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

/**
 * 原型函数 获取字符串字节长度
 * @returns
 */
String.prototype.getByteLength = function (version = 1) {
    return version === 1 ? this.replace(/[^\x00-\xff]/g, "**").length : Buffer.from(this).length;
}

/**
 * 原型函数 去除前后空格
 * @returns
 */
String.prototype.trim = String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 原型函数 去除前面的空格
 * @returns
 */
String.prototype.ltrim = String.prototype.Ltrim = String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
}

/**
 * 原型函数 去除后面的空格
 * @returns
 */
String.prototype.rtrim = String.prototype.Rtrim = String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, "");
}

/**
 * 原型函数 字符串结尾是否包含指定字符串
 * @param {*} str
 * @returns
 */
String.prototype.endWith = String.prototype.EndWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
}

/**
 * 原型函数 字符串开头是否包含指定字符串
 * @param {*} str
 * @returns
 */
String.prototype.startWith = String.prototype.StartWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
}

/**
 * 是否中国手机号码
 * @returns
 */
String.prototype.isChineseCellphone = function () {
    var reg = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/;
    if (reg.test(this)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否邮箱地址
 * @returns
 */
String.prototype.isEmailAddress = function () {
    let pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(this)) {
        return false;
    }
    return true;
}

/**
 * 是否QQ号码
 * @returns
 */
String.prototype.isQqNumber = function () {
    let pattern = /^[0-9]{5,10}$/;
    if (!pattern.test(this)) {
        return false;
    }
    return true;
}

/**
 * 是否MD5
 * @returns
 */
String.prototype.isMd5 = function () {
    let pattern1 = /^([a-fA-F0-9]{32})$/;
    let pattern2 = /^([a-fA-F0-9]{16})$/;
    if (!pattern1.test(this) && !pattern2.test(this)) {
        return false;
    }
    return true;
}

/**
 * 是否URL
 * @returns
 */
String.prototype.isUrl = function () {
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if (reg.test(this))
        return true;
    return false;
}

/**
 * 是否Guid
 * @returns
 */
String.prototype.isGuid = function () {
    let reg = /^[0-9a-f]{8}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{12}$/;
    if (reg.test(this))
        return true;
    reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (reg.test(this))
        return true;
    reg = /^\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}$/;
    if (reg.test(this))
        return true;
    return false;
};

/**
 * 是否中国居民身份证号
 * @param {number} [version=1] 
 * @returns
 */
String.prototype.isChineseCitizenIdCardNumber = function (version = 1) {
    return version === 1 ? Verify.isChineseCitizenIdCardNumber(this).errcode == 0 : Verify.isChineseCitizenIdCardNumber(this);
}

/**
 * 转Base64
 * @returns
 */
String.prototype.toBase64 = function () {
    return new Buffer(this).toString('base64');
};

/**
 * 解Base64
 * @returns
 */
String.prototype.fromBase64 = function () {
    return new Buffer(this, 'base64').toString();
};

/**
 * GBK转UTF8
 * @returns
 */
String.prototype.fromGbk = function () {
    return unescape(this.replace(/&#x/g, '%u').replace(/;/g, ''));
};

/**
 * 下划线转换驼峰
 * @returns
 */
String.prototype.toHump = function () {
    return this.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
};

/**
 * 驼峰转换下划线
 * @returns
 */
String.prototype.toLine = function () {
    return this.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * SHA1加密
 * @returns
 */
String.prototype.sha1 = String.prototype.toSha1 = function () {
    let msg = Convert.toString(this);
    return CryptoJS.SHA1(msg).toString();
}

/**
 * MD5加密
 * @param {String} str 要加密的数据
 */
String.prototype.md5 = String.prototype.toMd5 = function () {
    let msg = Convert.toString(this);
    return CryptoJS.MD5(msg).toString();
}

// /**
//  * AES加密
//  * @param {String} password 8位小写英文字母密钥
//  */
// String.prototype.aes = String.prototype.toAes = function (password = "aespasswd") {
//     let msg = Convert.toString(this);
//     return CryptoJS.AES.encrypt(msg, password).toString();
// }

// /**
//  * AES解密
//  * @param {String} password 8位小写英文字母密钥
//  */
// String.prototype.fromAes = function (password = "aespasswd") {
//     return CryptoJS.AES.decrypt(this, password).toString();
// }