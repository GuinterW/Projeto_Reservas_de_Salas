<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
<<<<<<< 8b0976c84d464c8b73b5960c4058ea82e85d8425
var server = 'http://localhost:9000/search/';
=======
var ip = {
    query: 'http://localhost:9000/search/',
}

var data = new Date(),
        day  = data.getDate(),
        month  = data.getMonth() + 1,
        year  = data.getFullYear(),
        userName = '',
        userImage = '',
        userEmail = '';
>>>>>>> google account
=======
var server = 'http://localhost:9000/search/';
>>>>>>> renomeação ID html

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
<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
        $(page).show();
=======
        $(pagina).show();
>>>>>>> ajuste funções front-end
=======
        $(page).show();
>>>>>>> renomeação ID html
        checkTab(1);
    });
    $('.room').click(function(){
        var page = $(this).attr('id');
        $("li[class='active activeRoom']").removeClass("active activeRoom");
<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
        $("li a[id='"+page+"']").parent().addClass("active activeRoom");
        checkRoom(page);
=======
        $("li a[id='"+pagina+"']").parent().addClass("active activeRoom");
        checkRoom(pagina);
>>>>>>> ajuste funções front-end
    });
    $('#repeat').click(function(){
<<<<<<< 09a1945cd1d2c938f854e3387ed27224f619e6c0
        $("#modalRepeat").modal();
        $('#startRepeat').html($('#calendar').val());
=======
        $("#myModal").modal();
        $('#disabledInput').html($('#calendar').val());
>>>>>>> BP #24 #22 #18 #17
=======
        $("li a[id='"+page+"']").parent().addClass("active activeRoom");
        checkRoom(page);
    });
    $('#repeat').click(function(){
        $("#modalRepeat").modal();
        $('#startRepeat').html($('#calendar').val());
>>>>>>> renomeação ID html
    });
    $('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br",
        autoclose: true
    });
    $('#year').change(function(){
<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
<<<<<<< 8da6c0033019bc888ed4430b61eec37d57850416
        buildTable(1, '/' + $('#year').val());
=======
        var url = $(this).val();
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
        //identificar a sala selecionada
        tableComplete (1, '/' + url, url);
>>>>>>> select month
=======
        buildTable(1, '/' + url);
>>>>>>> ajuste funções front-end
=======
        buildTable(1, '/' + $('#year').val());
>>>>>>> requisição dia
        $('#month').val('00');
        $('#day').hide();
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#month').change(function(){
<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
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
            buildTable(1, '/' +  $("#year").val(), $("#year").val());
=======
        if ($('#month').val()=="00"){
            buildTable(1, '/' +  $("#year").val(), table.complete);
>>>>>>> requisição dia
            $('#day').hide();
        }
        else {
            buildTable(1, '/' +  $("#year").val() + '/' + $('#month').val(), table.complete);
            buildSelectDay($('#month').val());
        }
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
>>>>>>> select month
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
<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
<<<<<<< 8b0976c84d464c8b73b5960c4058ea82e85d8425
    $("#modalLogIn").modal('show');
=======
    selectYear(2016);
<<<<<<< 351779f4309e0bd3a9b2233e2f1a301c2f55d081
    $("#modalLogIn").modal();
>>>>>>> google account
=======
    $("#modalLogIn").modal('show');
<<<<<<< 09a1945cd1d2c938f854e3387ed27224f619e6c0
>>>>>>> modal login
=======
    completeSelectTime();
>>>>>>> BP #24 #22 #18 #17
=======
    buildSelectYear();
=======
>>>>>>> renomeação ID html
    $("#modalLogIn").modal('show');
>>>>>>> ajuste funções front-end
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

<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
function checkRoom (page){
    if (page=='room1') {
        checkTab(1);
    }
    else if (page=='room2') {
=======
function checkRoom (pagina){
    if (pagina=='room1') {
        checkTab(1);
    }
    else if (pagina=='room2') {
>>>>>>> ajuste funções front-end
=======
function checkRoom (page){
    if (page=='room1') {
        checkTab(1);
    }
    else if (page=='room2') {
>>>>>>> renomeação ID html
        checkTab(2);
    }
    else {
        checkTab(3);
    }
}

function checkTab (sala){
<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
    var page = $("li[class='active mainLinks'] a").attr('href');
    if (page=='#forToday'){
        $('#day').hide();
        buildTable(sala, '/' + year + '/' + month + '/' + day, table.forToday);
<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
=======
    var pagina = $("li[class='active mainLinks'] a").attr('href');
    if (pagina=='#forToday'){
=======
    var page = $("li[class='active mainLinks'] a").attr('href');
    if (page=='#forToday'){
>>>>>>> renomeação ID html
        buildTable(sala, '/' + year + '/' + month + '/' + day, , table.forToday);
>>>>>>> ajuste funções front-end
=======
>>>>>>> requisição dia
    }
<<<<<<< 75285bab3c5edb13eda4b03a48dcb118cc114746
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
=======
    else if (page=='#listMeetings'){
>>>>>>> renomeação ID html
        if($('#month').val()=='00'){
            $('#day').hide();
            buildTable(sala, '/' + $('#year').val(), table.complete);
        }
        else {
<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
            tableComplete (sala, '/' + $('#year').val() + '/' + $('#month').val(), $('#year').val());
>>>>>>> select month
=======
            buildTable(sala, '/' + $('#year').val() + '/' + $('#month').val(), table.complete);
>>>>>>> ajuste funções front-end
=======
            if($('#day').val()=='00'){
                buildTable(sala, '/' + $('#year').val() + '/' + $('#month').val(), table.complete);
            }
            else {
                buildTable(sala, '/' +  $("#year").val() + '/' + $('#month').val() + '/' + $('#day').val(), table.complete);
            }
>>>>>>> requisição dia
        }
    }
    else {
        insert();
    }
}

function buildTable(sala, url, table){
    cleanTable ();
<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
<<<<<<< d7a6937fa346b8dc0dcdc1dae67a540f0cb8d4f4
=======
=======
    var lengthMonth = month.toString();
>>>>>>> requisição dia
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

<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
/*function tableForToday (sala){
>>>>>>> ajuste funções front-end
    var lengthMonth = month.toString();
    if (lengthMonth.length==1){
        month = '0' + lengthMonth;
    }
    dateToday ();
<<<<<<< 8b0976c84d464c8b73b5960c4058ea82e85d8425
    var list = table;
    var result=ajax(server + sala + url + '?User=' + userEmail);
    $("#pagesAndTable").show();
=======
    $('#day').hide();
    $("#pagesAndTable").show();
    var list = table.forToday;
    var result=ajax(server + sala + '/' + year + '/' + month + '/' + day + '?User=' + userEmail + '&today=true');
    $('#table').html(list);
    $('.newLine').append(result);
}

function tableComplete (sala,url,){
    cleanTable ();
    //selectYear (year);
    $("#pagesAndTable").show();
    var result=ajax(server + sala + url + '?User=' + userEmail);
    var list = table.complete;
>>>>>>> google account
    $('#table').html(list);
    $('.newLine').append(result);
}*/

=======
>>>>>>> requisição dia
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
<<<<<<< 351779f4309e0bd3a9b2233e2f1a301c2f55d081
<<<<<<< 8b0976c84d464c8b73b5960c4058ea82e85d8425
    $("#modalLogIn").modal('hide');
    buildTable(1, '/' + year + '/' + month + '/' + day, table.forToday);
=======
    $("#modalLogIn").modal();
=======
    $("#modalLogIn").modal('hide');
<<<<<<< 73b5dbc810eb3e5d7dfe6ff80e4b86057b1ebebc
>>>>>>> modal login
    tableForToday (1);
>>>>>>> google account
=======
    buildTable(1, '/' + year + '/' + month + '/' + day, table.forToday);
>>>>>>> requisição dia
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
<<<<<<< 351779f4309e0bd3a9b2233e2f1a301c2f55d081
<<<<<<< 8b0976c84d464c8b73b5960c4058ea82e85d8425
        $('#logIn').html('<div class="g-signin2" data-onsuccess="onSignIn"></div>');
        $('#user').html('');
    });
    $("#modalLogIn").modal('hide');
=======
        $('#user').html();
    });
    $("#modalLogIn").modal();
>>>>>>> google account
=======
        $('#logIn').html('<div class="g-signin2" data-onsuccess="onSignIn"></div>');
        $('#user').html('');
    });
    $("#modalLogIn").modal('hide');
>>>>>>> modal login
}