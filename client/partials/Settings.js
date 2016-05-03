Meteor.subscribe('userData');
Template.Settings.events({
	'submit form': function(e){
		e.preventDefault();
		var firstname = $('[name=firstname]').val();
    	var lastname = $('[name=lastname]').val();
    	var channel = $('[name=channel]').val();
    	var userChannel = Meteor.user().phone;
    	var usuarioID = Meteor.userId();
			var city = $('[name=city]').val();
			var country = $('[name=country]').val();
			var address = $('[name=address]').val();
    	Meteor.call('addPeople',firstname,lastname,channel,userChannel,usuarioID,city,country,address);
    	FlowRouter.go('home');
	}
});
