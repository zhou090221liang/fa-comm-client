import * as lib_proto_array from './proto/array';
import * as lib_proto_date from './proto/date';
import * as lib_proto_string from './proto/string';

export const Url = {
    /**
     * 获取地址栏的参数值
     * @param {String} name 参数名称
     * @param {String} search &连接的参数键值
     * @returns
     */
    getParams: (name, search) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = (search || window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    /**
     * 转换地址栏参数
     * @param {String} url
     * @returns
     */
    convert: (url) => {
        url = (url || window.location.href).split('?');
        url = url[url.length - 1];
        url = url.split('&');
        var params = {};
        for (var i = 0; i < url.length; i++) {
            var tmp = url[i].split('=');
            params[tmp[0]] = tmp[1];
        }
        return params;
    }
}