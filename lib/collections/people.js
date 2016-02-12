People = new Mongo.Collection('people');

People.allow({
  update: function(userId, doc){
      return !!userId;
  } 
});

// We should extend with region and postcode for countries outside latam
Address = new SimpleSchema({
    address1: {
        type: String,
        label: "Address Line 1", 
        optional: true
    },
    address2: {
        type: String, 
        label: "Address Line 2",
        optional: true
    },
    city: {
        type: String,
        label: "City", 
        optional: true
    },
    country: {
        type: String, 
        label: "Country"
    }
});

//Person contact - email sms or in the future push
Channel = new SimpleSchema({
   title:{
        type: String, 
        optional: true
   }, 
   preferred:{
        type: Boolean, 
        defaultValue: false
   }, 
   //first time 2FA is triggerd update this field
   verified:{
        type: Boolean, 
        defaultValue: false
   }
});

//Person schema - defines people
//When creating a user - create a person 
PersonSchema = new SimpleSchema({
    owner: {
        type: String, 
        label: "User Id",
        autoform: {
           type: "hidden"
       }
    },
    firstname: {
        type: String,
        label: "First Name",
        optional: true
    },
    lastname: {
        type: String,
        label: "Last Name",
        optional: true
    },
    address: {
        type: [Address]
    },
    channel:{
        type: [Channel]
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function (){
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }
////TBD - document of the user
//   identity: {
//       type: [Identity]
//   },
//   sex: {
//       type: ["M", "F"],
//       label: "User sex"
//   },
//  birthday: {
//           type: Date,
//           label: "Birthday"
//       },
//// TBD - KYC Levels are regulated - we need logic to update this
//   kyclevel:{
//       type: String, 
//       label: "KYC level"
//   },
});

People.attachSchema(PersonSchema);

// // Type should be an option, still TBD
// // IDENTITY_PROOF,REGISTRATION_PROOF,ADDRESS_PROOF
// Identity = new SimpleSchema({
//     type: {
//         type: String, 
//         label: "Document type",
//         optional: true
//     },
//     number: {
//         type: String, 
//         label: "Document number",
//         optional: false
//     },
//     expirationdate: {
//         type: Date, 
//         label: "Document expiration",
//         optional: true
//     },
//     issuingdate: {
//         type: Date, 
//         label: "Document issued",
//         optional: true
//     },
//     issuinglocation: {
//         type: String, 
//         label: "Location issued",
//         optional: true
//     }
// });