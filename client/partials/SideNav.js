Meteor.subscribe('userData');
Meteor.subscribe("People");

Template.SideNav.onRendered(function() {

    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
});

Template.SideNav.helpers({
  'person': function(){
    var currentUser = Meteor.userId();
        return People.findOne({"owner": currentUser});
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