Accounts.sms = {};
var codes = new Mongo.Collection('meteor_accounts_sms');

Meteor.methods({
  'accounts-sms.sendVerificationCode': function (phone) {
    check(phone, String);

    return Accounts.sms.sendVerificationCode(phone);
  }
});

// Handler to login with a phone number and code.
Accounts.registerLoginHandler('sms', function (options) {
  //if (!options.sms) return;

  check(options, {
    phone: String,
    code: String
  });

  return Accounts.sms.verifyCode(options.phone, options.code);
});

/**
 * Send a 4 digit verification sms with twilio.
 * @param phone
 */
Accounts.sms.sendVerificationCode = function (phone) {

  var code = Math.floor(Random.fraction() * 10000) + '';

  code = ('0000' + code).slice(-4);
  // Clear out existing codes
  codes.remove({phone: phone});

  // Generate a new code.
  var nuevo = codes.insert({phone: phone, code: code});
  console.log(nuevo)

  console.log(phone);
  console.log(code);
  HTTP.call('POST','https://api.infobip.com/sms/1/text/single', {
        headers:{
          "content-type": "application/json",
          "authorization": "Basic UGxheU1pbmsyMTpYbHM4c21zMzQ=",
        },
        data:{
          "from": "Wallet.mislukas.com",
          "to": phone,
          "text": 'Tu codigo de verificacion para wallet.mislukas.com es ' + code
        }
      }, function( error, response ) {
        if ( error ) {
          console.log( error );
        } else {
          console.log( response );
        }
    });
  var user = Meteor.users.findOne({phone: phone});
  if(!user){
    console.log('el usuario no existe')
    userId = Meteor.users.insert({phone: phone});
    console.log(userId);

  }
};

/**
 * Send a 4 digit verification sms.
 * @param phone
 * @param code
 */
Accounts.sms.verifyCode = function (phone, code) {
  console.log(phone)
  console.log(code)
  var user = Meteor.users.findOne({phone: phone});
  console.log('si encuentra el usuario imprime esto')
  console.log(user._id)
  console.log(user.phone)
  if (!user) throw new Meteor.Error('Invalid phone number');

  var validCode = codes.find({phone: phone, code: code});
  if (!validCode) throw new Meteor.Error('Invalid verification code');
  var uid;
  uid = user._id;
  // Clear the verification code after a succesful login.
  console.log('el usuario existe con id ' + uid);
  codes.remove({phone: phone});
  return { userId: uid };
};
