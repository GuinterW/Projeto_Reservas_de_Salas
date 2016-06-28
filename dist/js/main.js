function dateToday(){var t='<i class="fa fa-calendar" aria-hidden="true"></i> '+[day,month,year].join("/");$("#dateToday").html(t)}function start(){buildSelectYear(),$(".pages").hide(),$("#forToday").show(),$("#modalLogIn").modal("show")}function buildSelectYear(){for(var t="",e=2007;year+2>e;e++)t+=e==year?"<option value="+e+" selected=true>"+e+"</option>":"<option value="+e+">"+e+"</option>";$("#year").html(t)}function buildSelectDay(t){$("#day").show();var e='<option value="00">Todos</option>';switch(t){case"01":case"03":case"05":case"07":case"08":case"10":case"12":for(var a=1;32>a;a++)e+=10>a?'<option value="0'+a+'">'+a+"</option>":'<option value="'+a+'">'+a+"</option>";$("#day").html(e);break;case"04":case"06":case"09":case"11":for(var a=1;31>a;a++)e+=10>a?'<option value="0'+a+'">'+a+"</option>":'<option value="'+a+'">'+a+"</option>";$("#day").html(e);break;case"02":if(resto=$("#year").val()%4,0==resto)for(var a=1;30>a;a++)e+=10>a?'<option value="0'+a+'">'+a+"</option>":'<option value="'+a+'">'+a+"</option>";else for(var a=1;29>a;a++)e+=10>a?'<option value="0'+a+'">'+a+"</option>":'<option value="'+a+'">'+a+"</option>";$("#day").html(e)}}function cleanTable(){$("#table").html(""),$(".newLine").html("")}function checkRoom(t){checkTab("room1"==t?1:"room2"==t?2:3)}function checkTab(t){var e=$("li[class='active mainLinks'] a").attr("href");"#forToday"==e?($("#day").hide(),buildTable(t,"/"+year+"/"+month+"/"+day,table.forToday)):"#listMeetings"==e?"00"==$("#month").val()?($("#day").hide(),buildTable(t,"/"+$("#year").val(),table.complete)):"00"==$("#day").val()?buildTable(t,"/"+$("#year").val()+"/"+$("#month").val(),table.complete):buildTable(t,"/"+$("#year").val()+"/"+$("#month").val()+"/"+$("#day").val(),table.complete):insert()}function buildTable(t,e,a){cleanTable();var i=month.toString();1==i.length&&(month="0"+i),dateToday();var s=a,n=ajax(server+t+e+"?User="+userEmail,"GET");$("#pagesAndTable").show(),$("#table").html(s),$(".newLine").append(n)}function ajax(t,e){var a="";return $.ajax({type:e,url:t,async:!1,success:function(t){a+=t}}),a}function ajaxPOST(t){var e="";return $.ajax({type:"POST",url:t,async:!1,success:function(t){e+=t}}),e}function insert(){$("#pagesAndTable").hide(),cleanTable()}function onSignIn(t){var e=t.getBasicProfile();userName=e.getName(),userImage=e.getImageUrl(),userEmail=e.getEmail(),$("#user").html(userName+' <img id="userImage" src="'+userImage+'" />'),$("#modalLogIn").modal("hide"),buildTable(1,"/"+year+"/"+month+"/"+day,table.forToday)}function signOut(){var t=gapi.auth2.getAuthInstance();t.signOut().then(function(){$("#logIn").html('<div class="g-signin2" data-onsuccess="onSignIn"></div>'),$("#user").html("")}),$("#modalLogIn").modal("hide")}var server="http://localhost:9000/search/",date=new Date,day=date.getDate(),month=date.getMonth()+1,year=date.getFullYear(),userName="",userImage="",userEmail="",table={forToday:'<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',complete:'<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'};$(document).ready(function(){start(),$(".links").click(function(){$("li[class='active activeRoom']").removeClass("active activeRoom"),$("li a[id='room1']").parent().addClass("active activeRoom");var t=$(this).attr("href");$("li[class='active mainLinks']").removeClass("active mainLinks"),$("li a[href='"+t+"']").parent().addClass("active mainLinks"),$(".pages").hide(),$(t).show(),checkTab(1)}),$(".room").click(function(){var t=$(this).attr("id");$("li[class='active activeRoom']").removeClass("active activeRoom"),$("li a[id='"+t+"']").parent().addClass("active activeRoom"),checkRoom(t)}),$("#repeat").click(function(){$("#modalRepeat").modal(),$("#startRepeat").html($("#calendar").val())}),$("#calendar").datepicker({format:"dd/mm/yyyy",language:"pt-br",autoclose:!0}),$("#year").change(function(){buildTable(1,"/"+$("#year").val()),$("#month").val("00"),$("#day").hide(),$("li[class='active activeRoom']").removeClass("active activeRoom"),$("li a[id='room1']").parent().addClass("active activeRoom")}),$("#month").change(function(){"00"==$("#month").val()?(buildTable(1,"/"+$("#year").val(),table.complete),$("#day").hide()):(buildTable(1,"/"+$("#year").val()+"/"+$("#month").val(),table.complete),buildSelectDay($("#month").val())),$("li[class='active activeRoom']").removeClass("active activeRoom"),$("li a[id='room1']").parent().addClass("active activeRoom")}),$("#day").change(function(){"00"==$("#day").val()?buildTable(1,"/"+$("#year").val()+"/"+$("#month").val(),table.complete):buildTable(1,"/"+$("#year").val()+"/"+$("#month").val()+"/"+$("#day").val(),table.complete)}),$("#user").on("click","#userImage",function(){$("#modalLogIn").modal("show")}),$("#repeatFrequency").change(function(){$("#nFrequency").html($("#repeatFrequency").val())}),$("#endRepeat").change(function(){$("#nRepeats").html($("#endRepeat").val())}),$("#buttomInsert").click(function(){var t=$("#calendar").val(),e=$("#insertRoom").val();url="http://localhost:9000/insert?Room="+e.substring(5,6)+"&Start="+$("#startMeeting").val()+"&End="+$("#endMeeting").val()+"&Date="+t.substring(6,10)+t.substring(3,5)+t.substring(0,2)+"&Resp="+userName+"&Schedule="+$("#insertSchedule").val()+"&User="+userEmail,ajax(url,"POST")})}),function(t){function e(){return new Date(Date.UTC.apply(Date,arguments))}function a(e,a){var i,s=t(e).data(),n={},o=new RegExp("^"+a.toLowerCase()+"([A-Z])"),a=new RegExp("^"+a.toLowerCase());for(var r in s)a.test(r)&&(i=r.replace(o,function(t,e){return e.toLowerCase()}),n[i]=s[r]);return n}function i(e){var a={};if(d[e]||(e=e.split("-")[0],d[e])){var i=d[e];return t.each(l,function(t,e){e in i&&(a[e]=i[e])}),a}}var s=t(window),n=function(e,a){this._process_options(a),this.element=t(e),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on, .btn"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this.picker=t(c.template),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&(this.picker.addClass("datepicker-rtl"),this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("tfoot th.today").attr("colspan",function(t,e){return parseInt(e)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};n.prototype={constructor:n,_process_options:function(e){this._o=t.extend({},this._o,e);var a=this.o=t.extend({},this._o),i=a.language;switch(d[i]||(i=i.split("-")[0],d[i]||(i=h.language)),a.language=i,a.startView){case 2:case"decade":a.startView=2;break;case 1:case"year":a.startView=1;break;default:a.startView=0}switch(a.minViewMode){case 1:case"months":a.minViewMode=1;break;case 2:case"years":a.minViewMode=2;break;default:a.minViewMode=0}a.startView=Math.max(a.startView,a.minViewMode),a.weekStart%=7,a.weekEnd=(a.weekStart+6)%7;var s=c.parseFormat(a.format);a.startDate!==-(1/0)&&(a.startDate?a.startDate instanceof Date?a.startDate=this._local_to_utc(this._zero_time(a.startDate)):a.startDate=c.parseDate(a.startDate,s,a.language):a.startDate=-(1/0)),a.endDate!==1/0&&(a.endDate?a.endDate instanceof Date?a.endDate=this._local_to_utc(this._zero_time(a.endDate)):a.endDate=c.parseDate(a.endDate,s,a.language):a.endDate=1/0),a.daysOfWeekDisabled=a.daysOfWeekDisabled||[],t.isArray(a.daysOfWeekDisabled)||(a.daysOfWeekDisabled=a.daysOfWeekDisabled.split(/[,\s]*/)),a.daysOfWeekDisabled=t.map(a.daysOfWeekDisabled,function(t){return parseInt(t,10)});var n=String(a.orientation).toLowerCase().split(/\s+/g),o=a.orientation.toLowerCase();if(n=t.grep(n,function(t){return/^auto|left|right|top|bottom$/.test(t)}),a.orientation={x:"auto",y:"auto"},o&&"auto"!==o)if(1===n.length)switch(n[0]){case"top":case"bottom":a.orientation.y=n[0];break;case"left":case"right":a.orientation.x=n[0]}else o=t.grep(n,function(t){return/^left|right$/.test(t)}),a.orientation.x=o[0]||"auto",o=t.grep(n,function(t){return/^top|bottom$/.test(t)}),a.orientation.y=o[0]||"auto";else;},_events:[],_secondaryEvents:[],_applyEvents:function(t){for(var e,a,i=0;i<t.length;i++)e=t[i][0],a=t[i][1],e.on(a)},_unapplyEvents:function(t){for(var e,a,i=0;i<t.length;i++)e=t[i][0],a=t[i][1],e.off(a)},_buildEvents:function(){this.isInput?this._events=[[this.element,{focus:t.proxy(this.show,this),keyup:t.proxy(this.update,this),keydown:t.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:t.proxy(this.show,this),keyup:t.proxy(this.update,this),keydown:t.proxy(this.keydown,this)}],[this.component,{click:t.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:t.proxy(this.show,this)}]],this._secondaryEvents=[[this.picker,{click:t.proxy(this.click,this)}],[t(window),{resize:t.proxy(this.place,this)}],[t(document),{mousedown:t.proxy(function(t){this.element.is(t.target)||this.element.find(t.target).length||this.picker.is(t.target)||this.picker.find(t.target).length||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(e,a){var i=a||this.date,s=this._utc_to_local(i);this.element.trigger({type:e,date:s,format:t.proxy(function(t){var e=t||this.o.format;return c.formatDate(i,e,this.o.language)},this)})},show:function(t){this.isInline||this.picker.appendTo("body"),this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.place(),this._attachSecondaryEvents(),t&&t.preventDefault(),this._trigger("show")},hide:function(t){this.isInline||this.picker.is(":visible")&&(this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide"))},remove:function(){this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date},_utc_to_local:function(t){return new Date(t.getTime()+6e4*t.getTimezoneOffset())},_local_to_utc:function(t){return new Date(t.getTime()-6e4*t.getTimezoneOffset())},_zero_time:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())},_zero_utc_time:function(t){return new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()))},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){return this.date},setDate:function(t){this.setUTCDate(this._local_to_utc(t))},setUTCDate:function(t){this.date=t,this.setValue()},setValue:function(){var t=this.getFormattedDate();this.isInput?this.element.val(t).change():this.component&&this.element.find("input").val(t).change()},getFormattedDate:function(t){return void 0===t&&(t=this.o.format),c.formatDate(this.date,t,this.o.language)},setStartDate:function(t){this._process_options({startDate:t}),this.update(),this.updateNavArrows()},setEndDate:function(t){this._process_options({endDate:t}),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(t){this._process_options({daysOfWeekDisabled:t}),this.update(),this.updateNavArrows()},place:function(){if(!this.isInline){var e=this.picker.outerWidth(),a=this.picker.outerHeight(),i=10,n=s.width(),o=s.height(),r=s.scrollTop(),h=parseInt(this.element.parents().filter(function(){return"auto"!=t(this).css("z-index")}).first().css("z-index"))+10,l=this.component?this.component.parent().offset():this.element.offset(),d=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),c=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),u=l.left,p=l.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(u-=e-c)):(this.picker.addClass("datepicker-orient-left"),l.left<0?u-=l.left-i:l.left+e>n&&(u=n-e-i));var v,f,g=this.o.orientation.y;"auto"===g&&(v=-r+l.top-a,f=r+o-(l.top+d+a),g=Math.max(v,f)===f?"top":"bottom"),this.picker.addClass("datepicker-orient-"+g),"top"===g?p+=d:p-=a+parseInt(this.picker.css("padding-top")),this.picker.css({top:p,left:u,zIndex:h})}},_allow_update:!0,update:function(){if(this._allow_update){var t,e=new Date(this.date),a=!1;arguments&&arguments.length&&("string"==typeof arguments[0]||arguments[0]instanceof Date)?(t=arguments[0],t instanceof Date&&(t=this._local_to_utc(t)),a=!0):(t=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),delete this.element.data().date),this.date=c.parseDate(t,this.o.format,this.o.language),a?this.setValue():t?e.getTime()!==this.date.getTime()&&this._trigger("changeDate"):this._trigger("clearDate"),this.date<this.o.startDate?(this.viewDate=new Date(this.o.startDate),this.date=new Date(this.o.startDate)):this.date>this.o.endDate?(this.viewDate=new Date(this.o.endDate),this.date=new Date(this.o.endDate)):(this.viewDate=new Date(this.date),this.date=new Date(this.date)),this.fill()}},fillDow:function(){var t=this.o.weekStart,e="<tr>";if(this.o.calendarWeeks){var a='<th class="cw">&nbsp;</th>';e+=a,this.picker.find(".datepicker-days thead tr:first-child").prepend(a)}for(;t<this.o.weekStart+7;)e+='<th class="dow">'+d[this.o.language].daysMin[t++%7]+"</th>";e+="</tr>",this.picker.find(".datepicker-days thead").append(e)},fillMonths:function(){for(var t="",e=0;12>e;)t+='<span class="month">'+d[this.o.language].monthsShort[e++]+"</span>";this.picker.find(".datepicker-months td").html(t)},setRange:function(e){e&&e.length?this.range=t.map(e,function(t){return t.valueOf()}):delete this.range,this.fill()},getClassNames:function(e){var a=[],i=this.viewDate.getUTCFullYear(),s=this.viewDate.getUTCMonth(),n=this.date.valueOf(),o=new Date;return e.getUTCFullYear()<i||e.getUTCFullYear()==i&&e.getUTCMonth()<s?a.push("old"):(e.getUTCFullYear()>i||e.getUTCFullYear()==i&&e.getUTCMonth()>s)&&a.push("new"),this.o.todayHighlight&&e.getUTCFullYear()==o.getFullYear()&&e.getUTCMonth()==o.getMonth()&&e.getUTCDate()==o.getDate()&&a.push("today"),n&&e.valueOf()==n&&a.push("active"),(e.valueOf()<this.o.startDate||e.valueOf()>this.o.endDate||-1!==t.inArray(e.getUTCDay(),this.o.daysOfWeekDisabled))&&a.push("disabled"),this.range&&(e>this.range[0]&&e<this.range[this.range.length-1]&&a.push("range"),-1!=t.inArray(e.valueOf(),this.range)&&a.push("selected")),a},fill:function(){var a,i=new Date(this.viewDate),s=i.getUTCFullYear(),n=i.getUTCMonth(),o=this.o.startDate!==-(1/0)?this.o.startDate.getUTCFullYear():-(1/0),r=this.o.startDate!==-(1/0)?this.o.startDate.getUTCMonth():-(1/0),h=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0;this.date&&this.date.valueOf();this.picker.find(".datepicker-days thead th.datepicker-switch").text(d[this.o.language].months[n]+" "+s),this.picker.find("tfoot th.today").text(d[this.o.language].today).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot th.clear").text(d[this.o.language].clear).toggle(this.o.clearBtn!==!1),this.updateNavArrows(),this.fillMonths();var u=e(s,n-1,28,0,0,0,0),p=c.getDaysInMonth(u.getUTCFullYear(),u.getUTCMonth());u.setUTCDate(p),u.setUTCDate(p-(u.getUTCDay()-this.o.weekStart+7)%7);var v=new Date(u);v.setUTCDate(v.getUTCDate()+42),v=v.valueOf();for(var f,g=[];u.valueOf()<v;){if(u.getUTCDay()==this.o.weekStart&&(g.push("<tr>"),this.o.calendarWeeks)){var m=new Date(+u+(this.o.weekStart-u.getUTCDay()-7)%7*864e5),y=new Date(+m+(11-m.getUTCDay())%7*864e5),D=new Date(+(D=e(y.getUTCFullYear(),0,1))+(11-D.getUTCDay())%7*864e5),w=(y-D)/864e5/7+1;g.push('<td class="cw">'+w+"</td>")}if(f=this.getClassNames(u),f.push("day"),this.o.beforeShowDay!==t.noop){var k=this.o.beforeShowDay(this._utc_to_local(u));void 0===k?k={}:"boolean"==typeof k?k={enabled:k}:"string"==typeof k&&(k={classes:k}),k.enabled===!1&&f.push("disabled"),k.classes&&(f=f.concat(k.classes.split(/\s+/))),k.tooltip&&(a=k.tooltip)}f=t.unique(f),g.push('<td class="'+f.join(" ")+'"'+(a?' title="'+a+'"':"")+">"+u.getUTCDate()+"</td>"),u.getUTCDay()==this.o.weekEnd&&g.push("</tr>"),u.setUTCDate(u.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(g.join(""));var b=this.date&&this.date.getUTCFullYear(),T=this.picker.find(".datepicker-months").find("th:eq(1)").text(s).end().find("span").removeClass("active");b&&b==s&&T.eq(this.date.getUTCMonth()).addClass("active"),(o>s||s>h)&&T.addClass("disabled"),s==o&&T.slice(0,r).addClass("disabled"),s==h&&T.slice(l+1).addClass("disabled"),g="",s=10*parseInt(s/10,10);var C=this.picker.find(".datepicker-years").find("th:eq(1)").text(s+"-"+(s+9)).end().find("td");s-=1;for(var _=-1;11>_;_++)g+='<span class="year'+(-1==_?" old":10==_?" new":"")+(b==s?" active":"")+(o>s||s>h?" disabled":"")+'">'+s+"</span>",s+=1;C.html(g)},updateNavArrows:function(){if(this._allow_update){var t=new Date(this.viewDate),e=t.getUTCFullYear(),a=t.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-(1/0)&&e<=this.o.startDate.getUTCFullYear()&&a<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&e>=this.o.endDate.getUTCFullYear()&&a>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.o.startDate!==-(1/0)&&e<=this.o.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&e>=this.o.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}}},click:function(a){a.preventDefault();var i=t(a.target).closest("span, td, th");if(1==i.length)switch(i[0].nodeName.toLowerCase()){case"th":switch(i[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var s=c.modes[this.viewMode].navStep*("prev"==i[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,s),this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,s),1===this.viewMode&&this._trigger("changeYear",this.viewDate)}this.fill();break;case"today":var n=new Date;n=e(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0),this.showMode(-2);var o="linked"==this.o.todayBtn?null:"view";this._setDate(n,o);break;case"clear":var r;this.isInput?r=this.element:this.component&&(r=this.element.find("input")),r&&r.val("").change(),this._trigger("changeDate"),this.update(),this.o.autoclose&&this.hide()}break;case"span":if(!i.is(".disabled")){if(this.viewDate.setUTCDate(1),i.is(".month")){var h=1,l=i.parent().find("span").index(i),d=this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(l),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode&&this._setDate(e(d,l,h,0,0,0,0))}else{var d=parseInt(i.text(),10)||0,h=1,l=0;this.viewDate.setUTCFullYear(d),this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(e(d,l,h,0,0,0,0))}this.showMode(-1),this.fill()}break;case"td":if(i.is(".day")&&!i.is(".disabled")){var h=parseInt(i.text(),10)||1,d=this.viewDate.getUTCFullYear(),l=this.viewDate.getUTCMonth();i.is(".old")?0===l?(l=11,d-=1):l-=1:i.is(".new")&&(11==l?(l=0,d+=1):l+=1),this._setDate(e(d,l,h,0,0,0,0))}}},_setDate:function(t,e){e&&"date"!=e||(this.date=new Date(t)),e&&"view"!=e||(this.viewDate=new Date(t)),this.fill(),this.setValue(),this._trigger("changeDate");var a;this.isInput?a=this.element:this.component&&(a=this.element.find("input")),a&&a.change(),!this.o.autoclose||e&&"date"!=e||this.hide()},moveMonth:function(t,e){if(!e)return t;var a,i,s=new Date(t.valueOf()),n=s.getUTCDate(),o=s.getUTCMonth(),r=Math.abs(e);if(e=e>0?1:-1,1==r)i=-1==e?function(){return s.getUTCMonth()==o}:function(){return s.getUTCMonth()!=a},a=o+e,s.setUTCMonth(a),(0>a||a>11)&&(a=(a+12)%12);else{for(var h=0;r>h;h++)s=this.moveMonth(s,e);a=s.getUTCMonth(),s.setUTCDate(n),i=function(){return a!=s.getUTCMonth()}}for(;i();)s.setUTCDate(--n),s.setUTCMonth(a);return s},moveYear:function(t,e){return this.moveMonth(t,12*e)},dateWithinRange:function(t){return t>=this.o.startDate&&t<=this.o.endDate},keydown:function(t){if(this.picker.is(":not(:visible)"))return void(27==t.keyCode&&this.show());var e,a,i,s=!1;switch(t.keyCode){case 27:this.hide(),t.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;e=37==t.keyCode?-1:1,t.ctrlKey?(a=this.moveYear(this.date,e),i=this.moveYear(this.viewDate,e),this._trigger("changeYear",this.viewDate)):t.shiftKey?(a=this.moveMonth(this.date,e),i=this.moveMonth(this.viewDate,e),this._trigger("changeMonth",this.viewDate)):(a=new Date(this.date),a.setUTCDate(this.date.getUTCDate()+e),i=new Date(this.viewDate),i.setUTCDate(this.viewDate.getUTCDate()+e)),this.dateWithinRange(a)&&(this.date=a,this.viewDate=i,this.setValue(),this.update(),t.preventDefault(),s=!0);break;case 38:case 40:if(!this.o.keyboardNavigation)break;e=38==t.keyCode?-1:1,t.ctrlKey?(a=this.moveYear(this.date,e),i=this.moveYear(this.viewDate,e),this._trigger("changeYear",this.viewDate)):t.shiftKey?(a=this.moveMonth(this.date,e),i=this.moveMonth(this.viewDate,e),this._trigger("changeMonth",this.viewDate)):(a=new Date(this.date),a.setUTCDate(this.date.getUTCDate()+7*e),i=new Date(this.viewDate),i.setUTCDate(this.viewDate.getUTCDate()+7*e)),this.dateWithinRange(a)&&(this.date=a,this.viewDate=i,this.setValue(),this.update(),t.preventDefault(),s=!0);break;case 13:this.hide(),t.preventDefault();break;case 9:this.hide()}if(s){this._trigger("changeDate");var n;this.isInput?n=this.element:this.component&&(n=this.element.find("input")),n&&n.change()}},showMode:function(t){t&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+t))),this.picker.find(">div").hide().filter(".datepicker-"+c.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}};var o=function(e,a){this.element=t(e),this.inputs=t.map(a.inputs,function(t){return t.jquery?t[0]:t}),delete a.inputs,t(this.inputs).datepicker(a).bind("changeDate",t.proxy(this.dateUpdated,this)),this.pickers=t.map(this.inputs,function(e){return t(e).data("datepicker")}),this.updateDates()};o.prototype={updateDates:function(){this.dates=t.map(this.pickers,function(t){return t.date}),this.updateRanges()},updateRanges:function(){var e=t.map(this.dates,function(t){return t.valueOf()});t.each(this.pickers,function(t,a){a.setRange(e)})},dateUpdated:function(e){var a=t(e.target).data("datepicker"),i=a.getUTCDate(),s=t.inArray(e.target,this.inputs),n=this.inputs.length;if(-1!=s){if(i<this.dates[s])for(;s>=0&&i<this.dates[s];)this.pickers[s--].setUTCDate(i);else if(i>this.dates[s])for(;n>s&&i>this.dates[s];)this.pickers[s++].setUTCDate(i);this.updateDates()}},remove:function(){t.map(this.pickers,function(t){t.remove()}),delete this.element.data().datepicker}};var r=t.fn.datepicker;t.fn.datepicker=function(e){var s=Array.apply(null,arguments);s.shift();var r;return this.each(function(){var l=t(this),d=l.data("datepicker"),c="object"==typeof e&&e;if(!d){var u=a(this,"date"),p=t.extend({},h,u,c),v=i(p.language),f=t.extend({},h,v,u,c);if(l.is(".input-daterange")||f.inputs){var g={inputs:f.inputs||l.find("input").toArray()};l.data("datepicker",d=new o(this,t.extend(f,g)))}else l.data("datepicker",d=new n(this,f))}return"string"==typeof e&&"function"==typeof d[e]&&(r=d[e].apply(d,s),void 0!==r)?!1:void 0}),void 0!==r?r:this};var h=t.fn.datepicker.defaults={autoclose:!1,beforeShowDay:t.noop,calendarWeeks:!1,clearBtn:!1,daysOfWeekDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,orientation:"auto",rtl:!1,startDate:-(1/0),startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0},l=t.fn.datepicker.locale_opts=["format","rtl","weekStart"];t.fn.datepicker.Constructor=n;var d=t.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}},c={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(t){return t%4===0&&t%100!==0||t%400===0},getDaysInMonth:function(t,e){return[31,c.isLeapYear(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(t){var e=t.replace(this.validParts,"\x00").split("\x00"),a=t.match(this.validParts);if(!e||!e.length||!a||0===a.length)throw new Error("Invalid date format.");return{separators:e,parts:a}},parseDate:function(a,i,s){if(a instanceof Date)return a;if("string"==typeof i&&(i=c.parseFormat(i)),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(a)){var o,r,h=/([\-+]\d+)([dmwy])/,l=a.match(/([\-+]\d+)([dmwy])/g);a=new Date;for(var u=0;u<l.length;u++)switch(o=h.exec(l[u]),r=parseInt(o[1]),o[2]){case"d":a.setUTCDate(a.getUTCDate()+r);break;case"m":a=n.prototype.moveMonth.call(n.prototype,a,r);break;case"w":a.setUTCDate(a.getUTCDate()+7*r);break;case"y":a=n.prototype.moveYear.call(n.prototype,a,r)}return e(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),0,0,0)}var p,v,o,l=a&&a.match(this.nonpunctuation)||[],a=new Date,f={},g=["yyyy","yy","M","MM","m","mm","d","dd"],m={yyyy:function(t,e){return t.setUTCFullYear(e)},yy:function(t,e){return t.setUTCFullYear(2e3+e)},m:function(t,e){if(isNaN(t))return t;for(e-=1;0>e;)e+=12;for(e%=12,t.setUTCMonth(e);t.getUTCMonth()!=e;)t.setUTCDate(t.getUTCDate()-1);return t},d:function(t,e){return t.setUTCDate(e)}};m.M=m.MM=m.mm=m.m,m.dd=m.d,a=e(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0);var y=i.parts.slice();if(l.length!=y.length&&(y=t(y).filter(function(e,a){return-1!==t.inArray(a,g)}).toArray()),l.length==y.length){for(var u=0,D=y.length;D>u;u++){if(p=parseInt(l[u],10),o=y[u],isNaN(p))switch(o){case"MM":v=t(d[s].months).filter(function(){var t=this.slice(0,l[u].length),e=l[u].slice(0,t.length);return t==e}),p=t.inArray(v[0],d[s].months)+1;break;case"M":v=t(d[s].monthsShort).filter(function(){var t=this.slice(0,l[u].length),e=l[u].slice(0,t.length);return t==e}),p=t.inArray(v[0],d[s].monthsShort)+1}f[o]=p}for(var w,k,u=0;u<g.length;u++)k=g[u],k in f&&!isNaN(f[k])&&(w=new Date(a),m[k](w,f[k]),isNaN(w)||(a=w))}return a},formatDate:function(e,a,i){"string"==typeof a&&(a=c.parseFormat(a));var s={d:e.getUTCDate(),D:d[i].daysShort[e.getUTCDay()],DD:d[i].days[e.getUTCDay()],m:e.getUTCMonth()+1,M:d[i].monthsShort[e.getUTCMonth()],MM:d[i].months[e.getUTCMonth()],yy:e.getUTCFullYear().toString().substring(2),yyyy:e.getUTCFullYear()};s.dd=(s.d<10?"0":"")+s.d,s.mm=(s.m<10?"0":"")+s.m;for(var e=[],n=t.extend([],a.separators),o=0,r=a.parts.length;r>=o;o++)n.length&&e.push(n.shift()),e.push(s[a.parts[o]]);return e.join("")},headTemplate:'<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};c.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+c.headTemplate+"<tbody></tbody>"+c.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+c.headTemplate+c.contTemplate+c.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+c.headTemplate+c.contTemplate+c.footTemplate+"</table></div></div>",t.fn.datepicker.DPGlobal=c,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=r,this},t(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(e){var a=t(this);a.data("datepicker")||(e.preventDefault(),a.datepicker("show"))}),t(function(){t('[data-provide="datepicker-inline"]').datepicker()})}(window.jQuery);