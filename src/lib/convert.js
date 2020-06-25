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
                code: arg.code || null,
                message: arg.message || null,
                stack: arg.stack || null
            });
        }
        else if (Verify.isArray(obj)) {
            let arr = new Array();
            for (var i in obj) {
                arr.push(toString(i));
            }
            return '[' + arr.join(',') + ']';
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
    sizeFormat: (fileByte) => {
        var fileSizeByte = fileByte;
        var fileSizeMsg = "";
        if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
        else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
        else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) +
            "MB";
        else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
        else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024))
            .toFixed(2) + "GB";
        else fileSizeMsg = ">1TB";
        return fileSizeMsg;
    }
}