$( function() {
	$( "ul" ).sortable({
	  axis: "y",
	  stop: function( event, ui ) {
	  	console.log('Done Sorting!');
	  	var sortedIDs = $( "ul" ).sortable( "toArray" );
	  	console.log(sortedIDs);
	  	var url = "/profile/reorder_task";
		$.ajax({
           type: "POST",
           url: url,
           data: JSON.stringify(sortedIDs),
           contentType: "application/json",
           success: function(data)
           {
               if(data != "OK"){
               	alert('List reorder Error!');
               }
               else{
               	for(var i = 0; i<$('.task').length; i++){
               		$('.task:eq('+i+')').attr("id",i);
               	}
               }
           }
         });
	  }
	});
	$( "ul" ).disableSelection();
});




$('body').on('click', '.task', function () {
	$(".task").removeClass("active-task");
	$(this).addClass('active-task');
	var url = "/profile/gettask";
	$.ajax({
       type: "POST",
       url: url,
       data: {'id':$(this).attr('id')}, // serializes the form's elements.
       success: function(resp)
       {
       		if(resp!= 'ERR'){
       			console.log(resp);
       			$('.new-form').fadeOut();
				$('.add-task').fadeOut();
				$('.task-info-title').text(resp.title);
				$('.task-info-details').text(resp.details);
				$('.task-info').fadeIn();
				$('.tool-panel').addClass('show-tool-panel');
       		}
			else{
				alert('Error when getting task!')
			}
       }
     });
});

function deleteTask(){
	var elm = $('.active-task');
	var remove_id = $("li").index(elm);
	console.log(remove_id);
	var url = "/profile/deletetask";
	$.ajax({
       type: "POST",
       url: url,
       data: {'id':remove_id}, // serializes the form's elements.
       success: function(resp)
       {
       		console.log(resp);
       		if(resp!= 'ERR'){
       			$('.tool-panel').removeClass('show-tool-panel');
				$('.new-form').fadeOut();
				$('.active-task').fadeOut();
				$(".active-task").remove();
				$('.task-info').fadeOut();
				$('.add-task').fadeIn();
       		}
			else{
				alert('Error when getting task!')
			}
       }
     });
}

function closePropertyPanel(){
	$('.tool-panel').removeClass('show-tool-panel');
	$('.new-form').fadeOut();
	$('.task-info').fadeOut();
	$('.add-task').fadeIn();
}

function showChecklist(){
	document.getElementsByClassName('slider')[0].classList.add("slide-up");
}
function hideChecklist(){
	console.log('removeClass')
	document.getElementsByClassName('slider')[0].classList.remove("slide-up");
}

$('#to-checklist').hover(
	function(){ $('#scroll-down-main').addClass('scroll-down').removeClass('down-default')},
	function(){ $('#scroll-down-main').removeClass('scroll-down').addClass('down-default')}
);
$('#to-main').hover(
	function(){ $('#scroll-up-main').addClass('scroll-down').removeClass('up-default')},
	function(){ $('#scroll-up-main').removeClass('scroll-down').addClass('up-default')}
);