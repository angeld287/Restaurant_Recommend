$(function(){
	
	$.validator.addMethod('strongPassword', function(value, element){
		return this.optional(element) || value.length >=6 && /\d/.test(value) && /[a-z]/i.test(value);
	}, 'El password debe tener: almenos un numero, almenos una letra y mas de 6 caracteres.');
	
	
	$("#registrationForm").validate({
		rules:{
			name:{
				required: true,
				remote: "http://localhost/rest_recomm_service/database/user_management/checkUser.php"
			},
			email:{
				required:true,
				email:true,
				remote: "http://localhost/rest_recomm_service/database/user_management/checkEmail.php"
			},
			password: {
				required: true,
				strongPassword: true
			},
			password_validation:{
				required: true,
				equalTo: "#password"
			}
		},
		messages:{
			email:{
				required: 'este campo es requerido',
				email: 'digite el correo de forma correcta',
				remote: 'Is already associated with an account'
			},
			name:{
				required: 'este campo es requerido',
				remote: 'Este nombre ya existe'
			}
		}
	});
});

$(document).ready(function(){
	$( "#registrationForm" ).submit(function( event ) {
		if($(this).valid()) {
		       //go ahead
			var name=$("#name").val();
			var email=$("#email").val();
			var password=$("#password").val();
			
			var dataString="name="+name+"&email="+email+"&password="+password+"&insert=";
			
					$.ajax({
		   	   		 type: "POST",
		   	   		 url: "http://localhost/rest_recomm_service/database/user_management/register.php",
		   	   		 data: dataString,
		   	   		 crossDomain: true,
		   	   		 cache: false,
		   	   		 beforeSend: function(){ $("#submit-button").val('Connecting...');},
		   	   		 success: function(data){
		   	   			 if(data=="success"){
		   	   				 	window.location.replace("../UC002-login/login_bootstrap.html");
		   	   				 }
		   	   				 else if(data=="error"){
		   	   					 alert("error");
		   	   				 }
		   	   			 }
		   	   		 });
		    } else {
		       //do some error handling
		    	//alert("Somethink is wrong");
		    }
	});
});