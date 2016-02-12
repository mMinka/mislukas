
Template.WalletSend.events({
	'click #pedir': function(event){
		event.preventDefault();
		var valor = $('[name=monto]').val();
		var channel = $('[name=channel]').val();
		var text = $('[name=text]').val();
		var tipo = 'Te pidieron '+ valor +' luk';
		Meteor.call('SendSMS',valor,channel,text,tipo);
	},
	'click #enviar': function(event){
		event.preventDefault();
		var valor = $('[name=monto]').val();
		var channel = $('[name=channel]').val();
		var text = $('[name=text]').val();
		var tipo = 'Te enviaron '+ valor +' luk';
		Meteor.call('SendSMS',valor,channel,text,tipo);
	}
});

