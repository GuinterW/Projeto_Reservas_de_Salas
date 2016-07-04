var server = 'http://localhost:9000/';

var today = new Date();
var day  = today.getDate();
var month  = today.getMonth() + 1;
var year  = today.getFullYear();
var userName = '';
var userImage = '';
var userEmail = '';
var urlDelete = '';
var IDUpdate = '';
var x = 0;

var table = {
    forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
    complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
    my: '<table class="table table-bordered table-hover"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine pointer"></tbody></table>'
}

var messages = {
    insertSuccess: 'Reserva realizada.',
    insertFailed: 'Não foi possível realizar a reserva.',
    deleteFailed: 'Não foi possível apagar a reserva.',
    deleteSuccess: 'Reserva apagada.',
    insertsFailed: 'Não foi possível realizar alguma(s) reserva(s).',
    editFailed: 'Não foi possível editar a reserva.'
}

$(document).ready(function(){
    checkUser();
    $("#endRepeat").keypress(onlyIntegers);
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
    $('.calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br",
        autoclose: true
    });
    $('#user').click(function(){
        $("#modalLogOut").modal('show');
    });
    $('#logOut').click(function(){
        signOut();
    });
    $('#year').change(function(){
        checkTab(1);
        $('#month').val('00');
        $('#day').hide();
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#month').change(function(){
        if($('#month').val()!="00"){
            buildSelectDay($('#month').val());
        }
        checkTab(1);
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#day').change(function(){
        checkTab(1);
    });
    $('#repeatFrequency').change(function(){
        setSummaryRepeat();
    });
    $('#repeatType').change(function(){
        setSummaryRepeat();
    });
    $('#endRepeat').change(function(){
        $('#nRepeats').html($('#endRepeat').val()+' vezes');
    });
    $('#table').on('click', '.tableRow', function(){
        if($("li[class='active mainLinks'] a").attr('href')=='#myMeetings'){
            var date = $(this).children('td[data-name="date"]').data('date');
            var start = $(this).children('td[data-name="start"]').data('start');
            var end = $(this).children('td[data-name="end"]').data('end');
            var schedule = $(this).children('td[data-name="schedule"]').data('schedule');
            var user = userEmail;
            var room = $("li[class='active activeRoom']").val();
            IDUpdate = $(this).data('id');
            setModalUpdateValues(date, start, end, room, schedule);
            urlDelete = server + 'delete?Room=' + room + '&Start=' + start + '&End=' + end + '&Date=' + date + '&User=' + user;
            $('#modalOptions').modal('show');
        }
    });
    $('#repeat').click(function(){
        $("#modalRepeat").modal();
        $('#startRepeat').val($('.calendar').val());
    });
    $('#buttonEdit').click(function(){
        $('#modalOptions').modal('hide');
        $('#modalUpdate').modal('show');
    });
    $('#buttonClear').click(function(){
        clearInsertValues('.calendar', '#startMeeting', '#endMeeting', '#insertSchedule');
    });
    $('#buttonClearUpdate').click(function(){
        clearInsertValues('.calendar', '#updateStartMeeting', '#updateEndMeeting', '#updateSchedule');
    });
    $('#buttonRepeat').click(function(){
        setRepeatInsert();
        $('#modalRepeat').modal('hide');
    });
    $("#buttonInsert").click(function(){
        var calendar = $('#calendarInsert').val();
        var room = $('#insertRoom').val();
        var url=server+'insert?Room='+room+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+calendar.substring(6,10)+calendar.substring(3,5)+calendar.substring(0,2)+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
        var result = ajax(url, 'POST');
        modalMessage(result, messages.insertFailed, messages.insertSuccess);
    });
    $('#buttonDelete').click(function(){
        result = ajax(urlDelete, 'DELETE');
        modalMessage(result, messages.deleteFailed, messages.deleteSuccess);
        $('#modalOptions').modal('hide');
        checkTab($("li[class='active activeRoom']").val());
    });
    $('#buttonUpdate').click(function(){
        var calendar = $('#calendarUpdate').val();
        var url=server+'insert?Room='+$('#updateRoom').val()+'&Start='+$('#updateStartMeeting').val()+'&End='+$('#updateEndMeeting').val()+'&Date='+calendar.substring(6,10)+calendar.substring(3,5)+calendar.substring(0,2)+'&Resp='+userName+'&Schedule='+$('#updateSchedule').val()+'&ID='+IDUpdate+'&User='+userEmail;
        var result = ajax(url, 'PUT');
        $('#modalUpdate').modal('hide');
        modalMessage(result, messages.editFailed, messages.insertSuccess);
        checkTab($("li[class='active activeRoom']").val());
    });
    $('#endRepeat').click(function(){
        setSummaryRepeat('endRepeat');
    });
    $('#dateEndRepeat').click(function(){
        setSummaryRepeat('dateEndRepeat');
    });
    $('input[value=numberOfTimes]').click(function(){
        setSummaryRepeat('endRepeat');
    });
    $('input[value=date]').click(function(){
        setSummaryRepeat('dateEndRepeat');
    });
});

function clearInsertValues(calendar, start, end, schedule){
    $(calendar).val('');
    $(start).val('08:30:00');
    $(end).val('09:00:00');
    $(schedule).val('');
}

function modalMessage(result, fail, success){
    if(result != 'OK'){
        $('#modalMessages .modal-dialog .modal-content .modal-body h1').html(fail);
    }
    else {
        $('#modalMessages .modal-dialog .modal-content .modal-body h1').html(success);
    }
    $('#modalMessages').modal('show');
}

function setModalUpdateValues(dateUpdate, startUpdate, endUpdate, roomUpdate, scheduleUpdate){
    $('.calendar').val(dateUpdate.toString().substring(6,8) + '/' + dateUpdate.toString().substring(4,6) + '/' + dateUpdate.toString().substring(0,4));
    //$('.calendar').datepicker('setDate', new Date(2016, 7, 5));
    $('#updateStartMeeting').val(startUpdate);
    $('#updateEndMeeting').val(endUpdate);
    $('#updateRoom').val(roomUpdate);
    $('#updateSchedule').val(scheduleUpdate);
}

function setSummaryRepeat(radio){
    switch($('#repeatType').val()){
        case '00':
            $('#nFrequency').html('A cada '+$('#repeatFrequency').val()+' dias');
            $('#repeatFrequency').prop('disabled', false);
        break;
        case '1':
            $('#nFrequency').html('Diariamente');
            $('#repeatFrequency').prop('disabled', true);
        break;
        case '7':
            $('#nFrequency').html('Semanalmente');
            $('#repeatFrequency').prop('disabled', true);
        break;
        case '30':
            $('#nFrequency').html('Mensalmente');
            $('#repeatFrequency').prop('disabled', true);
        break;
        case '365':
            $('#nFrequency').html('Anualmente');
            $('#repeatFrequency').prop('disabled', true);
        break;
    }
    if(radio=='dateEndRepeat'){
        $('input[value=date]').prop('checked', true);
        $('#nRepeats').html($('#dateEndRepeat').val());
    }
    else if(radio=='endRepeat'){
        $('input[value=numberOfTimes]').prop('checked', true);
        $('#nRepeats').html($('#endRepeat').val()+' vezes');
    }
}

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

function getNumberOfRepeats(dayRepeat, monthRepeat, yearRepeat){
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
        result = (startDays - endDays)/parseInt($('#repeatFrequency').val());
    }
    else {
        result = (startDays - endDays)/parseInt($('#repeatType').val());
    }
    return result;
}

function setRepeatInsert(){
    var dateRepeat = $('.calendar').val().toString();
    var dayRepeat = parseInt(dateRepeat.substring(0,2));
    var monthRepeat = parseInt(dateRepeat.substring(3,5));
    var yearRepeat = parseInt(dateRepeat.substring(6,10));
    var room = parseInt($('#insertRoom').val());
    var daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
    var repeatUntil = $('input[name=radioEnd]:checked').val();
    if(repeatUntil == 'numberOfTimes'){
        repeat(dayRepeat, monthRepeat, yearRepeat, room, daysInMonth, $('#endRepeat').val());
    }
    else if(repeatUntil == 'date'){
        var timesToRepeat = getNumberOfRepeats(dayRepeat, monthRepeat, yearRepeat);
        repeat(dayRepeat, monthRepeat, yearRepeat, room, daysInMonth, timesToRepeat);
    }
}

function insertRepeat(yearRepeat, monthRepeat, dayRepeat, room){
    yearRepeat = yearRepeat.toString();
    monthRepeat = monthRepeat.toString();
    dayRepeat = dayRepeat.toString();
    if(monthRepeat.length==1){
        monthRepeat = '0' + monthRepeat;
    }
    if(dayRepeat.length==1){
        dayRepeat = '0' + dayRepeat;
    }
    var url=server+'insert?Room='+room+'&Start='+$('#startMeeting').val()+'&End='+$('#endMeeting').val()+'&Date='+yearRepeat+monthRepeat+dayRepeat+'&Resp='+userName+'&Schedule='+$('#insertSchedule').val()+'&User='+userEmail;
    var result = ajax(url, 'POST');
    modalMessage(result, messages.insertsFailed);
}

function repeatByNumberOfDays(increment, dayRepeat, monthRepeat, yearRepeat, room){
    daysInMonth = getDaysInMonth(monthRepeat, yearRepeat);
    if(dayRepeat+increment>daysInMonth){
        dayRepeat = increment - (daysInMonth - dayRepeat);
        if(monthRepeat+1>12){
            monthRepeat = 1;
            yearRepeat+=1;
        }
        else {
            monthRepeat+=1;
        }
    }
    insertRepeat(yearRepeat, monthRepeat, dayRepeat, room);
    dayRepeat+=increment;
    return [dayRepeat, monthRepeat, yearRepeat];
}

function repeat(dayRepeat, monthRepeat, yearRepeat, room, daysInMonth, timesToRepeat){
    for(var x=0;x<timesToRepeat;x++){
        if($('#repeatType').val()!='00'){
            dateRepeat = repeatByNumberOfDays(parseInt($('#repeatFrequency').val()), dayRepeat, monthRepeat, yearRepeat, room);
            dayRepeat = dateRepeat[0];
            monthRepeat = dateRepeat[1];
            yearRepeat = dateRepeat[2];
        }
        else {
            switch($('#repeatType').val()){
                case '1':
                    dateRepeat = repeatByNumberOfDays(1, dayRepeat, monthRepeat, yearRepeat, room);
                    dayRepeat = dateRepeat[0];
                    monthRepeat = dateRepeat[1];
                    yearRepeat = dateRepeat[2];
                    break;
                case '7':
                    dateRepeat = repeatByNumberOfDays(7, dayRepeat, monthRepeat, yearRepeat, room);
                    dayRepeat = dateRepeat[0];
                    monthRepeat = dateRepeat[1];
                    yearRepeat = dateRepeat[2];
                    break;
                case '30':
                    if(monthRepeat+1>12){
                        monthRepeat = 1;
                        yearRepeat+=1;
                    }
                    else {
                        monthRepeat+=1;
                    }
                    insertRepeat(yearRepeat, monthRepeat, dayRepeat, room);
                    monthRepeat++;
                    break;
                case '365':
                    insertRepeat(yearRepeat, monthRepeat, dayRepeat, room);
                    yearRepeat++;
                    break;
            }
        }
    }
}

function checkUser(){
    x++;
    if(x<5){
        setTimeout(function(){
            $.ajax({
                type: 'GET',
                url: server + 'search/' + '?User=' + userEmail,
                async: true,
                success: function(data) {
                    start();
                    $('body').css('display', 'block');
                    buildTable(1, '/' + year + '/' + month + '/' + day + '/?today=true&', table.forToday);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    checkUser();
                }
            });
        }, 1000);
    }
    else {
        signOut();
    }
}

function dateToday(){
    var stringDay = day.toString();
    if(stringDay.length==1){
        day = '0' + stringDay;
    }
    var stringMonth = month.toString();
    if(stringMonth.length==1){
        month = '0' + stringMonth;
    }
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i> ' + [day, month, year].join('/');
    $('#dateToday').html(dateComplete);
}

function start(){
    buildRooms();
    buildSelectYear();
    dateToday();
    $('.pages').hide();
    $('#forToday').show();
    $('.g-signin2').css('display', 'none');
}

function buildRooms(){
    var result = ajax(server + 'search/' + '?Rooms=true&User=' + userEmail, 'GET');
    $('.pagination').html(result);
}

function buildSelectYear(){
    var list='';
    for(var x=2007;x<year + 6;x++){
        if(x==year){
            list += "<option value=" + x + ' selected=true>' + x + '</option>';
        }
        else {
            list += "<option value=" + x + '>' + x + '</option>';
        }
    }
    $('#year').html(list);
}

function buildSelectDay(monthSelected){
    $('#day').show();
    var list = '<option value="00">Todos</option>';
    for(var x=1;x<getDaysInMonth(parseInt(monthSelected), $('#year').val()) + 1;x++){
        if(x<10){
            list += '<option value="0' + x + '">' + x + '</option>';
        }
        else {
            list += '<option value="' + x + '">' + x + '</option>';
        }
    }
    $('#day').html(list);
}

function cleanTable(){
    $('#table').html('');
    $('.newLine').html('');
}

function checkRoom(page){
    if(page=='room1') {
        checkTab(1);
    }
    else if(page=='room2') {
        checkTab(2);
    }
    else {
        checkTab(3);
    }
}

function listMeetings(table, query, sala){
    $('#listMeetings').show();
    if($('#month').val()=='00'){
        $('#day').hide();
        buildTable(sala, '/' + $('#year').val() + query, table);
    }
    else {
        if($('#day').val()=='00'){
            buildTable(sala, '/' + $('#year').val() + '/' + $('#month').val() + query, table);
        }
        else {
            buildTable(sala, '/' +  $("#year").val() + '/' + $('#month').val() + '/' + $('#day').val() + query, table);
        }
    }
}

function checkTab(sala){
    var page = $("li[class='active mainLinks'] a").attr('href');
    if(page=='#forToday'){
        $('#day').hide();
        buildTable(sala, '/' + year + '/' + month + '/' + day + '/?today=true&', table.forToday);
    }
    else if(page=='#listMeetings'){
        listMeetings(table.complete, '?', sala);
    }
    else if(page=='#myMeetings'){
        listMeetings(table.my, '?myMeetings=true&', sala);
    }
    else {
        $('#pagesAndTable').hide();
        cleanTable();
    }
}

function buildTable(sala, url, table){
    cleanTable();
    var list = table;
    var result=ajax(server + 'search/' + sala + url + 'User=' + userEmail, 'GET');
    $("#pagesAndTable").show();
    $('#table').html(list);
    $('.newLine').append(result);
}

function ajax(url, type){
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
    auth2.signOut().then(function() {
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:9000";
    });
}

function onlyIntegers(e){
    if ( e.which == 8 || e.which == 0 ) return true;
    if ( e.which < 48 || e.which > 57 ) return false;
}