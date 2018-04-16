function formSave(){

	var url = "/profile/newtask";
	$.ajax({
       type: "POST",
       url: url,
       data: $('#form-new').serialize(), // serializes the form's elements.
       success: function(data)
       {
           if(data != 'success'){
           	alert("Error Saving Task...Try Again!");
           }
           else{
           	$('.new-form').fadeOut();
           	$('.add-task').fadeIn();
           	displayNewTask($('.input-title').val());
           	document.getElementById("form-new").reset();
           }
       }
     });
	return false; // avoid to execute the actual submit of the form.s
}

function displayNewTask(title){
	var current = "";
	current = $('.task-list').html();
	var add = '<li id="'+$('.task').length+'" class="task">'+ title+ '</li>';
	$('.task-list').html(add + current);
	$(".task").removeClass("active-task");
	$(".task").first().addClass("active-task");
}

function formReset(){
	document.getElementById("form-new").reset();
	$('.new-form').fadeOut();
	$('.add-task').fadeIn();
}
function newTask(){
	$('.add-task').fadeOut();
	$('.new-form').fadeIn();
}

