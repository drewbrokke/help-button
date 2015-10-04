var REGEX_EMAIL = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var REGEX_PHONE = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i;

var CSS_HAS_ERROR = 'has-error';

var CARRIERS = [
	"txt.att.net", // att
	"messaging.sprintpcs.com", // sprint
	"tmomail.net", // tMobile
	"vtext.com.nextel.com" // verizon
]

var utilityFns = {
	createPhoneEmail: function(phoneNumber, provider) {
		return phoneNumber + '@' + CARRIERS[provider];
	},

	getFormdata: function(formTarget) {
		var instance = this;

		var name = instance.validateName(formTarget.name);
		var email = instance.validateEmail(formTarget.email);
		var phone = instance.validatePhone(formTarget.phone);

		return {
			data: {
				contactEnabled: formTarget.contactEnabled.checked,
				contactInfoId: formTarget.contactId.value,
				email: formTarget.email.value,
				name: name,
				phone: formTarget.phone.value,
				provider: formTarget.provider.value,
				sendToEmail: formTarget.sendToEmail.checked,
				sendToText: formTarget.sendToText.checked
			},
			validation: name && email && phone
		};
	},

	validateEmail: function(input) {
		var email = input.value;

		var retVal = false;

		var controlGroup = $(input).closest('.form-group');

		if (email.length && !REGEX_EMAIL.test(email)) {
			controlGroup.addClass(CSS_HAS_ERROR);
		}
		else {
			controlGroup.removeClass(CSS_HAS_ERROR);

			retVal =  email || true;
		}

		return retVal;
	},

	validateName: function(input) {
		var name = input.value;

		var retVal = false;

		var controlGroup = $(input).closest('.form-group');

		if (!name.length) {
			controlGroup.addClass(CSS_HAS_ERROR);
		}
		else {
			controlGroup.removeClass(CSS_HAS_ERROR);

			retVal = name;
		}

		return retVal;
	},

	validatePhone: function(input) {
		var phone = input.value;

		var retVal = false;

		var controlGroup = $(input).closest('.form-group');

		if (phone.length && !REGEX_PHONE.test(phone)) {
			controlGroup.addClass(CSS_HAS_ERROR);
		}
		else {
			controlGroup.removeClass(CSS_HAS_ERROR);

			retVal = phone || true;
		}

		return retVal;
	}
};

Utils = utilityFns;