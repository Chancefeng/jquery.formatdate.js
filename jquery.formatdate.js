/*!
 * jquery.formatdate.js
 * @version 1.0
 * (c) 2015 giscafer
 */
;(function($){
	var defaults={

	};
	var _format="yyyy-MM-dd";
	$.extend({
		"formatDate":function(date,format,options){
			if(!format) format=_format;
			if(!date) date=new Date();
			var res=$.fn.formatDate(date,format,options);
			return res;
		}
	});
	/**
	 * @author giscafer
	 * @version 1.0
	 * @date    2015-11-20T11:27:32+0800
	 * @param   {Date}        date    the date to formatting.
	 * @param   {String}      format  'MMMM yyyy','dddd, MMM d, yyyy',"yyyy年MM月dd日","yyyy-MM-dd"
	 * 'dddd M/d','ddd M/d','ddd'……
	 * @param   {[type]}                 options [description]
	 */
	$.fn.formatDate=function(date, format, options) {
		return $.fn.formatDates(date, null, format, options);
	}
	/**
	 * @author giscafer
	 * @version 1.0
	 * @date    2015-11-20T11:27:07+0800
	 * @param   {Date}      date1   [description]
	 * @param   {Date}      date2   [description]
	 * @param   {String}    format  MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}
	 * @param   {String}  
	 */
	$.fn.formatDates=function(date1, date2, format, options) {
		options = options || defaults;
		var date = date1,
			otherDate = date2,
			i, len = format.length, c,
			i2, formatter,
			res = '';
		for (i=0; i<len; i++) {
			c = format.charAt(i);
			if (c == "'") {
				for (i2=i+1; i2<len; i2++) {
					if (format.charAt(i2) == "'") {
						if (date) {
							if (i2 == i+1) {
								res += "'";
							}else{
								res += format.substring(i+1, i2);
							}
							i = i2;
						}
						break;
					}
				}
			}
			else if (c == '(') {
				for (i2=i+1; i2<len; i2++) {
					if (format.charAt(i2) == ')') {
						var subres = formatDate(date, format.substring(i+1, i2), options);
						if (parseInt(subres.replace(/\D/, ''), 10)) {
							res += subres;
						}
						i = i2;
						break;
					}
				}
			}
			else if (c == '[') {
				for (i2=i+1; i2<len; i2++) {
					if (format.charAt(i2) == ']') {
						var subformat = format.substring(i+1, i2);
						var subres = formatDate(date, subformat, options);
						if (subres != formatDate(otherDate, subformat, options)) {
							res += subres;
						}
						i = i2;
						break;
					}
				}
			}
			else if (c == '{') {
				date = date2;
				otherDate = date1;
			}
			else if (c == '}') {
				date = date1;
				otherDate = date2;
			}
			else {
				for (i2=len; i2>i; i2--) {
					if (formatter = dateFormatters[format.substring(i, i2)]) {
						if (date) {
							res += formatter(date, options);
						}
						i = i2 - 1;
						break;
					}
				}
				if (i2 == i) {
					if (date) {
						res += c;
					}
				}
			}
		}
		return res;
	};


	var dateFormatters = {
		s	: function(d)	{ return d.getSeconds() },
		ss	: function(d)	{ return zeroPad(d.getSeconds()) },
		m	: function(d)	{ return d.getMinutes() },
		mm	: function(d)	{ return zeroPad(d.getMinutes()) },
		h	: function(d)	{ return d.getHours() % 12 || 12 },
		hh	: function(d)	{ return zeroPad(d.getHours() % 12 || 12) },
		H	: function(d)	{ return d.getHours() },
		HH	: function(d)	{ return zeroPad(d.getHours()) },
		d	: function(d)	{ return d.getDate() },
		dd	: function(d)	{ return zeroPad(d.getDate()) },
		ddd	: function(d,o)	{ return o.dayNamesShort[d.getDay()] },
		dddd: function(d,o)	{ return o.dayNames[d.getDay()] },
		M	: function(d)	{ return d.getMonth() + 1 },
		MM	: function(d)	{ return zeroPad(d.getMonth() + 1) },
		MMM	: function(d,o)	{ return o.monthNamesShort[d.getMonth()] },
		MMMM: function(d,o)	{ return o.monthNames[d.getMonth()] },
		yy	: function(d)	{ return (d.getFullYear()+'').substring(2) },
		yyyy: function(d)	{ return d.getFullYear() },
		t	: function(d)	{ return d.getHours() < 12 ? 'a' : 'p' },
		tt	: function(d)	{ return d.getHours() < 12 ? 'am' : 'pm' },
		T	: function(d)	{ return d.getHours() < 12 ? 'A' : 'P' },
		TT	: function(d)	{ return d.getHours() < 12 ? 'AM' : 'PM' },
		u	: function(d)	{ return formatDate(d, "yyyy-MM-dd'T'HH:mm:ss'Z'") },
		S	: function(d)	{
			var date = d.getDate();
			if (date > 10 && date < 20) {
				return 'th';
			}
			return ['st', 'nd', 'rd'][date%10-1] || 'th';
		},
		w   : function(d, o) { // local
			return o.weekNumberCalculation(d);
		},
		W   : function(d) { // ISO
			return iso8601Week(d);
		}
	};
	/**
	 * Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * `date` - the date to get the week for
	 * `number` - the number of the week within the year that contains this date
	 */
	function iso8601Week(date) {
		var time;
		var checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	}
	function zeroPad(n) {
		return (n < 10 ? '0' : '') + n;
	}
})(jQuery);