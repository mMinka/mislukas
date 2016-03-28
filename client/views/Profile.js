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
    var digito1 = phone.charAt(0);
    var digito2 = phone.charAt(1);
    console.log(digito1);
    console.log(digito2);
    if(phone.length == 12){
      if(digito1 != 5 || digito2 != 7){
        Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
        return;
      }
    }else{
      if(phone.length == 10){
        if(digito1 != 3){
          Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
          return;
        }else{
          phone = "57"+phone;
        }
      }else{
        Bert.alert('El numero esta mal, intentalo de nuevo','danger','fixed-top');
        return;
      }
    }
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