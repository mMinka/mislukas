Meteor.methods({
	SendSMS: function(valor,channel,text,tipo){
		console.log('entro al metodo de meteor');
		var message = tipo + ' para ' + text;
		if(channel.indexOf("@") != -1){
			Meteor.call("sendEmails",channel,tipo,message);
		}else if(!isNaN(channel)){		
			var data = JSON.stringify({
		      "from": "Wallet.mislukas.com",
		      "to": "57"+channel,
		      "text": message
		    });
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
		}
	},
	addPeople: function(email,firstname,lastname,address,city,country){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var user = People.find({'owner': Meteor.userId()});
    console.log(user.firstname);
    /*
    if(user){
      People.insert({
        owner: Meteor.userId(),
        firstname: firstname,
        lastname: lastname,
        address:
        [{
          addres1: address,
          addres2: address,
          city: city,
          country: country, 
        }],
        channel: 
        [{
          title: email,
          preferred: false,
          verified: true
        }]    
      },function(error, result){
      if(error){
        console.log(error);
      }else{
        console.log(result);
      }
    });
    }else{
      People.insert({
        owner: Meteor.userId(),
        firstname: firstname,
        lastname: lastname,
        address:
        [{
          addres1: address,
          addres2: address,
          city: city,
          country: country, 
        }],
        channel: 
        [{
          title: email,
          preferred: false,
          verified: true
        }]    
      },function(error, result){
        if(error){
          console.log(error);
        }else{
          console.log(result);
        }
      });
    }*/
  }
});