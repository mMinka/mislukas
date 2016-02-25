/**
 * Login with a phone number and verification code.
 * @param phone The phone number.
 * @param code The verification code.
 * @param [callback]
 */
Meteor.loginWithSms = function (options, callback) {
  console.log('credentials', options);
  Accounts.callLoginMethod({
    methodArguments: [{
      //sms: true,
      phone: options.phone,
      code: options.code
    }],
    userCallback: callback
  });
};

/**
 * Request a verification code.
 * @param phone The phone number to verify.
 * @param [callback]
 */
Meteor.sendVerificationCode = function (phone, callback) {
  Meteor.call('accounts-sms.sendVerificationCode', phone, callback);
};
