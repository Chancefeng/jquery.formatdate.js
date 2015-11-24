# jquery.formatdate.js

#### The date to formatting

#### `formatDate`

```js
$.formatDate(new Date());
// => 2015-11-20

$.formatDate(new Date(),"yyyy年MM月dd日");
// =>  2015年11月20日

$.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss");
// => 2015-11-20 14:41:17

$.formatDate(new Date(),"yyyy/MM/dd HH:mm:ss");
// => 2015/11/20 14:41:17

$.formatDate(new Date(),'yyyy-MM-dd h:m:s tt')
// => 2015-11-24 5:58:20 pm

$.formatDate(new Date(),'u')
// => 2015-11-24T17:59:28Z


$.formatDate(new Date(),'ddd')
// => 周二
$.formatDate(new Date(),'dddd')
// => 星期二
$.formatDate(new Date(),'dd')
// => 24
$.formatDate(new Date(),'d')
// => 24


$.formatDate(new Date(),'M')
// => "11"
$.formatDate(new Date(),'MM')
// => "11"
$.formatDate(new Date(),'MMM')
// => "十一月"
$.formatDate(new Date(),'MMMM')
// => "十一月"

```
#### `formatDates`

```js
$.formatDates(new Date(),new Date("2015/11/27"),"MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}");
// => "十一月 20 &#8212; 十一月 27 2015"

```