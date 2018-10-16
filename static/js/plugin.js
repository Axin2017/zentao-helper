import { EOVERFLOW } from "constants";

export default {
  install: function(Vue, option) {
    Vue.prototype.getDaysLeft = (
      deadline,
      containsToday = true,
      now = new Date()
    ) => {
      return (
        (new Date(
          deadline.getFullYear(),
          deadline.getMonth() + 1,
          deadline.getDate()
        ) -
          new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())) /
          1000 /
          60 /
          60 /
          24 +
        (containsToday ? 1 : 0)
      );
    };
    Vue.prototype.getOverTimeStr=(deadline,now=new Date())=>{
      if(deadline>=now){
        return "";
      }
      let timespan=now-deadline;
      let overTimeStr="";
      const day=Math.floor(timespan/(3600*1000*24));
      if(day){
        overTimeStr+=day+"天";
        timespan=timespan-day*3600*1000*24;
      }
      const hour=Math.floor(timespan/(3600*1000));
      if(hour){
        overTimeStr+=hour+"时";
        timespan=timespan-hour*3600*1000;
      }
      const minutes=Math.floor(timespan/(60*1000));
      if(minutes){
        overTimeStr+=minutes+"分";
      }
      return overTimeStr;
    };
    Date.prototype.formart = function(fmt) {
      if (!fmt) {
        return this;
      }
      var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, this.getFullYear() + '');
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, o[k]);
      return fmt;
  };
  }
};
