import * as lib_proto_date from './proto/date';

export const DateComm = {
    /**
     * 获取指定日期的当月第一天
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getFirstDateOfMonth: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        return new Date(date.Format('yyyy/MM/01 00:00:00'));
    },

    /**
     * 获取指定日期的当月最后一天
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getLastDateOfMonth: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);

    },

    /**
     * 获取指定日期的当月最后一天
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getLastDateOfYear: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        return new Date(date.format('yyyy/12/31'));

    },

    /**
     * 获取指定日期的当年第一天
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getFirstDateOfYear: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        return new Date(date.Format('yyyy/01/01 00:00:00'));
    },

    /**
     * 获得当前时间
     * @returns
     */
    getCurrentDate: function () {
        return new Date();
    },

    /**
     * 获得指定日期的所在周的周起止时间
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getCurrentWeek: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        //起止日期数组  
        var startStop = new Array();
        //返回date是一周中的某一天  
        var week = date.getDay();
        //返回date是一个月中的某一天  
        var month = date.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);  
        //本周 周一  
        var monday = new Date(date.getTime() - (minusDay * millisecond));
        //本周 周日  
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间  
        startStop.push(new Date(monday.format('yyyy/MM/dd 00:00:00'))); //本周起始时间  
        //添加本周最后一天时间  
        startStop.push(new Date(sunday.format('yyyy/MM/dd 00:00:00'))); //本周终止时间  
        //返回  
        return startStop;
    },

    /**
     * 获得指定日期所在月份的月的起止时间
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getCurrentMonth: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        //起止日期数组  
        var startStop = new Array();
        //获得当前月份0-11  
        var currentMonth = date.getMonth();
        //获得当前年份4位年  
        var currentYear = date.getFullYear();
        //求出本月第一天  
        var firstDay = new Date(currentYear, currentMonth, 1);
        //当为12月的时候年份需要加1  
        //月份需要更新为0 也就是下一年的第一个月  
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为  
        } else {
            //否则只是月份增加,以便求的下一月的第一天  
            currentMonth++;
        }
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天  
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天  
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
        //添加至数组中返回  
        startStop.push(new Date(firstDay.format('yyyy/MM/dd 00:00:00')));
        startStop.push(new Date(lastDay.format('yyyy/MM/dd 00:00:00')));
        //返回  
        return startStop;
    },

    /**
     * 获取指定日期所在的季度的开始的月份
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getQuarterSeasonStartMonth: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        var spring = new Date(date.format('yyyy/01/01 00:00:00')); //春  
        var summer = new Date(date.format('yyyy/04/01 00:00:00')); //夏  
        var fall = new Date(date.format('yyyy/07/01 00:00:00'));  //秋  
        var winter = new Date(date.format('yyyy/10/01 00:00:00')); //冬  
        var month = date.getMonth();
        //月份从0-11  
        if (month < 3) {
            return spring;
        }
        if (month < 6) {
            return summer;
        }
        if (month < 9) {
            return fall;
        }
        return winter;
    },

    /**
     * 获取指定日期所在的季度的时间范围
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getQuarterSeason: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        var month = date.getMonth();
        //月份从0-11  
        if (month < 3) {
            //春
            return [
                new Date(date.format('yyyy-01-01 00:00:00')),
                new Date(date.format('yyyy-03-31 00:00:00')),
            ];
        }
        if (month < 6) {
            //夏  
            return [
                new Date(date.format('yyyy-04-01 00:00:00')),
                new Date(date.format('yyyy-06-30 00:00:00')),
            ];
        }
        if (month < 9) {
            //秋
            return [
                new Date(date.format('yyyy-07-01 00:00:00')),
                new Date(date.format('yyyy-09-30 00:00:00')),
            ];
        }
        return [
            new Date(date.format('yyyy-10-01 00:00:00')),
            new Date(date.format('yyyy-12-31 00:00:00')),
        ];
    },

    /**
     * 获取指定日期对应年月的月天数
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getMonthDays: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        //本月第一天 1-31  
        var relativeDate = new Date(date.format('yyyy-MM-01 00:00:00'));
        //获得当前月份0-11  
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年  
        var relativeYear = relativeDate.getFullYear();
        //当为12月的时候年份需要加1  
        //月份需要更新为0 也就是下一年的第一个月  
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            //否则只是月份增加,以便求的下一月的第一天  
            relativeMonth++;
        }
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天  
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数  
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    },

    /**
     * 返回指定日期上一个月的第一天
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getPriorMonthFirstDay: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        //年份为0代表,是本年的第一月,所以不能减  
        if (month == 0) {
            month = 11; //月份为上年的最后月份  
            year--; //年份减1  
            return new Date(year, month, 1);
        }
        //否则,只减去月份  
        month--;
        return new Date(year, month, 1);;
    },

    /**
     * 获得指定日期的上一月的起止日期
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getPreviousMonth: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        //起止日期数组  
        var startStop = new Array();
        //获得当前月份0-11  
        var currentMonth = date.getMonth();
        //获得当前年份4位年  
        var currentYear = date.getFullYear();
        //获得上一个月的第一天  
        var priorMonthFirstDay = getPriorMonthFirstDay(date);
        //获得上一月的最后一天  
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), getMonthDays(priorMonthFirstDay));
        //添加至数组  
        startStop.push(priorMonthFirstDay);
        startStop.push(priorMonthLastDay);
        //返回  
        return startStop;
    },

    /**
     * 获得指定日期上一周的起止日期
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getPreviousWeek: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        //起止日期数组  
        var startStop = new Array();
        //返回date是一周中的某一天  
        var week = date.getDay();
        //返回date是一个月中的某一天  
        var month = date.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //获得当前周的第一天  
        var currentWeekDayOne = new Date(date.getTime() - (millisecond * minusDay));
        //上周最后一天即本周开始的前一天  
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
        //上周的第一天  
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));
        //添加至数组  
        startStop.push(priorWeekFirstDay);
        startStop.push(priorWeekLastDay);
        return startStop;
    },

    /**
     * 得到指定日期上一年的起止日期
     * @param {*} date 日期，默认当前时间
     * @returns
     */
    getPreviousYear: function (date) {
        if (date && typeof date == 'string') {
            date = new Date(date);
        }
        date = date || new Date();
        //起止日期数组  
        var startStop = new Array();
        //获得当前年份4位年  
        var currentYear = date.getFullYear();
        currentYear--;
        var priorYearFirstDay = new Date(currentYear, 0, 1);
        var priorYearLastDay = new Date(currentYear, 11, 31);
        //添加至数组  
        startStop.push(priorYearFirstDay);
        startStop.push(priorYearLastDay);
        return startStop;
    }
}