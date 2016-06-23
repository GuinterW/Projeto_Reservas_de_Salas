<<<<<<< HEAD
<<<<<<< 9c9cc8dd6039c0570ce723772dca24869f766582
<<<<<<< 90b9c99e06b977b01c56077a7de16fc13feb00a2
=======
>>>>>>> logica salas
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
var ip = {
	query: 'http://localhost:9000/search/'
}

//só pra eu saber
/*
date: 'http://localhost:9000/search/sala/ano/mes/dia',
yearAndMonth: 'http://localhost:9000/search/sala/ano/mes',
year: 'http://localhost:9000/search/sala/ano'
*/

<<<<<<< HEAD
<<<<<<< 9c9cc8dd6039c0570ce723772dca24869f766582
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
var table = {
	forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
	complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'
}
<<<<<<< HEAD
=======
var ip;
<<<<<<< 14a1f27177e15aabde17da4ec20b8b85e45731ca
>>>>>>> paginação e layout
=======
=======
>>>>>>> logica salas
var table = {
	forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
	complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'
}
>>>>>>> Identificacao links
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790

$(document).ready(function(){
	start();
	$('.links').click(function(){
<<<<<<< HEAD
<<<<<<< 1ad5e4fdee3cc8abcd804048aefd92943c51dcc9
<<<<<<< 9250cdfaf6bcadbc8cdcb9922f2dfe22a3ba6e34
=======
>>>>>>> salas
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
		$("li[class='active activeRoom']").removeClass("active activeRoom");
		$("li a[id='room1']").parent().addClass("active activeRoom");
		var pagina = $(this).attr('href');
		$("li[class='active mainLinks']").removeClass("active mainLinks");
		$("li a[href='"+pagina+"']").parent().addClass("active mainLinks");
		$('.pages').hide();
		$(pagina).show();
		formTable (1);
<<<<<<< HEAD
<<<<<<< 1ad5e4fdee3cc8abcd804048aefd92943c51dcc9
=======
		var pagina = $(this).attr('href');
		$("li[class='active mainLinks']").removeClass("active mainLinks");
		$("li a[href='"+pagina+"']").parent().addClass("active mainLinks");
		$('.pages').hide();
		$(pagina).show();
<<<<<<< 709c01f8d933912fdc07cc1097795df4c8043720
>>>>>>> pages
=======
>>>>>>> salas
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
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
<<<<<<< HEAD
<<<<<<< 14a1f27177e15aabde17da4ec20b8b85e45731ca
<<<<<<< 90b9c99e06b977b01c56077a7de16fc13feb00a2
	$('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br"
    });
=======
>>>>>>> paginação e layout
=======
	$('.room').click(function(){
		var pagina = $(this).attr('id');
		console.log(pagina);
=======
		formTable ();
	});
	$('.room').click(function(){
		var pagina = $(this).attr('id');
>>>>>>> calendario e formulario
		$("li[class='active activeRoom']").removeClass("active activeRoom");
		$("li a[id='"+pagina+"']").parent().addClass("active activeRoom");
		formTable ();
	});
<<<<<<< 7d700bd1c2de2876e243b502e6d62c6a82728951
<<<<<<< 709c01f8d933912fdc07cc1097795df4c8043720
>>>>>>> Identificacao links
=======
	$('#example1').datepicker({
=======
	$('#calendar').datepicker({
>>>>>>> Formulario layout
        format: "dd/mm/yyyy",
        language: "pt-br"
    });
>>>>>>> calendario e formulario
=======
	$('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br"
    });
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
});

function start (){
	$('.pages').hide();
	$('#forToday').show();
<<<<<<< HEAD
<<<<<<< 1ad5e4fdee3cc8abcd804048aefd92943c51dcc9
<<<<<<< 709c01f8d933912fdc07cc1097795df4c8043720
<<<<<<< 14a1f27177e15aabde17da4ec20b8b85e45731ca
<<<<<<< 90b9c99e06b977b01c56077a7de16fc13feb00a2
	tableForToday (1);
=======
	tableForToday ();
>>>>>>> calendario e formulario
=======
	tableForToday (1);
>>>>>>> salas
=======
	tableForToday (1);
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
}

function cleanTable (){
	$('#table').html('');
	$('.newLine').html('');
<<<<<<< HEAD
<<<<<<< 709c01f8d933912fdc07cc1097795df4c8043720
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
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
		tableComplete (sala);
	}
	else {
		formInclusion ();
	}
}

function tableForToday (sala){
	cleanTable ();
	dateToday ();
	$("#pagesAndTable").show();
	var result='';
	var list = table.forToday;
<<<<<<< HEAD
=======
=======
>>>>>>> calendario e formulario
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
		tableComplete (sala);
	}
	else {
		formInclusion ();
	}
}

function tableForToday (sala){
	cleanTable ();
	dateToday ();
	$("#pagesAndTable").show();
	var result='';
<<<<<<< 709c01f8d933912fdc07cc1097795df4c8043720
	$('.newLine').html('');
>>>>>>> Identificacao links
=======
	var list = table.forToday;
<<<<<<< 7d700bd1c2de2876e243b502e6d62c6a82728951
	cleanTable ();
>>>>>>> calendario e formulario
=======
>>>>>>> Formulario layout
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
	for (x=0;x<10;x++){
		result += '<tr><td>hh:mm</td>';
		result += '<td>hh:mm</td>';
		result += '<td>Pessoa</td>';
		result += '<td>Assunto</td></tr>';
	}
<<<<<<< HEAD
<<<<<<< 709c01f8d933912fdc07cc1097795df4c8043720
<<<<<<< 14a1f27177e15aabde17da4ec20b8b85e45731ca
	$('#table').html(list);
	$('.newLine').append(result);
}

function tableComplete (sala){
	cleanTable ();
	$("#pagesAndTable").show();
	var result='';
	var list = table.complete;
	for (x=0;x<10;x++){
		result += '<tr><td>dd/mm/aaaa</td>';
		result += '<td>hh:mm</td>';
		result += '<td>hh:mm</td>';
		result += '<td>Pessoa</td>';
		result += '<td>Assunto</td></tr>';
	}
	$('#table').html(list);
	$('.newLine').append(result);
}

function formInclusion (){
	$("#pagesAndTable").hide();
	cleanTable ();
}

function dateToday (){
	var data = new Date(),
        day  = data.getDate(),
        month  = data.getMonth() + 1,
        year  = data.getFullYear();
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i>' + [day, month, year].join('/');
   	$('#dateToday').html(dateComplete);
=======
>>>>>>> paginação e layout
}
=======
	$('.newLine').append(result);*/
}
>>>>>>> Identificacao links
=======
=======
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
	$('#table').html(list);
	$('.newLine').append(result);
}

function tableComplete (sala){
	cleanTable ();
	$("#pagesAndTable").show();
	var result='';
	var list = table.complete;
	for (x=0;x<10;x++){
		result += '<tr><td>dd/mm/aaaa</td>';
		result += '<td>hh:mm</td>';
		result += '<td>hh:mm</td>';
		result += '<td>Pessoa</td>';
		result += '<td>Assunto</td></tr>';
	}
	$('#table').html(list);
	$('.newLine').append(result);
}

function formInclusion (){
	$("#pagesAndTable").hide();
	cleanTable ();
}
<<<<<<< HEAD
<<<<<<< fd5c1d1ef3a6c7eee4afb4a95c03166d728b17d2
>>>>>>> calendario e formulario
=======

function dateToday (){
	var data = new Date(),
<<<<<<< 9c9cc8dd6039c0570ce723772dca24869f766582
        dia  = data.getDate(),
        mes  = data.getMonth() + 1,
        ano  = data.getFullYear();
    var dateComplete= [dia, mes, ano].join('/');
   	$('#forToday').html(dateComplete);
}
>>>>>>> Data do dia
=======
=======

function dateToday (){
	var data = new Date(),
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
        day  = data.getDate(),
        month  = data.getMonth() + 1,
        year  = data.getFullYear();
    var dateComplete= '<i class="fa fa-calendar" aria-hidden="true"></i>' + [day, month, year].join('/');
   	$('#dateToday').html(dateComplete);
<<<<<<< HEAD
}
>>>>>>> logica salas
=======
}
>>>>>>> 2233d2a4461635cd9aeb237f49cbfd51c914f790
