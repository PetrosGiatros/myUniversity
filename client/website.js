if (Meteor.isClient) {
  // Rendering
  Template.p.helpers({
    getTemplateName: function(){
      var slug = Router.current().params.slug;
      return slug;
    }
  });
  Template.dashboard.helpers({
    unis: function() {
      if(typeof Meteor.user().profile.reading !== 'undefined' && typeof Meteor.user().profile.writing !== 'undefined' && typeof Meteor.user().profile.math !== 'undefined' && typeof Meteor.user().profile.act !== 'undefined'){
        return Unis.find(
          {
            $and: [
              {
                $or: [
                  { minreading: {$lte: Meteor.user().profile.reading}},
                  { maxreading: {$lte: Meteor.user().profile.reading}}
                ]
              },
              {
                $or: [
                  { minwriting: {$lte: Meteor.user().profile.writing}},
                  { maxwriting: {$lte: Meteor.user().profile.writing}}
                ]
              },
              {
                $or: [
                  { minmath: {$lte: Meteor.user().profile.math}},
                  { maxmath: {$lte: Meteor.user().profile.math}}
                ]
              },
              {
                $or: [
                  { minact: {$lte: Meteor.user().profile.act}},
                  { maxact: {$lte: Meteor.user().profile.act}}
                ]
              }
            ]
          }
        );
      } else {
        Materialize.toast("You haven't entered either SAT Reading, Writing, Math or ACT. You will be viewing all Universities in the current database.", 10000, 'rounded red');
        return Unis.find();
      };
    }
  });
  //Database Registration
  Template.register.events({
    'submit form': function(event) {
      event.preventDefault();
      var userVar = event.target.registerUser.value;
      var passwordVar = event.target.registerPassword.value;
      var firstVar = event.target.registerFirst.value;
      var lastVar = event.target.registerLast.value;
      var readingVar = event.target.registerReading.value;
      var mathVar = event.target.registerMath.value;
      var writeVar = event.target.registerWrite.value;
      var actVar = event.target.registerACT.value;
      var toeflVar = event.target.registerToefl.value;
      var gpaVar = event.target.registerGPA.value;

      Accounts.createUser({
          username: userVar,
          password: passwordVar,
          profile: {
            firstName: firstVar,
            lastName: lastVar,
            reading: readingVar,
            math: mathVar,
            writing: writeVar,
            act: actVar,
            toefl: toeflVar,
            gpa: gpaVar
          }
      }, function(err){
        if(error){
           Materialize.toast('Account not created, an error occured.', 2000, 'rounded red');
        }
      });
     /*Accounts.onCreateUser(function(options, user) {
       if(options.profile) user.profile = options.profile;
       return user;
     });*/
    }
  });
  //Login Handling
  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();
      var userVar = event.target.loginUser.value;
      var passwordVar = event.target.loginPassword.value;
      Meteor.loginWithPassword(userVar, passwordVar);
      Accounts.onLoginFailure(function(){
         Materialize.toast('Invalid Credentials', 2000, 'rounded red');
        console.log("Login Failed.")
      });
      Accounts.onLogin(function(){
        Materialize.toast('Logged in.', 1500, 'rounded green');
        console.log("Logged in.")
      })
    }
  });
  //Logout Handling
  Template.logoutBtn.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
    }
  });
  //Profile Edit Session Set
  Template.profileContent.events({
    'click .edit': function() {
      Session.set('editMode', !Session.get('editMode'));
    },
    'click .btn': function() {
      Session.set('editMode', !Session.get('editMode'));
    }
  });
  //Fetching Profile Information
  Template.profileContent.helpers({
    reading: function() {return Meteor.user().profile.reading},
    math: function() {return Meteor.user().profile.math},
    writing: function() {return Meteor.user().profile.writing},
    toefl: function() {return Meteor.user().profile.toefl},
    act: function() {return Meteor.user().profile.act},
    profile: function() {
      if(Meteor.user()) return Meteor.user();
    },
    gpa: function() {return Meteor.user().profile.gpa},
    firstName: function() {return Meteor.user().profile.firstName},
    lastName: function() {return Meteor.user().profile.lastName},
    username: function() {return Meteor.user().username}
  });
  //Redirections
  Template.redirect.rendered = function(){
    if(!this._rendered) {
      this._rendered = true;
      Router.go('/');
    }
  }
  Template.redirectdash.rendered = function(){
    if(!this._rendered) {
      this._rendered = true;
      Router.go('/p/dashboard');
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
