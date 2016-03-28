
Template.WalletSend.events({
	'click #pedir': function(event){
		event.preventDefault();
		var valor = $('[name=monto]').val();
		var channel = $('[name=channel]').val();
		var text = $('[name=text]').val();
		var tipo = 'Te pidieron '+ valor +' luk';
		if(!isNaN(channel)){
			var digito1 = channel.charAt(0);
      		var digito2 = channel.charAt(1);
      		if(digito1 != 5 && digito2 != 7){
        		if(digito1 != 3){
          			Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
          			$('[name=channel]').val('');
          			return;
        		}else{
          			channel = "57"+channel;
        		}
      		}
		}
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
		if(!isNaN(channel)){
			var digito1 = channel.charAt(0);
      		var digito2 = channel.charAt(1);
      		if(digito1 != 5 && digito2 != 7){
        		if(digito1 != 3){
          			Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
          			$('[name=channel]').val('');
          			return;
        		}else{
          			channel = "57"+channel;
        		}
      		}
      		console.log(channel)
		}
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

