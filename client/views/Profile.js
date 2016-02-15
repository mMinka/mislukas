Meteor.subscribe('people');
Meteor.subscribe('userData');

Template.Profile.events({
  'submit form': function(e){
    e.preventDefault();
    var email = $('[name=email]').val();
    var phone = $('[name=phone]').val();
    var firstname = $('[name=firstname]').val();
    var lastname = $('[name=lastname]').val();
    var address = $('[name=address]').val();
    var city = $('[name=city]').val();
    var country = $('[name=country]').val();
    var usuarioID = Meteor.userId();
    Meteor.call('updatePeople',email,phone,firstname,lastname,address,city,country,usuarioID);
  }
});

Template.Profile.helpers({
  'person': function(){
    var currentUser = Meteor.userId();
        return People.findOne({"owner": currentUser});
  }
});