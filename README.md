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
```
#### `formatDates`

```js
$.formatDates(new Date(),new Date("2015/11/27"),"MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}");
"十一月 20 &#8212; 十一月 27 2015"

```