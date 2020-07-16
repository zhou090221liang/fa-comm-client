import * as lib_proto_array from './proto/array';
import * as lib_proto_date from './proto/date';
import * as lib_proto_string from './proto/string';
import { Verify } from './verify';

export const Convert = {
    /**
     * 转JSON对象
     * @param {*} obj
     */
    toJson: (obj) => {
        if (!obj) {
            return {};
        }
        if (Verify.isJsonOrJsonArray(obj)) {
            return obj;
        }
        let result = {};
        try {
            result = JSON.parse(obj);
        } catch (ex) {
            result = obj;
        }
        return result;
    },
    /**
     * 将JSON对象的key从驼峰转换成下划线命名
     * @param {*} json
     * @returns
     */
    toLineJsonKey: (json) => {
        if (!Verify.isJson(json)) {
            return json;
        }
        let tmp = {};
        for (let key in json) {
            if (!Verify.isJson(json[key])) {
                tmp[key.toLine()] = json[key];
            } else {
                tmp[key.toLine()] = toLineJsonKey(json[key]);
            }
        }
        return tmp;
    },
    /**
     * 将JSON对象的key从下划线转换成驼峰命名
     * @param {*} json
     * @returns
     */
    toHumpJsonKey: (json) => {
        if (!Verify.isJson(json)) {
            return json;
        }
        let tmp = {};
        for (let key in json) {
            if (!Verify.isJson(json[key])) {
                tmp[key.toHump()] = json[key];
            } else {
                tmp[key.toHump()] = toHumpJsonKey(json[key]);
            }
        }
        return tmp;
    },
    /**
     * 将秒数转换成00:00:00格式
     * @param {*} s
     * @returns
     */
    arrive_timer_format: function (s) {
        var t;
        if (s > -1) {
            let hour = Math.floor(s / 3600);
            let min = Math.floor(s / 60) % 60;
            let sec = s % 60;
            let day = parseInt(hour / 24);
            if (day > 0) {
                hour = hour - 24 * day;
                t = day + "day " + hour + ":";
            }
            else t = hour + ":";
            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec;
        }
        return t;
    },
    /**
     * Callback 接口变成 Promise 接口
     * var readFilePromise = promisify(fs.readFile, fs);
     * @param {*} fn
     * @param {*} receiver
     * @returns
     */
    promisify: (fn, receiver) => {
        return (...args) => {
            return new Promise((resolve, reject) => {
                fn.apply(receiver, [...args, (err, res) => {
                    return err ? reject(err) : resolve(res);
                }]);
            });
        };
    },
    /**
     * 合并JSON对象
     * @param {JSON} json
     */
    combineJson: (...json) => {
        if (json.length < 2) {
            return json[0];
        }
        let result = {};
        for (let i = 0; i < json.length; i++) {
            for (const key in json[i]) {
                if (result[key]) {
                    if (Verify.isJson(json[i][key])) {
                        result[key] = combineJson(result[key], json[i][key]);
                    } else {
                        result[key] = json[i][key];
                    }
                } else {
                    result[key] = json[i][key];
                }
            }
        }
        return result;
    },
    /**
     * 扩展toString
     * @param {*} obj
     * @returns
     */
    toString: (obj) => {
        if (obj == void 0 || Verify.isString(obj)) {
            return obj || '';
        }
        if (Verify.isJsonOrJsonArray(obj)) {
            let r;
            try {
                r = JSON.stringify(obj);
            } catch (e) {
                r = obj.toString();
            }
            return r;
        }
        else if (Verify.isError(obj)) {
            return JSON.stringify({
                code: obj.code || null,
                message: obj.message || null,
                stack: obj.stack || null
            });
        }
        else if (Verify.isArray(obj)) {
            // let arr = new Array();
            // for (var i in obj) {
            //     arr.push(toString(i));
            // }
            // return '[' + arr.join(',') + ']';
            return '[' + obj.join(',') + ']';
        }
        else if (Verify.isDate(obj))
            return obj.format('yyyy-MM-dd hh:mm:ss');
        else {
            return obj.toString();
        }
    },
    /** 
     * 将字节大小转换成直观的单位显示
    */
    sizeFormat: (bytes, minKB = true) => {
        if (isNaN(bytes)) {
            return '';
        }
        var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var exp = Math.floor(Math.log(bytes) / Math.log(2));
        if (exp < 1) {
            exp = 0;
        }
        var i = Math.floor(exp / 10);
        if (i < symbols.length) {
            bytes = bytes / Math.pow(2, 10 * i);
            if (bytes.toString().length > bytes.toFixed(2).toString().length) {
                bytes = bytes.toFixed(2);
            }
            if (bytes >= 1000) {
                bytes = parseFloat(bytes / 1024).toFixed(2);
                i += 1;
            }
            if (i == 0 && minKB) {
                i += 1;
                bytes = parseFloat(bytes / 1024).toFixed(2);
                bytes = bytes != '0.00' ? bytes : '0.01';
            }
            return bytes + symbols[i];
        } else {
            i = symbols.length - 1;
            bytes = bytes / Math.pow(2, 10 * i);
            if (bytes.toString().length > bytes.toFixed(2).toString().length) {
                bytes = bytes.toFixed(2);
            }
            return bytes + symbols[i];
        }
    }
}