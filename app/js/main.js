var ip;

$(document).ready(function(){
	start();
	$('.links').click(function(){
		var pagina = $(this).attr('href');
		$("li[class='active oi']").removeClass("active oi");
		$("li a[href='"+pagina+"']").parent().addClass("active oi");
    	//$("li .links[href="+pagina+"]").parent().addClass("active");
		$('.pages').hide();
		$(pagina).show();
	});
});

function start (){
	$('.pages').hide();
	$('#forToday').show();
}