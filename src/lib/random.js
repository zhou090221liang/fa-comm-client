import * as lib_proto_array from './proto/array';
import * as lib_proto_date from './proto/date';
import * as lib_proto_string from './proto/string';

export const Random = {
    /**
     * 生成随机字符串
     * @param {Number} len 生成的长度 不传则为默认8 只允许int类型
     * @param {String} chars chars 生成指定字符串允许出现的字符 不传则默认大小写字母与数字
     * @returns
     */
    getRandomStr: function (len, chars) {
        if (!len || typeof (len) != "number") {
            len = 8;
        }
        if (!chars || typeof (chars) != "string") {
            chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        }
        var str = "";
        for (var i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    },
    /**
     * 生成随机数
     * @param {*} Min 最小值
     * @param {*} Max 最大值
     * @returns
     */
    getRandomNum: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
}