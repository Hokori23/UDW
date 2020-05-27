(function(window, document) {
	window.onload = function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		(async function() {
			let res = await checkLogin();
			if (res.errcode) {
				alert("You have not log in yet");
				location.href = '../home.html'
			}
		})()
		let user = getUser();
		if (user.role == 4) {
			isStudent();
		} else {
			isStaff();
		}
		$('#student--edit').click(userAccountStudentModify);
		$('#staff--edit').click(userAccountStaffModify);
	}


	function isStudent() {
		studentLogin();

		$('#main-student').show();
		$('#main-staff').hide();
		getStudentInfo();
	}

	function isStaff() {
		staffLogin();

		$('#main-student').hide();
		$('#main-staff').show();
		getStaffInfo();
	}

	async function getStudentInfo() {
		try {
			let res = await studentGetSelf();
			if (res.errcode) {
				alert(res.data)
				if (res.errcode == 401) {
					/** Login page Here */
				}
			} else {
				$('#student--id').val(res.data.student_id);
				$('#student--name').val(res.data.name);
				$('#student--email').val(res.data.email);
				$('#student--address').val(res.data.address);
				$('#student--birth').val(res.data.birth);
				$('#student--phone').val(res.data.phone_number);
			}
		} catch (e) {
			alert(e.responseText)
		}
	}

	async function getStaffInfo() {
		try {
			let res = await staffGetSelf();
			if (res.errcode) {
				alert(res.data)
				if (res.errcode == 401) {
					/** Login page Here */
				}
			} else {
				$('#staff--id').val(res.data.staff_id);
				$('#staff--name').val(res.data.name);
				$('#staff--email').val(res.data.email);
				$('#staff--address').val(res.data.address);
				$('#staff--birth').val(res.data.birth);
				$('#staff--phone').val(res.data.phone_number);
				$('#staff--qua').val(res.data.qualification);
				$('#staff--exp').val(res.data.expertise);
			}
		} catch (e) {
			alert(e.responseText)
		}
	}

	async function userAccountStudentModify() {
		//check Value
		let student = {
			name: $('#student--name').val(),
			email: $('#student--email').val(),
			address: $('#student--address').val(),
			birth: $('#student--birth').val(),
			phone_number: $('#student--phone').val()
		}
		if (!student.name || !student.email) {
			alert('Name Or Email is necessary');
			return;
		} else {
			let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if (!reg.test(student.email)) {
				alert('Email format error');
				return;
			}
		}
		let res = await studentModify(student);
		try {
			if (res.errcode) {
				alert(res.data)
				if (res.errcode == 401) {
					/** Login page Here */
				}
			} else {
				$('#student--id').val(res.data.student_id);
				$('#student--name').val(res.data.name);
				$('#student--email').val(res.data.email);
				$('#student--address').val(res.data.address);
				$('#student--birth').val(res.data.birth);
				$('#student--phone').val(res.data.phone_number);
				alert('Modify successfully')
			}
		} catch (e) {
			alert(e.responseText);
		}
	}

	async function userAccountStaffModify() {
		let staff = {
			name: $('#staff--name').val(),
			email: $('#staff--email').val(),
			address: $('#staff--address').val(),
			birth: $('#staff--birth').val(),
			phone_number: $('#staff--phone').val(),
			qualification: $('#staff--qua').val(),
			expertise: $('#staff--exp').val()
		}
		if (!staff.name || !staff.email || !staff.qualification || !staff.expertise) {
			alert('Name, Email, Qualification and Expertise are necessary');
			return;
		} else {
			let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if (!reg.test(staff.email)) {
				alert('Email format error');
				return;
			}
		}
		let res = await staffModifySelf(staff);

		if (res.errcode) {
			alert(res.data)
			if (res.errcode == 401) {
				/** Login page Here */
			}
		} else {
			$('#staff--id').val(res.data.staff_id);
			$('#staff--name').val(res.data.name);
			$('#staff--email').val(res.data.email);
			$('#staff--address').val(res.data.address);
			$('#staff--birth').val(res.data.birth);
			$('#staff--phone').val(res.data.phone_number);
			alert('Modify successfully')
		}

	}

})(window, document);
