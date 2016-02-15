Meteor.subscribe("People");

Template.Login.events({
	'submit form': function(event){
		event.preventDefault();
    var userInput = $('[name=user]').val();
    console.log(userInput);
    Session.set('user', userInput);
    var data = JSON.stringify({
      "from": "InfoSMS",
      "to": userInput,
      "text": "Test SMS."
    });
      /*
      $.ajax({
        type: "POST",
        url: 'https://api.infobip.com/sms/1/text/single',
        headers: {
          "authorization": "Basic UGxheU1pbmsyMTpYbHM4c21zMzQ=",
          "content-type": "application/json",
        },
        data: data,
        success: function(data){
          console.log(data.messages);
        },
        dataType: 'json'
      });

      $.ajax({
        type: "GET",
        url: 'https://api.infobip.com/sms/1/reports',
        headers: {
          "authorization": "Basic UGxheU1pbmsyMTpYbHM4c21zMzQ=",
          "content-type": "application/json",
        },
        //data: data,
        success: function(data){
          console.log(data.results);
        },
        dataType: 'json'
      });*/
      
    
    Meteor.sendVerificationCode(userInput,function(err){
      if(err){
        Session.set('ErrorLogin','true');
        Session.set('ButtonLogin',undefined);
        $('[name=user]').val('');
        console.log(err);
      }else
      {
        Session.set('ButtonLogin',undefined);
        Session.set('ErrorLogin',undefined);
        FlowRouter.go('passcode');
      }
    });
    
	},
  'click #facebook-login': function(event) {
    event.preventDefault();
        Meteor.loginWithFacebook({}, function(err,result){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
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
  },
  errorLogin: function(){
    if(Session.get('ErrorLogin')){
      return Session.get('ErrorLogin');
    }else{
      return false;
    }
  }
});



