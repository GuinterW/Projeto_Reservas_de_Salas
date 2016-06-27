var server = 'http://localhost:9000/search/';

var date = new Date(),
    day  = date.getDate(),
    month  = date.getMonth() + 1,
    year  = date.getFullYear(),
    userName = '',
    userImage = '',
    userEmail = '';

var table = {
    forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
    complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'
}

$(document).ready(function(){
    start();
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
    $('.room').click(function(){
        var page = $(this).attr('id');
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='"+page+"']").parent().addClass("active activeRoom");
        checkRoom(page);
    });
    $('#repeat').click(function(){
        $("#modalRepeat").modal();
        $('#startRepeat').html($('#calendar').val());
    });
    $('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br",
        autoclose: true
    });
    $('#year').change(function(){
<<<<<<< 8da6c0033019bc888ed4430b61eec37d57850416
        buildTable(1, '/' + $('#year').val());
=======
        var url = $(this).val();
        //identificar a sala selecionada
        tableComplete (1, '/' + url, url);
>>>>>>> select month
        $('#month').val('00');
        $('#day').hide();
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#month').change(function(){
<<<<<<< 8da6c0033019bc888ed4430b61eec37d57850416
        if ($('#month').val()=="00"){
            buildTable(1, '/' +  $("#year").val(), table.complete);
            $('#day').hide();
        }
        else {
            buildTable(1, '/' +  $("#year").val() + '/' + $('#month').val(), table.complete);
            buildSelectDay($('#month').val());
        }
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#day').change(function(){
        if ($('#day').val()=="00"){
            buildTable(1, '/' +  $("#year").val() + '/' + $('#month').val(), table.complete);
        }
        else {
            buildTable(1, '/' +  $("#year").val() + '/' + $('#month').val() + '/' + $('#day').val(), table.complete);
        }
    });
    $('#user').on('click', '#userImage', function(){
        $("#modalLogIn").modal('show');
    });
    $('#repeatFrequency').change(function(){
        $('#nFrequency').html($('#repeatFrequency').val());
    });
    $('#endRepeat').change(function(){
        $('#nRepeats').html($('#endRepeat').val());
=======
        var monthSelected = $(this).val();
        if (monthSelected=="00"){
            tableComplete(1, '/' +  $("#year").val(), $("#year").val());
            $('#day').hide();
        }
        else {
            $('#day').show();
            tableComplete(1, '/' +  $("#year").val() + '/' + monthSelected, $("#year").val());
        }
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
>>>>>>> select month
    });
});

function dateToday (){
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i> ' + [day, month, year].join('/');
    $('#dateToday').html(dateComplete);
}

function start (){
    buildSelectYear();
    $('.pages').hide();
    $('#forToday').show();
    $("#modalLogIn").modal('show');
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
        buildTable(sala, '/' + year + '/' + month + '/' + day, table.forToday);
    }
<<<<<<< 8da6c0033019bc888ed4430b61eec37d57850416
    else if (page=='#listMeetings'){
        if($('#month').val()=='00'){
            $('#day').hide();
            buildTable(sala, '/' + $('#year').val(), table.complete);
        }
        else {
            if($('#day').val()=='00'){
                buildTable(sala, '/' + $('#year').val() + '/' + $('#month').val(), table.complete);
            }
            else {
                buildTable(sala, '/' +  $("#year").val() + '/' + $('#month').val() + '/' + $('#day').val(), table.complete);
            }
=======
    else if (pagina=='#listMeetings'){
        if($('#month').val()=='00'){
            tableComplete (sala, '/' + $('#year').val(), $('#year').val());
        }
        else {
            tableComplete (sala, '/' + $('#year').val() + '/' + $('#month').val(), $('#year').val());
>>>>>>> select month
        }
    }
    else {
        insert();
    }
}

function buildTable(sala, url, table){
    cleanTable ();
    var lengthMonth = month.toString();
    if (lengthMonth.length==1){
        month = '0' + lengthMonth;
    }
    dateToday ();
    var list = table;
    var result=ajax(server + sala + url + '?User=' + userEmail);
    $("#pagesAndTable").show();
    $('#table').html(list);
    $('.newLine').append(result);
}

function ajax(url){
    var result = '';
    $.ajax({
        type: "GET",
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
    $("#modalLogIn").modal('hide');
    buildTable(1, '/' + year + '/' + month + '/' + day, table.forToday);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('#logIn').html('<div class="g-signin2" data-onsuccess="onSignIn"></div>');
        $('#user').html('');
    });
    $("#modalLogIn").modal('hide');
}