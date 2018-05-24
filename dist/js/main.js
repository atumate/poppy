
$(document).ready(function(){
	var stack = [];
      


	$(".btn-trick, #btn-undo, #btn-redo").on("click", reset_tip);

	$(".btn-trick").on( "click", function() {
		console.log( $(this)[0].id    );
		push_stack($(this)[0].id,stack);



		$('#stack-trick').html( function(){
			console.log(stack);
			var joint='';
			for (var i = 0; i < stack.length; i++) {
				joint = '>' + stack[i] ;
			}

			return joint;
		}

		);

		console.log(stack);
	});

	$("#btn-undo").on("click", function() {
		$("#"+stack.pop()).click();
	});

	$("#btn-redo").on("click", redo);

	$("#base64encode").on("click", base64_encode);
	$("#base64decode").on("click", base64_decode);

	

	$(window).on("error", function(evt) {
		var e = evt.originalEvent; 
		if (e.message) { 
			$('.tip').html(e.message );		 
		} else {
			alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
		}
	});


	test();

});





function redo(stack){
	$("#base64encode").click();
}

function test(){
	$("#base64encode").click();
}


function base64_encode(){
	come = $('#play').val();
	go=btoa(come)
	$('#play').val(go);	
}


function base64_decode(){
	come = $('#play').val();
	go=atob(come)
	$('#play').val(go);	
}


function push_stack(trick,stack){
	stack.push(trick); 
}

function reset_tip(){
	$('.tip').html('');
}

function run(functionName,arguments = NULL ){
	window[functionName](arguments);
}




/* litter */


/*a=$._data($(".base64encode").get(0), "events") */




