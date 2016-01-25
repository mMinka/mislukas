Template.PassCode.events({
	'submit form': function(e){
		e.preventDefault();
		var code = $('[name=code]').val();
		var user = Session.get('user');
		var loginRequest = {user: user, code: code};
		Meteor.loginWithPasswordless(loginRequest, function(err){
			if(err){
				console.log(err);
			}else{
			FlowRouter.go('home');
			}
		})
	},
	'keyup input': function(event){
	    var userInput = $('[name=code]').val();
	    if(isNaN(userInput)){
	      Session.set('ButtonCode',undefined);
	    }else{
	    	if(userInput.length == 4){
	    		 Session.set('ButtonCode','true');	
	    	}else{
	    		 Session.set('ButtonCode',undefined);
	    	}
	    }
  }
});

Template.PassCode.helpers({
	user: function(){
		return Session.get('user');
	},
	 ButtonCode: function(){
    	return Session.get('ButtonCode');
  	}
	
});