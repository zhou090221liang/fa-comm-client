import * as lib_proto_array from './proto/array';
import * as lib_proto_date from './proto/date';
import * as lib_proto_string from './proto/string';

export const Process = {
    /** 
     * 休眠
    */
    sleep: (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }
}