Wallets = new Mongo.Collection('wallets');

Wallets.allow({
    update: function(userId, doc){
        return !!userId;
   } 
});

// TBD: We need to add the credit card tokenization logic
// We should keep only credit card tokens 
// Card = new SimpleSchema({
    
// });

// TBD: In the future funds would not have card, just token
Funds = new SimpleSchema({
    title: {
        type: String
    }, 
    address: {
        type: String
    },
    currency: {
        type: String
    }
});

WalletSchema = new SimpleSchema({
    owner: {
        type: String, 
        label: "User Id",
        autoform: {
           type: "hidden"
       }
    },
    funds: {
        type: [Funds]
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
});
