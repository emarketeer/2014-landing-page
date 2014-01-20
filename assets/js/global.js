$(document).ready(function(){
	
	//Protect the email address from spam, by only displaying it when javascript is executed.
	email_address = "info@emarketeer.com.au";

	$("[data-rel=email]").each(function(){
		$(this).attr("href", "mailto: " + email_address);
		$(this).html(email_address);
	});
	
	//Sync the contact forms.
	$("[data-input=true]").keyup(function(){
		
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
	
	$("#form-submit-footer").click(function(e){
		e.preventDefault();
		docontact();
	});

	$("#docontact").on('submit', function(e){
		e.preventDefault();
		docontact();
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

function docontact() {
	
	//Process to contact form.
	//Check fields.
	
	var passed = 1;
	var errormsg = "";
	
	$("#docontact [data-required=true]").each(function(){
		
		var value = $(this).val();
		var place = $(this).attr("placeholder");
		if ( value ) {
			if ( value != place ) {
				//All good.
			} else {
				passed = 0;
			}
		} else {
			passed = 0;
		}
		
		if ( passed === 0 ) {
			var field = $(this).attr("data-id");
			var thiss = $("[data-id=" + field + "]");
			$(thiss).addClass("animated shake missing");
			window.setTimeout(function(){
				$(thiss).removeClass("animated shake missing");
			},1000);
		}
		
		
	});
	
	if ( passed === 1 ) {
		
		//Send the form.
		dosendform();
		
	}
	
}

function dosendform() {
	
	var thedata = $("#docontact").serialize();
	
	$("#loading").fadeIn(500);	
	window.setTimeout(function(){
		endload();
	},15000);
	
	//Post the ajax request.
	$.ajax({
		type: "POST",
		url: "ajax-post.php",
		data: thedata		
	}).done(function( data ) {
		
		if ( data === "1" ) {
			//Success
			contactmsg = "Thanks, your booking request has been sent. We'll be in touch shortly!";
		} else {
			//Failure
			contactmsg = "Sorry, it looks like there was a problem delivering your message. Please email us directly at info@emarketeer.com.au.";
		}
		
		window.setTimeout(function(){
			endmsg(contactmsg);
		}, 750);
		
	});
	
}

function endmsg(msg) {
	
	endload();
	
	
	$("[data-rel=form-container]").fadeTo(300, 0, function(){
			
		$(this).html( "<p>" + msg + "</p>" );
		$(this).fadeTo(300, 1);
			
	});
	
}

function endload() {
	$("#loading").fadeOut(500);
}
