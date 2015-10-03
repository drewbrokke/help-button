var utilityFns = {
	getFormdata: function(formTarget) {
		return {
			contactInfoId: formTarget.contactId.value,
			email: formTarget.email.value,
			name: formTarget.name.value,
			phone: formTarget.phone.value,
			provider: formTarget.provider.value
		};
	}
};

Utils = utilityFns;