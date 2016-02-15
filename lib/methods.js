

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
	updatePeople: function(email,phone,firstname,lastname,address,city,country,usuarioID){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var user = People.findOne({"owner": usuarioID});
    if(user){
      People.update({"owner": usuarioID},
        {$set:
          {
            firstname: firstname,
            lastname: lastname,
            address1: address,
            address2: address,
            city: city,
            country: country, 
            email: email,
            phone: phone
          },    
        },function(error, result){
        if(error){
          console.log(error);
        }else{
          console.log(result);
        }     
      });
    }
  },
  addPeople: function(firstname,lastname,channel,userChannel,usuarioID){
    People.insert({
      owner: usuarioID,
      firstname: firstname,
      lastname: lastname,
      email: userChannel,
      phone: channel,
    },function(error, result){
        if(error){
          console.log(error);
        }else{
          console.log(result);
        }
    });
  }
});