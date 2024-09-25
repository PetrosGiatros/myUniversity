Schema = {};

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
    optional: true
  },
  lastName: {
    type: String,
    label: "Last Name",
    optional: true
  },
  reading: {
    type: Number,
    label: "Reading",
    optional: true
  },
  math: {
    type: Number,
    label: "Mathematics",
    optional: true
  },
  writing: {
    type: Number,
    label: "Writing",
    optional: true
  },
  act: {
    type: Number,
    label: "ACT",
    optional: true
  },
  toefl: {
    type: Number,
    label: "TOEFL",
    optional: true
  },
  gpa: {
    type: Number,
    decimal: true,
    label: "GPA",
    optional: true
  }
})

Schema.User = new SimpleSchema({
  profile: {
    type: Schema.UserProfile,
    optional: true
  }
});

Meteor.users.attachSchema(Schema.User);
