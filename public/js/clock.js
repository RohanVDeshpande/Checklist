function getCurrentTime(){
	console.log("Print")
	var d = new Date();
	var output = "";
	var hours = d.getHours();
	if(hours>12){
		hours -= 12;
	}
	else if(hours == 0){
		hours = 12;
	}
	output+= hours;
	output += ":";
	var minutes = d.getMinutes();
	if(minutes<10){
		output+= "0" + minutes;
	}
	else{
		output += minutes;
	}
	if(minutes == 0){
		getGreeting();
	}
	document.getElementsByClassName("time")[0].innerHTML = output;
}

function getGreeting(){
	var name = document.getElementsByClassName("first-name")[0].innerHTML;
	console.log(name);
	var d = new Date();
	var hours = d.getHours();
	var output = "";
	output += "Good ";
	if(hours<12 && hours>3){
		output+= "morning";
	}
	else if(hours<17 &&  hours>3){
		output+= "afternoon";
	}
	else{
		output+= "evening";
	}
	if(name !=""){
		output += ", ";
		output += name;
		output += ".";
	}
	else{
		output+="!";
	}

	document.getElementsByClassName("greeting")[0].innerHTML = output;
}