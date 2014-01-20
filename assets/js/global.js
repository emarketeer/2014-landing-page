$(document).ready(function(){
	
	
	//Sync the contact forms.
	$("[data-rel=contact-input]").keyup(function(){
		
		var val = $(this).val();		
		var attr = $(this).attr("data-id");
		
		$("[data-id=" + attr + "]").each( function(){
			if ( $(this).val() != val ) {
				$(this).val( val );
			}
		} );
		
	});
	
	$("#scrollup-container").click(function(e){
		e.preventDefault();
		
		$('html,body').animate({
			scrollTop: 0
        }, 300);
		
	});
	
});

$(window).scroll(function(){
	
	var top = $(document).scrollTop();
	var width = $(window).width();
	
	if ( top > 50) {
		//Is the thing visible?
		if (! $("#scrollup-container").is(":visible") ) {
			$("#scrollup-container").fadeIn(500);
		}
	} else {
		//Is the thing visible?
		if ( $("#scrollup-container").is(":visible") ) {
			$("#scrollup-container").fadeOut(500);
		}
	}
	
});