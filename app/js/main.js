var ip = {
	query: 'http://192.168.1.117:9000/search/',
	usertest: '?User=guinter.weber@digitaldesk.com.br'
}

var data = new Date(),
        day  = data.getDate(),
        month  = data.getMonth() + 1,
        year  = data.getFullYear();

//só pra eu saber
/*
date: 'http://localhost:9000/search/sala/ano/mes/dia',
yearAndMonth: 'http://localhost:9000/search/sala/ano/mes',
year: 'http://localhost:9000/search/sala/ano'
*/

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
    	tableComplete (1, '/' + url);
    });
    $('#month').change(function(){
    	var monthSelected = $(this).val();
    	if (monthSelected=="#") $('#day').hide();
    	else $('#day').show();
    });
});

function dateToday (){
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i> ' + [day, month, year].join('/');
   	$('#dateToday').html(dateComplete);
}

function start (){
	$('.pages').hide();
	$('#forToday').show();
	tableForToday (1);
}

function selectMonth (){
	var list='<option value="#"> Escolha um mês... </option>';
	for (var x=1;x<13;x++){
		list += "<option value=" + x + '>' + x + '</option>';
	}
	$('#month').html(list);
}

function selectYear (){
	var list='';
	var data = new Date(),
		year  = data.getFullYear() + 2;
	for (var x=2007;x<year;x++){
		list += "<option value=" + x + '>' + x + '</option>';
	}
	$('#year').html(list);
	selectMonth ();
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
		$('#year').val(2016);
		console.log($('#year').val());
		tableComplete (sala, '/' + year);
	}
	else {
		formInclusion ();
	}
}

function tableForToday (sala){
	cleanTable ();
	dateToday ();
	$('#day').hide();
	$("#pagesAndTable").show();
	var result='';
	var list = table.forToday;
	var lengthMonth = month.toString();
	if (lengthMonth.length==1){
		month = '0' + lengthMonth;
	}
	$.ajax({
		type: "GET",
		url: ip.query + sala + '/' + year + '/' + month + '/' + day + ip.usertest,
		dataType: "html",
		async: false,
		success: function(data) {
	  		result += data;
	  	}
	});
	$('#table').html(list);
	$('.newLine').append(result);
}

function tableComplete (sala,url){
	cleanTable ();
	selectYear ();
	$("#pagesAndTable").show();
	var result='';
	var list = table.complete;
	$.ajax({
		type: "GET",
		url: ip.query + sala + url + ip.usertest,
		dataType: "html",
		async: false,
		success: function(data) {
	  		result += data;
	  	}
	});
	$('#table').html(list);
	$('.newLine').append(result);
}

function formInclusion (){
	$("#pagesAndTable").hide();
	cleanTable ();
}