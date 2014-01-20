$(document).ready(function(){

	swap_active = 0;

	testimonials = new Array;

	$(".testimonial").each(function(){
		testimonials.push( $(this) );
	});
	
	active_slide = 0;
	max_slides = testimonials.length;
	
	for ( i=1; i < max_slides; i++) {
		$(testimonials[i]).hide();
		//Add the buttons.
	}
	
	for ( i=0; i < max_slides; i++ ) {
		$("#testimonial-control").append( '<a href="#" data-rel="slide-control" data-id="control_' + i + '">•</a>' );
	}
	
	//Activate the first dot.
	activate_dot(0);
	
});

$(document).on('click', '[data-rel=slide-control]', function(e){
	e.preventDefault();
	
	if ( swap_active === 0 ) {
		var id = $(this).attr("data-id").replace(/[^0-9]/g, "");
		swapslides( id );
	}
	
});

function swapslides( id ) {
	
	if (! id ) {
		id = "no";
	}
	
	swap_active = 1;
	
	if ( id === "no" ) {	
		next_slide = active_slide + 1;
		if ( next_slide >= max_slides ) {
			next_slide = 0;
		}
	} else {
		next_slide = id;
	}
	
	//Swap them.
	$( testimonials[active_slide] ).fadeOut(300, function(){
		activate_dot(next_slide);
		$( testimonials[next_slide] ).fadeIn(300);
		active_slide = next_slide;
		swap_active = 0;
	});

	
}

function activate_dot(id) {
	
	$("[data-rel=slide-control]").removeClass("active");
	$("[data-id=control_" + id + "]").addClass("active");
	
}