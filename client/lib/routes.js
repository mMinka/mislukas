FlowRouter.route('/home', {
  name: 'home', 
  action(){
      BlazeLayout.render('HomeLayout',{main:'WalletTimeline'});
  }
});

FlowRouter.route('/walletsend', {
  name: 'walletsend', 
  action(){
      BlazeLayout.render('HomeLayout',{main:'WalletSend'});
  }
});



FlowRouter.route('/', {
  name: 'login',
  action(){
      BlazeLayout.render('BlankLayout', {main: 'Login'});
  }
});

FlowRouter.route('/passcode', {
  name: 'passcode',
  action(){
      BlazeLayout.render('BlankLayout', {main: 'PassCode'});
  }
});

FlowRouter.route('/register', {
  name: 'login',
  action(){
      BlazeLayout.render('BlankLayout', {main: 'Register'});
  }
});

// FlowRouter.route('/blank', {
//   name: 'blank',
//   action(){
//       BlazeLayout.render('BlankLayout');
//   }
// });