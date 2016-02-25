Meteor.subscribe('userData');
Meteor.subscribe("People");
Meteor.subscribe("images");

Template.SideNav.onRendered(function() {

    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
});

Template.SideNav.helpers({
  'person': function(){
    var currentUser = Meteor.userId();
        return People.findOne({"owner": currentUser});
  },
  'avatar': function(){
    var imageId = Meteor.user().profile.image;
    if(imageId){
      return Images.find({_id: imageId});
    }else{
      return '';
    }
  },
  userPicHelper: function() {
    if(Meteor.user().services.facebook){
      var id = Meteor.user().services.facebook.id;
      var img = 'http://graph.facebook.com/' + id + '/picture?type=square&height=160&width=160';
      return img;
    }else{
      return '';
    }
  }
});


/*
Template.navigation.events({

    // Colapse menu in mobile mode after click on element
    'click #side-menu a:not([href$="\\#"])': function(){
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        }
    }

});
*/