$( document ).ready(function() {
    $('.background').css("background-image", "url(../images/Backgrounds/"+Math.floor((Math.random() * 11) + 1)+".jpg)");
    setInterval(changeImage,10000);
});

function changeImage(){
	var ANIMATE_TIME = 1000;

	$('.background').animate({opacity:0},{duration:ANIMATE_TIME});
	setTimeout(function(){
		var path ="url(../images/Backgrounds/"+Math.floor((Math.random() * 11) + 1)+".jpg)";
		$('.background').css("background-image", path);
		$('.background').animate({opacity:1},{duration:ANIMATE_TIME});
	},ANIMATE_TIME);
}