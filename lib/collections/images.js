var imageStore = new FS.Store.GridFS("images",{path: "~/uploads"});

Images = new FS.Collection("images", {
 	stores: [imageStore],
 	filter: {
    	allow: {
      		contentTypes: ['image/*'] //allow only images in this FS.Collection
  		}
  	}
});

Images.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    },
    download: function() {
        return true;
    }
});