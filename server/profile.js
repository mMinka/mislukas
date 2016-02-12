/*
Meteor.publish('people', function(){
    return People.find();
});


Meteor.publish('userData',function(){
  return Meteor.users.find();
});

Meteor.methods({
  addPeople: function(email,firstname,lastname,address,city,country){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var user = People.find({'owner': Meteor.userId()});
    console.log(user);
    console.log(Meteor.userId());
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
    }
  }
});
*/