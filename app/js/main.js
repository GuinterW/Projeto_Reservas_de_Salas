$(document).ready(function(){
	$('.links').click(function(){
		$('#listMeetings').hide();
		$('#includeReservation').hide();
		var pagina = $(this).attr('href');
		console.log(pagina);
	});
});