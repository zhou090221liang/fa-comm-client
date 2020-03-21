import * as lib_proto_array from './lib/proto/array';
import * as lib_proto_date from './lib/proto/date';
import * as lib_proto_string from './lib/proto/string';
import { Verify } from './lib/verify';
import { Convert } from './lib/convert';
import { Random } from './lib/random';

window.Comm = { Verify, Convert, Random };
export const Comm = window.Comm;