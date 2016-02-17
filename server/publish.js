Meteor.publish('people', function(){
    return People.find();
});

Meteor.publish('userData',function(){
	return Meteor.users.find();
});

Meteor.publish("images", function(){ 
	return Images.find();
});