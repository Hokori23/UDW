(function(window, document) {
	window.onload = function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		checkLogin()
		isStaff();
		$('#student--edit').click(studentModify);
		$('#staff--edit').click(staffModify);
	}

	function checkLogin() {
		$.ajax({
			url: '../../php/api/checklogin.php',
			success(data) {
				console.log(data);
			},
			error(e) {
				console.log(e)
			}
		})
	}

	function getStudentInfo() {
		$.ajax({
			url: '../../php/api/student/getself.php',
			success(data) {
				if (data.errcode) {
					alert(data.data)
					if (data.errcode == 401) {
						/** Login page Here */
					}
				} else {
					$('#student--id').val(data.data.student_id);
					$('#student--name').val(data.data.name);
					$('#student--email').val(data.data.email);
					$('#student--address').val(data.data.address);
					$('#student--birth').val(data.data.birth);
					$('#student--phone').val(data.data.phone_number);
				}
			},
			error(e) {
				alert(e.responseText);
			}
		})
	}

	function studentLogin() {
		$.ajax({
			url: '../../php/api/student/login.php',
			method: 'POST',
			data: {
				id: '555',
				password: '19990412'
			},
			success(data) {
				console.log(data)
			},
			error(e) {
				console.log(e)
			}
		})
	}

	function studentModify() {
		console.log('modify')
		$.ajax({
			url: '../../php/api/student/modify.php',
			data: {
				name: $('#student--name').val(),
				email: $('#student--email').val(),
				address: $('#student--address').val(),
				birth: $('#student--birth').val(),
				phone_number: $('#student--phone').val(),
			},
			success(data) {
				if (data.errcode) {
					alert(data.data)
					if (data.errcode == 401) {
						/** Login page Here */
					}
				} else {
					$('#student--id').val(data.data.student_id);
					$('#student--name').val(data.data.name);
					$('#student--email').val(data.data.email);
					$('#student--address').val(data.data.address);
					$('#student--birth').val(data.data.birth);
					$('#student--phone').val(data.data.phone_number);
					alert('Modify successfully')
				}
			},
			error(e) {
				console.log(e)
				alert(e.responseText);
			}
		})
	}

	function getStaffInfo() {
		$.ajax({
			url: '../../php/api/staff/getself.php',
			success(data) {
				if (data.errcode) {
					alert(data.data)
					if (data.errcode == 401) {
						/** Login page Here */
					}
				} else {
					$('#staff--id').val(data.data.staff_id);
					$('#staff--name').val(data.data.name);
					$('#staff--email').val(data.data.email);
					$('#staff--address').val(data.data.address);
					$('#staff--birth').val(data.data.birth);
					$('#staff--phone').val(data.data.phone_number);
					$('#staff--qua').val(data.data.qualification);
					$('#staff--exp').val(data.data.expertise);
				}
			},
			error(e) {
				alert(e.responseText);
			}
		})
	}

	function staffLogin() {
		$.ajax({
			url: '../../php/api/staff/login.php',
			method: 'POST',
			data: {
				id: '1',
				password: '19990412'
			},
			success(data) {
				console.log(data)
			},
			error(e) {
				console.log(e)
			}
		})
	}

	function staffModify() {
		console.log('modify')
		$.ajax({
			url: '../../php/api/staff/modify.php',
			data: {
				name: $('#staff--name').val(),
				email: $('#staff--email').val(),
				address: $('#staff--address').val(),
				birth: $('#staff--birth').val(),
				phone_number: $('#staff--phone').val(),
				qualification: $('#staff--qua').val(),
				expertise: $('#staff--exp').val(),

			},
			success(data) {
				if (data.errcode) {
					alert(data.data)
					if (data.errcode == 401) {
						/** Login page Here */
					}
				} else {
					$('#staff--id').val(data.data.staff_id);
					$('#staff--name').val(data.data.name);
					$('#staff--email').val(data.data.email);
					$('#staff--address').val(data.data.address);
					$('#staff--birth').val(data.data.birth);
					$('#staff--phone').val(data.data.phone_number);
					alert('Modify successfully')
				}
			},
			error(e) {
				console.log(e)
				alert(e.responseText);
			}
		})
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

})(window, document);
