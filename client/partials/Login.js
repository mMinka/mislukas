Meteor.subscribe("People");

Template.Login.events({
	'submit form': function(event){
    console.log(event.which);
    if(event.which == 13){
        return;
    }
    event.preventDefault();
    var userInput = $('[name=user]').val();
    var digito1 = userInput.charAt(0);
    var digito2 = userInput.charAt(1);
    if(userInput.length == 12){
      if(digito1 != 5 || digito2 != 7){
        Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
        return;
      }
    }else{
      if(userInput.length == 10){
        if(digito1 != 3){
          Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
          return;
        }else{
          userInput = "57"+userInput;
        }
      }else{
        Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
        return;
      }
    }
    Session.set('user', userInput);
    Meteor.sendVerificationCode(userInput,function(err){
      if(err){
        Bert.alert('Se ha producido un error','danger','fixed-top');
        Session.set('ButtonLogin',undefined);
        $('[name=user]').val('');
        console.log(err);
      }else
      {
        Session.set('ButtonLogin',undefined);
        console.log(userInput);
        FlowRouter.go('passcode');
      }
    });
	},
  'click #facebook-login': function(event) {
    event.preventDefault();
        Meteor.loginWithFacebook({}, function(err,result){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
                Bert.alert('Se ha producido un error','danger','fixed-top');
            }else{
              var _iduser = Meteor.userId();
              var profile = People.findOne({'owner': _iduser});
              if(profile){
                FlowRouter.go('home');
              }else{
                FlowRouter.go('settings');
              }
            }
        });
    },
  'keyup input[type=text]': function(event){
    console.log(event.which);
    if(event.which == 13){
      console.log(event.which);
        return;
    } else {
      var userInput = $('[name=user]').val();
      if(!isNaN(userInput) && userInput.length == 10 || userInput.length == 12){
        Session.set('ButtonLogin','true')
      }else{
        Session.set('ButtonLogin',undefined);
      }   
    }
  },
  'change input[type=text]': function(event){
    console.log(event.which);
    if(event.which == 13){
        return;
    } else {
      var userInput = $('[name=user]').val();
      if(!isNaN(userInput) && userInput.length == 10){
        Session.set('ButtonLogin','true')
      }else{
        Session.set('ButtonLogin',undefined);
      }
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
  },
  errorLogin: function(){
    if(Session.get('ErrorLogin')){
      return Session.get('ErrorLogin');
    }else{
      return false;
    }
  }
});



