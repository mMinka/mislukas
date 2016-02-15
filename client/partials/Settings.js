
Template.Settings.events({
	'submit form': function(e){
		e.preventDefault();
		var firstname = $('[name=firstname]').val();
    	var lastname = $('[name=lastname]').val();
    	var channel = $('[name=channel]').val();
    	var userChannel = Meteor.user().emails[0].address;
    	var usuarioID = Meteor.userId();
    	Meteor.call('addPeople',firstname,lastname,channel,userChannel,usuarioID);
    	FlowRouter.go('home');
	}
});