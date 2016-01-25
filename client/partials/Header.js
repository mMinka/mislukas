// Handling responsive layout
Template.Header.events({
    'click .hide-menu': function (event) {
        event.preventDefault();

        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    },
    //logout user - click
    'click .dropdown-logout': function (event){
      event.preventDefault();
      
      if (Meteor.userId()){
          Meteor.logout();
      }
    },
    'click .mobile-menu-logout': function (event){
      event.preventDefault();
      
      if (Meteor.userId()){
          Meteor.logout();
      }
    },
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
    }
});