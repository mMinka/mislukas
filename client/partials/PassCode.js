Meteor.subscribe('people');
Meteor.subscribe('userData');

Template.PassCode.events({
	'submit form': function(e){
		e.preventDefault();
		var code = $('[name=code]').val();
		var phone = Session.get('user');
		//console.log(user);
		var loginRequest = {phone: phone, code: code};
		Meteor.loginWithSms(loginRequest,function(err,result){
			if(err){
				console.log(err);
			}else{
				Session.set('ButtonCode',undefined);
				var _iduser = Meteor.userId();
				HTTP.call('GET','http://api.minka.io:8081/api/person/meteor/'+_iduser,{
			        headers:{
								"Access-Control-Allow-Origin": "*"
			        }
			      }, function( error, response ) {
			      if ( error ) {
			        console.log(error);
			      }else{
							if(response.data){
								FlowRouter.go('home');
							}else{
								FlowRouter.go('settings');
							}
			      }
			  });
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
  	},
  	errorCode: function(){
    if(Session.get('ErrorCode')){
      return Session.get('ErrorCode');
    }else{
      return false;
    }
  }

});
