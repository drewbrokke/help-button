if (Meteor.isServer) {
	Meteor.methods({
		sendEmail: function() {

			this.unblock();

			Email.send({
				to: 'drewbrokke@gmail.com',
				from: 'helpbuttondemo@gmail.com',
				subject: 'help please',
				text: 'pretty please???'
			});
		}
	});
}