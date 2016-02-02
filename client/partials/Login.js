Template.Login.events({
	'submit form': function(event){
		event.preventDefault();
    var userInput = $('[name=user]').val();
    console.log(userInput);
    Session.set('user', userInput);
    
    Meteor.sendVerificationCode(userInput,function(err){
      if(err){
        console.log('entro en el error')
        console.log(err);
      }else
      {
        console.log('se envio el correo');
        FlowRouter.go('passcode');
      }
    });
	},
  'click #facebook-login': function(event) {
    event.preventDefault();
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }else{
              FlowRouter.go('home');
            }
        });
    },
  'keyup input[type=text]': function(event){
    var userInput = $('[name=user]').val();
    if(userInput.indexOf("@") == -1){
      Session.set('ButtonLogin',undefined)
    }else{
      Session.set('ButtonLogin','true');
    }
  },
  'change input[type=text]': function(event){
    var userInput = $('[name=user]').val();
    if(userInput.indexOf("@") == -1){
      Session.set('ButtonLogin',undefined)
    }else{
      Session.set('ButtonLogin','true');
    }
  }
});

Template.Login.helpers({
  sessionUser: function(){
    if(Session.get('user')){
      return Session.get('user');
    }else{
      return false;
    }
  },
  ButtonLogin: function(){
    return Session.get('ButtonLogin');
  }
});



