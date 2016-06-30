var server = 'http://localhost:9000/search/';

var date = new Date();
var day  = date.getDate();
var month  = date.getMonth() + 1;
var stringMonth = month.toString();
if (stringMonth.length==1){
    month = '0' + stringMonth;
}
var year  = date.getFullYear();
var userName = '';
var userImage = '';
var userEmail = '';
var urlDelete = '';
var x = 0;

var table = {
    forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
    complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'
}

$(document).ready(function(){
    checkUser();
    $('.links').click(function(){
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
        var page = $(this).attr('href');
        $("li[class='active mainLinks']").removeClass("active mainLinks");
        $("li a[href='"+page+"']").parent().addClass("active mainLinks");
        $('.pages').hide();
        $(page).show();
        checkTab(1);
    });
    $('.pagination').on('click', '.room', function(){
        var page = $(this).attr('id');
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='"+page+"']").parent().addClass("active activeRoom");
        checkRoom(page);
    });
    $('#repeat').click(function(){
        $("#modalRepeat").modal();
        $('#startRepeat').val($('#calendar').val());
    });
    $('#buttomClear').click(function(){
        $('#calendar').val('');
        $('#startMeeting').val('08:30:00');
        $('#endMeeting').val('09:00:00');
        $('#insertSchedule').val('');
    });
    $('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br",
        autoclose: true
    });
    $('#dateEndRepeat').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br",
        autoclose: true
    });
    $('#year').change(function(){
        checkTab(1);
        $('#month').val('00');
        $('#day').hide();
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#month').change(function(){
        if ($('#month').val()!="00"){
            buildSelectDay($('#month').val());
        }
        checkTab(1);
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#day').change(function(){
        checkTab(1);
    });
    $('#user').click(function(){
        $("#modalLogIn").modal('show');
    });
    $('#repeatFrequency').change(function(){
        $('#nFrequency').html($('#repeatFrequency').val());
    });
    $('#endRepeat').change(function(){
        $('#nRepeats').html($('#endRepeat').val());
    });
    $("#buttomInsert").click(function(){
        var calendar = $('#calendar').val();
        var room = $('#insertRoom').val();
        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+calendar.substring(6,10)+calendar.substring(3,5)+calendar.substring(0,2)+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
        var result = ajax(url, 'POST');
        if(result=='OK'){
            $('#modalInsert .modal-dialog .modal-content .modal-body h1').html('Reserva realizda.');
            $('#modalInsert').modal('show');
        }
        else {
            $('#modalInsert .modal-dialog .modal-content .modal-body h1').html('Não foi possível realizar a reserva.');
            $('#modalInsert').modal('show');
        }
    });
    $('#logOut').click(function(){
        signOut();
    });
    $('#table').on('click', '.tableRow', function(){
        if($("li[class='active mainLinks'] a").attr('href')=='#myMeetings'){
            var date = $(this).children('td[data-name="date"]').data('date');
            var start = $(this).children('td[data-name="start"]').data('start');
            var end = $(this).children('td[data-name="end"]').data('end');
            var user = userEmail;
            var room = $("li[class='active activeRoom']").val();
            urlDelete = 'http://localhost:9000/delete?Room=' + room + '&Start=' + start + '&End=' + end + '&Date=' + date + '&User=' + user;
            $('#modalDelete').modal('show');
        }
    });
    $('#delete').click(function(){
        ajax(urlDelete, 'DELETE');
        $('#modalDelete').modal('hide');
        checkTab($("li[class='active activeRoom']").val());
    });
    $('#buttomClear').click(function(){
        $('#calendar').val('');
        $('#startMeeting').val('08:30:00');
        $('#endMeeting').val('09:00:00');
        $('#insertSchedule').val('');
    });
    $('#buttomRepeat').click(function(){
        repeatInsert();
    });
    $('#repeatType').change(function(){
        if(this.val()!='00'){
            $('#repeatFrequency').prop('disabled', true);
        }
        else {
            $('#repeatFrequency').prop('disabled', false);
        }
    });
});

function getDaysInMonth(monthRepeat, yearRepeat){
    switch(monthRepeat){
        case 2:
            if(yearRepeat%4==0){
                return 29;
            }
            else {
                return 28;
            }
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
    }
}

function getRepeats(dayRepeat, monthRepeat, yearRepeat){
    var startDays = dayRepeat;
    var endDays;
    var endDate = $('#dateEndRepeat').val().toString();
    var endDay = parseInt(endDate.substring(0,2));
    var endMonth = parseInt(endDate.substring(3,5));
    var endYear = parseInt(endDate.substring(4,8));
    var result;
    for(var x=1;x<monthRepeat;x++){
        startDays+=30;
    }
    if(endYear=yearRepeat){
        endDays = endDay;
        for(var x=1;x<monthRepeat;x++){
            endDays+=30;
        }
    }
    else if(endYear>yearRepeat){
        endDays = 30 - dayRepeat;
        for(var x=monthRepeat;x<12;x++){
            endDays+=30;
        }
        for(var x=1;x<endMonth;x++){
            endDays+=30;   
        }
        endDays+=endDay;
    }
    if($('#repeatType').val()!='00'){
        result = (startDays - endDays)/$('#repeatFrequency').val();
    }
    else {
        result = (startDays - endDays)/$('#repeatType').val();
    }
    return result;
}

function repeatInsert(){
    var dateRepeat = $('#calendar').val().toString();
    var dayRepeat = parseInt(dateRepeat.substring(0,2));
    var monthRepeat = parseInt(dateRepeat.substring(3,5));
    var yearRepeat = parseInt(dateRepeat.substring(4,8));
    var daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
    if($('#endRepeat').val()>0){
        for(var x=0;x<$('#endRepeat').val();x++){
            if($('#repeatType').val()!='00'){
                daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
                if(dayRepeat+$('#repeatFrequency').val()>daysInMonth){
                    dayRepeat = $('#repeatFrequency').val() - daysInMonth - dayRepeat;
                    if(monthRepeat+1>12){
                        monthRepeat = 1;
                        yearRepeat+=1;
                    }
                    else {
                        monthRepeat+=1;
                    }
                }
                var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                ajax(url, 'GET');
                dayRepeat+=$('#repeatFrequency').val();
            }
            else {
                switch($('#repeatType').val()){
                    case 1:
                        daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
                        if(dayRepeat+1>daysInMonth){
                            dayRepeat = 1;
                            if(monthRepeat+1>12){
                                monthRepeat = 1;
                                yearRepeat+=1;
                            }
                            else {
                                monthRepeat+=1;
                            }
                        }
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        dayRepeat++;
                        break;
                    case 7:
                        daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
                        if(dayRepeat+7>daysInMonth){
                            dayRepeat = 7 - daysInMonth - dayRepeat;
                            if(monthRepeat+1>12){
                                monthRepeat = 1;
                                yearRepeat+=1;
                            }
                            else {
                                monthRepeat+=1;
                            }
                        }
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        dayRepeat+=7;
                        break;
                    case 30:
                        if(monthRepeat+1>12){
                            monthRepeat = 1;
                        }
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        monthRepeat++;
                        break;
                    case 365:
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        yearRepeat++;
                        break;
                }
            }
        }
    }
    else if($('#dateEndRepeat').val()>0){
        var timesToRepeat = getRepeats(dayRepeat, monthRepeat, yearRepeat);
        for(var x=0;x<timesToRepeat;x++){
            if($('#repeatType').val()!='00'){
                daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
                if(dayRepeat+$('#repeatFrequency').val()>daysInMonth){
                    dayRepeat = $('#repeatFrequency').val() - daysInMonth - dayRepeat;
                    if(monthRepeat+1>12){
                        monthRepeat = 1;
                        yearRepeat+=1;
                    }
                    else {
                        monthRepeat+=1;
                    }
                }
                var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                ajax(url, 'GET');
                dayRepeat+=$('#repeatFrequency').val();
            }
            else {
                switch($('#repeatType').val()){
                    case 1:
                        daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
                        if(dayRepeat+1>daysInMonth){
                            dayRepeat = 1;
                            if(monthRepeat+1>12){
                                monthRepeat = 1;
                                yearRepeat+=1;
                            }
                            else {
                                monthRepeat+=1;
                            }
                        }
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        dayRepeat++;
                        break;
                    case 7:
                        daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
                        if(dayRepeat+7>daysInMonth){
                            dayRepeat = 7 - daysInMonth - dayRepeat;
                            if(monthRepeat+1>12){
                                monthRepeat = 1;
                                yearRepeat+=1;
                            }
                            else {
                                monthRepeat+=1;
                            }
                        }
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        dayRepeat+=7;
                        break;
                    case 30:
                        if(monthRepeat+1>12){
                            monthRepeat = 1;
                        }
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        monthRepeat++;
                        break;
                    case 365:
                        var url='http://localhost:9000/insert?Room='+room.substring(5,6)+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
                        ajax(url, 'GET');
                        yearRepeat++;
                        break;
                }
            }
        }
    }
}

function checkUser(){
    x++;
    if(x<3){
        setTimeout(function(){
            $.ajax({
                type: 'GET',
                url: server + '?User=' + userEmail,
                async: true,
                success: function(data) {
                    start();
                    $('body').css('display', 'block');
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    checkUser();
                }
            });
        }, 2000);
    }
    else {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            $('#logIn').html('<div class="g-signin2" data-onsuccess="onSignIn"></div>');
            $('#user').html('');
            userName = '';
            userImage = '';
            userEmail = '';
            window.location.replace('http://localhost:9000');       
        });
    }
}

function dateToday (){
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i> ' + [day, month, year].join('/');
    $('#dateToday').html(dateComplete);
}

function start (){
    buildRooms();
    buildSelectYear();
    $('.pages').hide();
    $('#forToday').show();
    $('.g-signin2').css('display', 'none');
}

function buildRooms(){
    var result = ajax(server + '?Rooms=true&User=' + userEmail, 'GET');
    $('.pagination').html(result);
}

function buildSelectYear (){
    var list='';
    for (var x=2007;x<year + 2;x++){
        if(x==year){
            list += "<option value=" + x + ' selected=true>' + x + '</option>';
        }
        else {
            list += "<option value=" + x + '>' + x + '</option>';
        }
    }
    $('#year').html(list);
}

function buildSelectDay (monthSelected){
    $('#day').show();
    var list = '<option value="00">Todos</option>';
    switch (monthSelected){
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            for (var x=1;x<32;x++){
                if(x<10){
                    list += '<option value="0' + x + '">' + x + '</option>';
                }
                else {
                    list += '<option value="' + x + '">' + x + '</option>';
                }
            }
            $('#day').html(list);
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            for (var x=1;x<31;x++){
                if(x<10){
                    list += '<option value="0' + x + '">' + x + '</option>';
                }
                else {
                    list += '<option value="' + x + '">' + x + '</option>';
                }
            }
            $('#day').html(list);
            break;
        case '02':
            resto = $('#year').val()%4;
            if (resto == 0){
                for (var x=1;x<30;x++){
                    if(x<10){
                        list += '<option value="0' + x + '">' + x + '</option>';
                    }
                    else {
                        list += '<option value="' + x + '">' + x + '</option>';
                    }
                }
            }
            else {
                for (var x=1;x<29;x++){
                    if(x<10){
                        list += '<option value="0' + x + '">' + x + '</option>';
                    }
                    else {
                        list += '<option value="' + x + '">' + x + '</option>';
                    }
                }
            }        
            $('#day').html(list);
            break;
    }
}

function cleanTable (){
    $('#table').html('');
    $('.newLine').html('');
}

function checkRoom (page){
    if (page=='room1') {
        checkTab(1);
    }
    else if (page=='room2') {
        checkTab(2);
    }
    else {
        checkTab(3);
    }
}

function checkTab (sala){
    var page = $("li[class='active mainLinks'] a").attr('href');
    if (page=='#forToday'){
        $('#day').hide();
        buildTable(sala, '/' + year + '/' + month + '/' + day + '/?today=true&', table.forToday);
    }
    else if (page=='#listMeetings'){
        if($('#month').val()=='00'){
            $('#day').hide();
            buildTable(sala, '/' + $('#year').val() + '?', table.complete);
        }
        else {
            if($('#day').val()=='00'){
                buildTable(sala, '/' + $('#year').val() + '/' + $('#month').val() + '?', table.complete);
            }
            else {
                buildTable(sala, '/' +  $("#year").val() + '/' + $('#month').val() + '/' + $('#day').val() + '?', table.complete);
            }
        }
    }
    else if(page=='#myMeetings'){
        $('#listMeetings').show();
        if($('#month').val()=='00'){
            $('#day').hide();
            buildTable(sala, '/' + $('#year').val() + '?myMeetings=true&', table.complete);
        }
        else {
            if($('#day').val()=='00'){
                buildTable(sala, '/' + $('#year').val() + '/' + $('#month').val() + '?myMeetings=true&', table.complete);
            }
            else {
                buildTable(sala, '/' +  $("#year").val() + '/' + $('#month').val() + '/' + $('#day').val() + '?myMeetings=true&', table.complete);
            }
        }
    }
    else {
        insert();
    }
}

function buildTable(sala, url, table){
    cleanTable ();
    dateToday ();
    var list = table;
    var result=ajax(server + sala + url + 'User=' + userEmail, 'GET');
    $("#pagesAndTable").show();
    $('#table').html(list);
    $('.newLine').append(result);
}

function ajax(url,type){
    var result = '';
    $.ajax({
        type: type,
        url: url,
        async: false,
        success: function(data) {
            result += data;
        }
    });
    return result;
}

function insert(){
    $("#pagesAndTable").hide();
    cleanTable ();
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userImage = profile.getImageUrl();
    userEmail = profile.getEmail();
    $('#user').html(userName + ' <img id="userImage" src="' + userImage + '" />');
    buildTable(1, '/' + year + '/' + month + '/' + day + '/?today=true&' , table.forToday);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('#logIn').html('<div class="g-signin2" data-onsuccess="onSignIn"></div>');
        $('#user').html('');
        userName = '';
        userImage = '';
        userEmail = '';
        //window.location.replace('http://localhost:9000');
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:9000";
    });
    $("#modalLogIn").modal('hide');
}