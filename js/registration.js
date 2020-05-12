/* * * * * * * *
 * DOM Variable*
 * * * * * * * */

//Page
const page = $('#registration--page');
const pageStudent = $('#registration--page--student');
const pageStaff = $('#registration--page--staff');

//BTN
const student = $('#register--student');
const staff = $('#register--staff');
const backBtn = $('.back-btn');
const studentConfirm = $('#register--student--confirm')
const studentReset = $('#register--student--reset')
const staffConfirm = $('#register--staff--confirm')
const staffReset = $('#register--staff--reset')

//Form
const studentForm = $('#register--student--form').find('.form-control');

const staffForm = $('#register--staff--form').find('.form-control');



/* * * * * * *
 * Function  *
 * * * * * * */
const toRegister = () => {
	pageStudent.addClass('hidden');
	pageStaff.addClass('hidden');
	page.removeClass('hidden');
	
	//Here to do registration
}
const toStudent = () => {
	page.addClass('hidden');
	pageStudent.removeClass('hidden');
}
const toStaff = () => {
	page.addClass('hidden');
	pageStaff.removeClass('hidden');
}
const checkForm = (form, obj) => {
	//CheckForm
	for (let i = 0; i < form.length; i++) {
		//Check Required Info
		if (form[i].required) {
			if (!form[i].value) {
				form[i].placeholder = 'Required'
				obj.flag = false;
			} else if (form[i].name === 'passworddouble') {
				//password Double Check
				if (form[i].value !== form[i - 1].value) {
					form[i].value = ''
					form[i - 1].value = ''
					form[i].placeholder = 'Double Check the password'
					form[i - 1].placeholder = 'Double Check the password'
					obj.flag = false;
				} else {
					//check password
					let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^])[A-Za-z\d!@#$%^]{6,12}/;
					if (!reg.test(form[i].value)) {
						obj.flag = false;
						form[i].value = ''
						form[i - 1].value = ''
						form[i].placeholder =
							'6 to 12 characters in length and contains at least 1 lower case letter, 1 uppercase letter, 1 number and one of following special characters ! @ # $ % ^';
						form[i - 1].placeholder =
							'6 to 12 characters in length and contains at least 1 lower case letter, 1 uppercase letter, 1 number and one of following special characters ! @ # $ % ^'
					}
				}
			} else if (form[i].name === 'email') {
				//Email format check
				console.log(form[i].value)
				let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (!reg.test(form[i].value)) {
					form[i].value = ''
					form[i].placeholder = 'Email format error'
				}
			}
		}
	}
}




/* * * * * * * * *
 * EventListener *
 * * * * * * * * */

//ForwardBTN
student.click(toStudent)
staff.click(toStaff)

//BackwardBTN
backBtn.click(toRegister)




/* * * * * * * * * *
 * RegisterConfirm *
 * * * * * * * * * */
studentConfirm.click(() => {
	let obj = {
		flag: true
	}
	//CheckForm
	checkForm(studentForm, obj)

	if (obj.flag) {
		//Success
		//init value
		for (let i = 0; i < studentForm.length; i++) {
			studentForm[i].value = ''
			studentForm[i].placeholder = ''
		}
		toRegister()
	}
})
staffConfirm.click(() => {
	let obj = {
		flag: true
	};
	//CheckForm
	checkForm(staffForm, obj)
	if (obj.flag) {
		//Success
		//init value
		for (let i = 0; i < staffForm.length; i++) {
			staffForm[i].value = ''
			staffForm[i].placeholder = ''
		}
		toRegister()
	}
})



/* * * * * * * * *
 * RegisterReset *
 * * * * * * * * */
studentReset.click(() => {
	//init value
	for (let i = 0; i < studentForm.length; i++) {
		studentForm[i].value = ''
		studentForm[i].placeholder = ''
	}
})
staffReset.click(() => {
	//init value
	for (let i = 0; i < staffForm.length; i++) {
		staffForm[i].value = ''
		staffForm[i].placeholder = ''
	}
})
