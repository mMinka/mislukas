Meteor.methods({
	sendEmails: function(to,subject,text){
      //check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: 'wallet.mislukas.com Accounts <no-reply@mislukas.com>',
        subject: subject,
        text: text
      });
  },
	addPeople: function(firstname,lastname,channel,userChannel,usuarioID,city,country,address){
		HTTP.call('POST','http://api.minka.io:8081/api/person', {
	        data:{
						"owner": usuarioID,
	          "firstname": firstname,
	          "lastname": lastname,
	          "email": channel,
						"phone": userChannel,
						"address": address,
						"city": city,
						"country": country
	        }
	      }, function(error) {
	        if ( error ) {
	          console.log(error);
	        }
	    });
			/*
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
		*/
  },
	updatePeople: function(email,phone,firstname,lastname,address,city,country,usuarioID){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
		var currentUser = Meteor.userId();
    var apiUrl = "http://api.minka.io:8081/api/person/meteor/"+currentUser;
		HTTP.call( 'GET', apiUrl, {}, function( error, response ) {
		  if ( error ) {
		    console.log( error );
		  } else {
				HTTP.call('PUT',apiUrl, {
			        data:{
			          "firstname": firstname,
			          "lastname": lastname,
			          "email": email,
								"phone": phone,
								"address": address,
								"city": city,
								"country": country
			        }
			      }, function( error, response ) {
			        if ( error ) {
			          Bert.alert('Se ha producido un error','danger','growl-top-right');
			        } else {
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
		});
  },
	SendSMS: function(valor,channel,text,tipo){
		var message = tipo + ' para ' + text + 'al usuario ' + channel;
    var notification = "Se ha enviado con exito: " + message;
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
		var currentUser = Meteor.userId();
    var apiUrl = "http://api.minka.io:8081/api/person/meteor/"+currentUser;
		HTTP.call( 'GET', apiUrl, {}, function( error, person ) {
		  if ( error ) {
				console.log(error);
			}else{
				var transUrl = 'http://api.minka.io:8081/api/transaction/'+channel;
				HTTP.call('POST',transUrl, {
		      data:{
						"amount": valor,
		        "phone1": person.data.phone
		      }
		  		},function( error, response ) {
		      if ( error ) {
		        console.log(error);
		      }else{
		        Bert.alert(notification,'success','growl-top-right');
		      }
		  	});
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
		});
	}
});
