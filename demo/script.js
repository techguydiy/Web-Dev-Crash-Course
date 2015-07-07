$(function(){

	// for(i=0;i<=20;i++){
	// 	console.log(i);
	// }

	function doSomething(num1, num2){

		console.log(Number(num1) + Number(num2));

	}

	$("#clickme").click(function(){
		var number1 = $("#number1").val();
		var number2 = $("#number2").val();
		
		doSomething(number1, number2);
	});


	
});