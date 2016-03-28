

Meteor.methods({
	SendSMS: function(valor,channel,text,tipo){
		var message = tipo + ' para ' + text;
    var notification = "Se ha enviado con exito: " + message;
		if(channel.indexOf("@") != -1){
			Meteor.call("sendEmails",channel,tipo,message,function(error,result){
        if(error){
          Bert.alert('Se ha producido un error','danger','growl-top-right');
        }else{
          Bert.alert(notification,'success','growl-top-right');
        }
      });
		}else if(!isNaN(channel)){	
      var digito1 = channel.charAt(0);
      var digito2 = channel.charAt(1);
      if(channel.length == 12){
        if(digito1 != 5 || digito2 != 7){
          Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
          return;
        }
      }else{
        if(channel.length == 10){
          if(digito1 != 3){
            Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
            return;
          }else{
            channel = "57"+channel;
          }
        }else{
          Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
          return;
        }
      }
			var data = JSON.stringify({
		      "from": "Wallet.mislukas.com",
		      "to": channel,
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
              Bert.alert(notification,'success','growl-top-right');
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
            address2: address,
            lastname: lastname,
            address1: address,
            city: city,
            country: country, 
            email: email,
            phone: phone
          },    
        },function(error, result){
        if(error){
          Bert.alert('Se ha producido un error','danger','growl-top-right');
        }else{
          Bert.alert('Se han editado los datos con exito','success','growl-top-right');
        }     
      });
      Meteor.users.update(
      {"_id": usuarioID},
        {$set:
          {
            phone: phone
          },    
        },function(error, result){
        if(error){
          Bert.alert('Se ha producido un error','danger','growl-top-right');
        }else{
          Bert.alert('Se han editado los datos con exito','success','growl-top-right');
        }     
      });
    }
  },
  addPeople: function(firstname,lastname,channel,userChannel,usuarioID){
    People.insert({
      owner: usuarioID,
      firstname: firstname,
      lastname: lastname,
      email: channel,
      phone: userChannel,
    },function(error, result){
        if(error){
          console.log(error);
        }else{
          console.log(result);
        }
    });
  }
});