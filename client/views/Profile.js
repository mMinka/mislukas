Meteor.subscribe('people');
Meteor.subscribe('userData');
Meteor.subscribe('images');

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
  },
  "change .file": function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        var file = $('.file').get(0).files[0];
        Images.insert(file,function (err, fileObj) {
          if (err){
             // handle error
             console.log(error);
          } else {
             // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = {
              "profile.image": fileObj._id
            };
            Meteor.users.update(userId, {$set: imagesURL});
            //console.log(profile.image);
            Bert.alert('Se ha actualizado tu photo','success','growl-top-right');
          }
        });
        console.log('Upload result: ', fileObj);
      });
  }
});

Template.Profile.helpers({
  'person': function(){
    var currentUser = Meteor.userId();
        return People.findOne({"owner": currentUser});
  }
});