
Template.WalletSend.events({
	'click #pedir': function(event){
		event.preventDefault();
		var valor = $('[name=monto]').val();
		var channel = $('[name=channel]').val();
		var text = $('[name=text]').val();
		var tipo = 'Te pidieron '+ valor +' luk';
		swal({   
			title: "Estas seguro?",   
			text: "Quieres enviar el mensaje?",   
			type: "info",   
			showCancelButton: true,   
			confirmButtonColor: "#5cb85c",   
			confirmButtonText: "Si, enviar!",   
			cancelButtonText: "No, cancelar!",   
			closeOnConfirm: true,   
			closeOnCancel: false }, 
			function(isConfirm){
			   if (isConfirm){
			   	Meteor.call('SendSMS',valor,channel,text,tipo);
			   	$('[name=monto]').val(''); 
			   	$('[name=channel]').val('');   
			   	$('[name=text]').val('');   
			}else{     
				swal("Cancelado", "El mensaje no fue enviado :)", "error");   
			} 
		});
	},
	'click #enviar': function(event){
		event.preventDefault();
		var valor = $('[name=monto]').val();
		var channel = $('[name=channel]').val();
		var text = $('[name=text]').val();
		var tipo = 'Te enviaron '+ valor +' luk';
		swal({   
			title: "Estas seguro?",   
			text: "Quieres enviar el mensaje?",   
			type: "info",   
			showCancelButton: true,   
			confirmButtonColor: "#5cb85c",   
			confirmButtonText: "Si, enviar!",   
			cancelButtonText: "No, cancelar!",   
			closeOnConfirm: true,   
			closeOnCancel: false }, 
			function(isConfirm){
				if (isConfirm){
				   	Meteor.call('SendSMS',valor,channel,text,tipo);
				   	$('[name=monto]').val(''); 
				   	$('[name=channel]').val('');   
				   	$('[name=text]').val('');   
				}else{     
					swal("Cancelado", "El mensaje no fue enviado :)", "error");   
				}
		});
	}
});

