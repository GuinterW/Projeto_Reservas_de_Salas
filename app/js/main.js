var ip;
var table = {
	forToday: '<table class="table table-bordered table-striped"><thead><tr><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>',
	complete: '<table class="table table-bordered table-striped"><thead><tr><th>Data</th><th>Início</th><th>Término</th><th>Responsável</th><th>Pauta</th></tr></thead><tbody class="newLine"></tbody></table>'
}

$(document).ready(function(){
	start();
	$('.links').click(function(){
		var pagina = $(this).attr('href');
		$("li[class='active mainLinks']").removeClass("active mainLinks");
		$("li a[href='"+pagina+"']").parent().addClass("active mainLinks");
		$('.pages').hide();
		$(pagina).show();
		formTable ();
	});
	$('.room').click(function(){
		var pagina = $(this).attr('id');
		$("li[class='active activeRoom']").removeClass("active activeRoom");
		$("li a[id='"+pagina+"']").parent().addClass("active activeRoom");
		formTable ();
	});
	$('#repeat').click(function(){
		console.log('checkeddd');
		$("#myModal").modal();
	});
	$('#calendar').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-br"
    });
});

function start (){
	$('.pages').hide();
	$('#forToday').show();
	tableForToday ();
}

function cleanTable (){
	$('#table').html('');
	$('.newLine').html('');
}

function formTable (){
	var pagina = $("li[class='active mainLinks'] a").attr('href');
	if (pagina=='#forToday'){
		tableForToday ();
	}
	else if (pagina=='#listMeetings'){
		tableComplete ();
	}
	else {
		formInclusion ();
	}
}

function tableForToday (){
	cleanTable ();
	$("#pagesAndTable").show();
	var result='';
	var list = table.forToday;
	for (x=0;x<10;x++){
		result += '<tr><td>hh:mm</td>';
		result += '<td>hh:mm</td>';
		result += '<td>Pessoa</td>';
		result += '<td>Assunto</td></tr>';
	}
	$('#table').html(list);
	$('.newLine').append(result);
}

function tableComplete (){
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