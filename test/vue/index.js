import { Comm } from 'fa-comm-client';

var arr = [];
arr.insert("a");
arr.insert("b");
arr.insert("c", 1);
console.log("在数组的指定位置插入元素", arr);

var current = new Date();
console.log("yyyy-MM-dd hh:mm:ss", current.format());

var str = "您的订单{0}已经提交成功，预计{1}送达";
console.log("格式化字符串", str, str.format("20150616001", "06月20日"));

var json = '{"a":"a"}';
json = Comm.Convert.toJson(json);
console.log("转JSON对象", typeof json, json);

var date = new Date('2020-04-23');
var calendar = Comm.Calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
console.log(date.format('yyyy-MM-dd那天：'), calendar);
date = new Date('2020-05-23');
calendar = Comm.Calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
console.log(date.format('yyyy-MM-dd那天：'), calendar);