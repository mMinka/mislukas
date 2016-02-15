FlowRouter.route('/home', {
  name: 'home', 
  action(){
      BlazeLayout.render('HomeLayout',{main:'WalletTimeline'});
  }
});

FlowRouter.route('/profile', {
  name: 'Profile', 
  action(){
      BlazeLayout.render('ProfileMain',{main:'Profile'});
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

FlowRouter.route('/settings', {
  name: 'settings',
  action(){
      BlazeLayout.render('BlankLayout', {main: 'Settings'});
  }
});

FlowRouter.route('/passcode', {
  name: 'passcode',
  action(){
      BlazeLayout.render('BlankLayout', {main: 'PassCode'});
  }
});

// FlowRouter.route('/blank', {
//   name: 'blank',
//   action(){
//       BlazeLayout.render('BlankLayout');
//   }
// });