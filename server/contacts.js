Meteor.methods({
	addContact: function(contactInfo) {
		contactInfo.userId = Meteor.userId();

		Contacts.insert(contactInfo);
	},

	deleteContact: function(id) {
		Contacts.remove(id);
	},

	updateContact: function(updatedData) {
		updatedData.userId = Meteor.userId();

		Contacts.update(updatedData.contactInfoId, updatedData);
	},
});