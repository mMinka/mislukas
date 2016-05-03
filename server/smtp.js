Meteor.startup(function(){
    var login = "postmaster%40sandbox607a735d8eab47b1be611da63a7ec5be.mailgun.org";
    var password = "mminka1234";
    var domain = "smtp.mailgun.org";
    var port = 2525;

    process.env.MAIL_URL = "smtp://" + login + ":" + password + "@" + domain + ":" + port;

/*
    Meteor.users.remove({});
    People.remove({});
    Images.remove({});*/

});
