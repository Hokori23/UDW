
/* * * * * * * *
 * DOM Variable*
 * * * * * * * */

//page
const page = $('#home--page');
const pageLogin = $('#home--page--login');

//btn
const login = $('#login')
const backBtn = $('.back-btn')
const loginConfirmStudent = $('#login-confirm-student')
const loginConfirmStaff = $('#login-confirm-staff')



/* * * * * * * * *
 * Event Listener*
 * * * * * * * * */

//ForwardBTN
login.click(() => {
	page.addClass('hidden');
	pageLogin.removeClass('hidden')
})
loginConfirmStudent.click(()=>{
	//Check ID and Password here
	location.href = 'student.html'
})
loginConfirmStaff.click(()=>{
	//Check ID and Password here
	location.href = 'staff.html'
})




//BackwardBTN
backBtn.click(() => {
	page.removeClass('hidden');
	pageLogin.addClass('hidden')
})