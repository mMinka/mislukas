{"filter":false,"title":"sdk.js","tooltip":"/lib/sdk.js","undoManager":{"mark":4,"position":4,"stack":[[{"start":{"row":0,"column":0},"end":{"row":5,"column":39},"action":"insert","lines":["crypto    = Meteor.require('crypto');","elliptic  = Meteor.require('elliptic');","ripemd160 = Meteor.require('ripemd160');","request   = Meteor.require('request');","bs58check = Meteor.require('bs58check');","P         = Meteor.require('bluebird');"],"id":1}],[{"start":{"row":5,"column":39},"end":{"row":6,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":6,"column":0},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":3}],[{"start":{"row":7,"column":0},"end":{"row":160,"column":0},"action":"insert","lines":["","    function generateWalletAddress(options) {","      options = options || {};","    ","      var keys = generateKeyPair(options.scheme || 'ed25519');","      var address = deriveWalletAddress(keys.public, options.type);","      var statement = createAddressRegistrationStatement(address, keys, options);","    ","      return {","        address: address,","        keys: keys,","        statement: statement","      }","    }","","    function generateCurrencyIssuer(options) {","      options = options || {};","      options.type = 'issuer';","    ","      return generateWalletAddress(options);","    }","","    function generateTransactionRequest(signer, transaction, options) {","      var iou = {","        amt: transaction.amount,","        cur: transaction.currency,","        sub: signer.address,","        aud: transaction.destination,","        nce: Math.floor(Math.random() * 1000000000)","      };","","        return createTransactionRequestStatement(signer, iou, options);","    }","","    function registerWalletAddress() {","    ","    }","    ","    function registerCurrencyIssuer() {","      ","    }","    ","    function registerTransactionRequest() {","    ","    }","    ","    function checkAddressBalance() {","    ","    }","","/*--------------------------------------------------------------------------------*/","","    var hashes = ['sha256', 'sha512'];","    var schemes = {","      'ed25519': new elliptic.ec('ed25519'),","      'secp256k1': new elliptic.ec('secp256k1')","    };","","    function generateKeyPair(scheme) {","      var keypair;","      var keys;","    ","      switch (scheme) {","        case 'ed25519':","        case 'secp256k1':","          keypair = schemes[scheme].genKeyPair();","          keys = {","            scheme: scheme,","            private: keypair.getPrivate('hex'),","            public: keypair.getPublic('hex')","          };","          break;","        default:","          return P.reject('invalid-scheme');","          break;","      }","    ","      return keys;","    }","","    function deriveWalletAddress(publicKey, type) {","      var keyBuffer = new Buffer(publicKey, 'hex');","      var firstHash = crypto.createHash('sha256').update(keyBuffer).digest();","      var secondHash = ripemd160(firstHash);","      var extendedHash = (type === 'issuer' ? '57' : '87') + secondHash.toString('hex');","      var base58Public = bs58check.encode(new Buffer(extendedHash, 'hex'));","    ","      return base58Public;","    }","","    function createAddressRegistrationStatement(address, keys, options) {","      options = options || {};","    ","      var jws = {","        hash: {","          type: (hashes.indexOf(options.hash) > -1) ? options.hash : 'sha256',","          value: ''","        },","        payload: {","          address: address,","          keys: [","            keys.public","          ],","          threshold: 1","        },","        signatures: [","          {","            header: {","              alg: keys.scheme,","              kid: '0'","            },","            signature: ''","          }","        ]","      };","","      jws.hash.value = crypto.createHash(jws.hash.type)","        .update(JSON.stringify(jws.payload)).digest('hex');","    ","      jws.signatures[0].signature = schemes[keys.scheme]","        .sign(jws.hash.value, keys.private, 'hex').toDER('hex');","    ","      return jws;","    }","","    function createTransactionRequestStatement(signer, iou, options) {","      options = options || {};","    ","      var jws = {","        hash: {","          type: (hashes.indexOf(options.hash) > -1) ? options.hash : 'sha256',","          value: ''","        },","        payload: iou,","        signatures: [","          {","            header: {","              alg: signer.keys.scheme,","              kid: '0'","            },","            signature: ''","          }","        ]","      };","    ","      jws.hash.value = crypto.createHash(jws.hash.type)","        .update(JSON.stringify(jws.payload)).digest('hex');","    ","      jws.signatures[0].signature = schemes[signer.keys.scheme]","        .sign(jws.hash.value, signer.keys.private, 'hex').toDER('hex');","    ","      return jws;","    }",""],"id":4}],[{"start":{"row":5,"column":19},"end":{"row":5,"column":26},"action":"remove","lines":["require"],"id":5},{"start":{"row":5,"column":19},"end":{"row":5,"column":29},"action":"insert","lines":["npmRequire"]},{"start":{"row":4,"column":19},"end":{"row":4,"column":26},"action":"remove","lines":["require"]},{"start":{"row":4,"column":19},"end":{"row":4,"column":29},"action":"insert","lines":["npmRequire"]},{"start":{"row":3,"column":19},"end":{"row":3,"column":26},"action":"remove","lines":["require"]},{"start":{"row":3,"column":19},"end":{"row":3,"column":29},"action":"insert","lines":["npmRequire"]},{"start":{"row":2,"column":19},"end":{"row":2,"column":26},"action":"remove","lines":["require"]},{"start":{"row":2,"column":19},"end":{"row":2,"column":29},"action":"insert","lines":["npmRequire"]},{"start":{"row":1,"column":19},"end":{"row":1,"column":26},"action":"remove","lines":["require"]},{"start":{"row":1,"column":19},"end":{"row":1,"column":29},"action":"insert","lines":["npmRequire"]},{"start":{"row":0,"column":19},"end":{"row":0,"column":26},"action":"remove","lines":["require"]},{"start":{"row":0,"column":19},"end":{"row":0,"column":29},"action":"insert","lines":["npmRequire"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":[{"start":{"row":5,"column":29},"end":{"row":5,"column":29},"isBackwards":false},{"start":{"row":4,"column":29},"end":{"row":4,"column":29},"isBackwards":false},{"start":{"row":3,"column":29},"end":{"row":3,"column":29},"isBackwards":false},{"start":{"row":2,"column":29},"end":{"row":2,"column":29},"isBackwards":false},{"start":{"row":0,"column":29},"end":{"row":0,"column":29},"isBackwards":false},{"start":{"row":1,"column":29},"end":{"row":1,"column":29},"isBackwards":false}],"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1460392844126,"hash":"a080ec5fee9137e5af2eeb8a93642f2a7db5e97e"}