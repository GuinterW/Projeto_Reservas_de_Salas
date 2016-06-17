$(document).ready(function(){
	$('.links').click(function(){
		var pagina = $(this).attr('href');
		console.log(pagina);
		$('.pages').hide();
		$(pagina).show();
	});
});