/*
1. event add order is vital, ele's bind order relu on it


*/

$(document).ready(function(){
	var stack_undo = [];
	var stack_redo = [];
	var stack_play = [];

	$(".btn-trick").on( "click", function(e) {
		push_stack($(this)[0].id,stack_undo);
		push_stack($('#play').val(),stack_play);

		if(e.hasOwnProperty('originalEvent')){
			stack_redo = [];
		}

	});


	$("#btn-undo").on("click", function() {
		last_trick=stack_undo.pop();
		last_play=stack_play.pop(); 
		stack_redo.push(last_trick);
		$('#play').val(last_play);
	});

	$("#btn-redo").on("click",function() {
		next_trick=stack_redo.pop();
		$("#"+next_trick).click();
	});


	$("#base64encode").on("click", base64_encode);
	$("#base64decode").on("click", base64_decode);

	

	$(window).on("error", function(evt) {
		var e = evt.originalEvent; 
		if (e.message) { 
			$('.tip').html(e.message );		
			stack_undo.pop()
			stack_play.pop() 
			init_view();
		} else {
			alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
		}
	});



	$(".btn").on("click", function() {
		empty_tip();

		$('#stack-trick').html( function(){
			var joint='origin';
			for (var i = 0; i < stack_undo.length; i++) {
				joint = joint + '>' + stack_undo[i] + ' ' ;
			}
			return joint;
		});
		
		init_view();
	});



	init_view=function(){	
		$("#btn-reset").attr("disabled", 
			(stack_redo.length || stack_play.length)?false:true);
		$("#btn-origin").attr("disabled", stack_undo.length?false:true);
		$("#btn-undo").attr("disabled", stack_undo.length?false:true);
		$("#btn-redo").attr("disabled", stack_redo.length?false:true);
	}

	reset=function(){
		stack_undo = [];
		stack_redo = [];
		stack_play = [];
		$("#btn-fake").click();
		$("#play").val('');
		$("#stack-trick").html('');
	}

	origin=function(){

		while(stack_undo.length){
			$("#btn-undo").click();
		}
	}


	$("#btn-reset").on("click", reset);
	$("#btn-origin").on("click", origin);
	init_view();

	//test();


});












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


function push_stack(ele,stack){
	stack.push(ele); 
}

function empty_tip(){
	$('.tip').html('');
}

function run(functionName,arguments = NULL ){
	window[functionName](arguments);
}




/* litter */


/*a=$._data($(".base64encode").get(0), "events") */




