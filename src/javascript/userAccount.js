(function(window, document) {
	window.onload = function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		(async function() {
			let res = await checkLogin();
			let user = getUser();
			if (res.errcode || !user) {
				alert("You have not logged in yet");
				location.href = '../home.html'
				return;
			}
			if (user.role == 4) {
				isStudent();
			} else {
				isStaff();
			}
			$('.nav-name').text(user && user.name || '');
			$('#student--edit').click(userAccountStudentModify);
			$('#staff--edit').click(userAccountStaffModify);
		})()
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
					alert("You have not logged in yet");
					location.href = '../home.html';
					return;
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



	async function popup_show() {
		//Paint Time List
		let html = await paintTime();

		//append time
		//time: 8 - 17
		let selectHTML =
			`
		<h4>Add Time</h4>
		<div class='popup-content-select'>
			Start Time: 
			<select class='start-time'>
				<option></option>`;
		for (let i = 8; i < 17; i++) {
			selectHTML += `
				<option value='${i}'>${i}</option>
			`
		}
		selectHTML +=
			`
			</select>
			End Time: 
			<select class='end-time disabled' disabled="true">
				<option></option>
			</select>
			Day: 
			<select class='day'>
				<option></option>
				<option value='Mon'>Mon</option>
				<option value='Feb'>Feb</option>
				<option value='Wed'>Wed</option>
				<option value='Thu'>Thu</option>
				<option value='Fri'>Fri</option>
				<option value='Sat'>Sat</option>
				<option value='Sun'>Sun</option>
			</select>
		</div>`


		$('.popup-content').html(html)
		$('.popup-content-select-box').html(selectHTML)
		$('.popup-shadow').fadeIn();
		$('.popup-select').fadeIn();


		$('.start-item').unbind('change')
		$('.start-time').change(function() {
			let val = $(this).val();
			if (val) {
				$('.end-time').attr('disabled', false);
				$('.end-time').removeClass('disabled');
				let html = '';
				val++;
				for (let i = val; i < 18; i++) {
					html += `
						<option value='${i}'>${i}</option>
						`;
				}
				$('.end-time').html(html);
			}
		})
	}


	function popup_hide() {
		if ($('.popup-shadow').css("display") !== 'none') {
			$('.popup-select').fadeOut();
			$('.popup-shadow').fadeOut();
		}
	}

	$('#staff--time').click(() => {
		popup_show();
	})
	$('.popup-btn-cancel').click(() => {
		popup_hide()
	})
	$('.popup-shadow').click(() => {
		popup_hide()
	})
	$('.popup-btn-confirm').click(async () => {
		let startTime = $('.start-time').val();
		let endTime = $('.end-time').val();
		let day = $('.day').val();
		if (!startTime || !endTime) {
			alert('Select start time & end time');
			return;
		}
		let newTime = startTime + '-' + endTime + ',' + day;
		let res = await addTime(newTime);
		console.log(res)
		if (res.errcode) {
			alert(res.data)
		} else {
			let html = await paintTime();
			$('.popup-content').html(html)
		}
	})


	$('.nav-btn').click(() => {
		location.href = '../home.html'
	})
})(window, document);

async function removeTime(index) {
	let time = JSON.parse(sessionStorage.getItem('staff_time'))
	time.splice(index, 1);
	let res = await staffModifyTime({
		time: JSON.stringify(time)
	});
	if (res.errcode) {
		alert(res.data)
	} else {
		let html = await paintTime();
		$('.popup-content').html(html)
	}
}

async function addTime(newTime) {
	let time = JSON.parse(sessionStorage.getItem('staff_time'));
	time.push(newTime);
	let res = await staffModifyTime({
		time: JSON.stringify(time)
	});
	return res
}

async function paintTime() {
	let res = await staffGetSelf();
	if (res.errcode) {
		alert(res.data);
		return;
	}

	let html = '';
	sessionStorage.setItem('staff_time', res.data.time || '[]');
	if (res.data.time && res.data.time != '[]') {
		let time = JSON.parse(res.data.time);


		//existed time
		for (let i = 0; i < time.length; i++) {
			let textArr = time[i].split(',');
			let hour = textArr[0];
			let day = textArr[1];
			html +=
				`
					<div class='time-item'>
						<div class='time-item-hour'>${hour}</div>
						<div class='time-item-day'>${day}</div>
						<button class='time-item-delete' onclick='removeTime(${i})'>Remove</button>
					</div>
				`
		}
	} else {
		html = `
					<h1 style='width:100%;text-align:center;'>No Time yet</h1>
						
			`
	}
	return html;
}
