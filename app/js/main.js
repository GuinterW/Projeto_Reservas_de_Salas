var ip = {
    query: 'http://localhost:9000/search/',
    usertest: '?User=Guinter%20Weber'
}

var data = new Date(),
        day  = data.getDate(),
        month  = data.getMonth() + 1,
        year  = data.getFullYear();


var table = {
    forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
    complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'
}

$(document).ready(function(){
    start();
    $('.links').click(function(){
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
        var pagina = $(this).attr('href');
        $("li[class='active mainLinks']").removeClass("active mainLinks");
        $("li a[href='"+pagina+"']").parent().addClass("active mainLinks");
        $('.pages').hide();
        $(pagina).show();
        formTable (1);
    });
    $('.room').click(function(){
        var pagina = $(this).attr('id');
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='"+pagina+"']").parent().addClass("active activeRoom");
        changingRoom (pagina);
    });
    $('#repeat').click(function(){
        $("#myModal").modal();
    });
    $('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br"
    });
    $('#year').change(function(){
        var url = $(this).val();
        //identificar a sala selecionada
        tableComplete (1, '/' + url, url);
        $('#month').val('00');
        $('#day').hide();
        $("li[class='active activeRoom']").removeClass("active activeRoom");
        $("li a[id='room1']").parent().addClass("active activeRoom");
    });
    $('#month').change(function(){
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
    });
});

function dateToday (){
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i> ' + [day, month, year].join('/');
    $('#dateToday').html(dateComplete);
}

function start (){
    $('.pages').hide();
    $('#forToday').show();
    selectYear(2016);
    tableForToday (1);
}

function selectYear (selected){
    console.log(selected);
    var list='';
    var data = new Date(),
        year  = data.getFullYear() + 2;
    for (var x=2007;x<year;x++){
        if(x==selected){
            list += "<option value=" + x + ' selected=true>' + x + '</option>';
        }
        else {
            list += "<option value=" + x + '>' + x + '</option>';
        }
    }
    $('#year').html(list);
}

function cleanTable (){
    $('#table').html('');
    $('.newLine').html('');
}

function changingRoom (pagina){
    if (pagina=='room1') {
        formTable(1);
    }
    else if (pagina=='room2') {
        formTable(2);
    }
    else {
        formTable(3);
    }
}

function formTable (sala){
    var pagina = $("li[class='active mainLinks'] a").attr('href');
    if (pagina=='#forToday'){
        tableForToday (sala);
    }
    else if (pagina=='#listMeetings'){
        if($('#month').val()=='00'){
            tableComplete (sala, '/' + $('#year').val(), $('#year').val());
        }
        else {
            tableComplete (sala, '/' + $('#year').val() + '/' + $('#month').val(), $('#year').val());
        }
    }
    else {
        formInclusion ();
    }
}

function tableForToday (sala){
    var lengthMonth = month.toString();
    if (lengthMonth.length==1){
        month = '0' + lengthMonth;
    }
    cleanTable ();
    dateToday ();
    $('#day').hide();
    $("#pagesAndTable").show();
    var list = table.forToday;
    var result=ajax(ip.query + sala + '/' + year + '/' + month + '/' + day + ip.usertest + '&today=true');
    $('#table').html(list);
    $('.newLine').append(result);
}

function tableComplete (sala,url, year){
    cleanTable ();
    //selectYear (year);
    $("#pagesAndTable").show();
    var result=ajax(ip.query + sala + url + ip.usertest);
    var list = table.complete;
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

function formInclusion (){
    $("#pagesAndTable").hide();
    cleanTable ();
}