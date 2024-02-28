function formateDate(dateStr){
	var date = new Date(Date.parse(dateStr));
	let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

function formateDateToMinute(dateStr){
    var date = new Date(Date.parse(dateStr));
    let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = '00';
    return Y + M + D + h + m + s;
}

function formateBeginDate(dateStr){
	var date = new Date(Date.parse(dateStr));
	let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    return Y + M + D + "00:00:00";
}

function formateEndDate(dateStr){
	var date = new Date(Date.parse(dateStr));
	let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + "23:59:59";
}

function dateToFormatString(dateStr){
    return dateStr.replace("T", " ").replace(".000+0000", "")
}

function getCurMonth(){
  var now = new Date()
  return now.getMonth() + 1;
}

function nowDate() {
    var a = new Date().getTime(); //获取到当前时间戳
    var now = new Date(a); //创建一个指定的日期对象
    var year = now.getFullYear(); //年份
    var month = now.getMonth() + 1; //月份（0-11）
    if (month < 10) {
        month = "0" + month
    }
    var date = now.getDate(); //天数（1到31）
    if (date < 10) {
        date = "0" + date
    }
    var hour = now.getHours(); //小时数（0到23）
    var minute = now.getMinutes(); //分钟数（0到59）
    var second = now.getSeconds(); //秒数（0到59） 
    return (
        year + "-" + month + "-" + date
    )
};

export {
  formateDate,
  formateBeginDate,
  formateEndDate,
  formateDateToMinute,
  dateToFormatString,
  getCurMonth,
  nowDate
}
