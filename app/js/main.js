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
	});
	$('.room').click(function(){
		var pagina = $(this).attr('id');
		console.log(pagina);
		$("li[class='active activeRoom']").removeClass("active activeRoom");
		$("li a[id='"+pagina+"']").parent().addClass("active activeRoom");
		formTable ();
	});
});

function start (){
	$('.pages').hide();
	$('#forToday').show();
}

function formTable (){
	var pagina = $("li[class='active mainLinks'] a").attr('href');
	console.log(pagina);
	/*if (pagina=='#forToday'){
		console.log('hojeeeee');
	}
	else console.log ('outrooo');
	var result='';
	$('.newLine').html('');
	for (x=0;x<10;x++){
		result += '<tr><td>hh:mm</td>';
		result += '<td>hh:mm</td>';
		result += '<td>Pessoa</td>';
		result += '<td>Assunto</td></tr>';
	}
	$('.newLine').append(result);*/
}
