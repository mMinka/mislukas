Meteor.publish('people', function(){
    return People.find();
});

Meteor.methods({
  addPeople: function(email,firstname,lastname,address,city,country){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var email = People.find({'owner': Meteor.userId()});
    if(email){
      People.update({owner: Meteor.userId()},
        {$set: {
          firstname: firstname,
          lastname: lastname,
          createdAt: new Date(),
          address: {
            addres1: address,
            addres1: address,
            city: city,
            country: country, 
          },
          channel: {
            title: email
          }
        }
    });
    }else{
    People.insert({
      owner: Meteor.userId(),
      firstname: firstname,
      lastname: lastname,
      createdAt: new Date(),
      address: {
        address1: address,
        address2: address,
        city: city,
        country: country, 
      },
      channel: {
      	title: email
      }
    });
    }
  }
});