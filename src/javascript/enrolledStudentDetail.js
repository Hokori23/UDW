(function(window, document) {
	window.onload = async function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		//Check Role
		try {
			let user = JSON.parse(localStorage.getItem('udw'));
			let res = await checkLogin();
			if (res.errcode || !user) {
				alert("You have not logged in yet");
				location.href = '../home.html';
				return;
			}
			if (user.role > 3) {
				alert("Only Staff accessable");
				location.href = '../home.html';
				return;
			}
			$('.nav-name').text(user && user.name || '');
		} catch (e) {
			alert(e.responseText)
		}
		paintStudentItem();
	}
})(window, document);





// paint-student
async function paintStudentItem() {
	let data = await allStudentUnitDetails();
	if (data.errcode) {
		data.data && alert(data.data);
		$('.main-student-list').html(
			`
				<div style='height:100%;width:100%;display:flex;justify-content:center;align-items:center;'><h1>No student</h1></div>
		`
		);
		return;
	}
	sessionStorage.setItem('all_students_unit', JSON.stringify(data.data));
	let html = `
			<h1 style='text-align:center;width:100%;'>Enrolled Student Detail</h1>`

	let arr = data.data;

	let unitNameMap = new Map();
	let unitArr = [];
	let flag = 0;



	for (let i = 0; i < arr.length; i++) {
		if (!unitNameMap.has(arr[i].name)) {
			unitNameMap.set(arr[i].name, flag);
			arr[i].lecture_time = ''
			arr[i].tutorial_time = ''
			unitArr.push(arr[i]);
			if (arr[i].type == 1) {
				//Lecture Time
				if (arr[i].time) {
					unitArr[flag]['lecture_time'] = JSON.parse(arr[i].time);
				}
			} else {
				//Tutor Time
				if (arr[i].time) {
					unitArr[flag]['tutorial_time'] = JSON.parse(arr[i].time);
				}
			}
			flag++;
		} else {
			let position = unitNameMap.get(arr[i].name);
			if (arr[i].type == 1) {
				//Lecture Time
				let newTime = [];
				if (unitArr[position]['lecture_time']) {
					let time = unitArr[position]['lecture_time'];
					newTime = JSON.parse(arr[i].time);
					newTime = time.concat(newTime);
				} else if (arr[i].time) {
					newTime = JSON.parse(arr[i].time);
				}
				unitArr[position]['lecture_time'] = newTime;
			} else {
				//Tutor Time
				let newTime = [];
				if (unitArr[position]['tutorial_time']) {
					let time = unitArr[position]['tutorial_time'];
					newTime = JSON.parse(arr[i].time);
					newTime = time.concat(newTime);
				} else if (arr[i].time) {
					newTime = JSON.parse(arr[i].time);
				}
				unitArr[position]['tutorial_time'] = newTime;
			}
		}
		delete arr[i].time;
		delete arr[i].type;
	}
	data.data = arr = unitArr;
	sessionStorage.setItem('all_enrolled', JSON.stringify(data.data));
	for (let i = 0; i < data.data.length; i++) {
		if (data.data[i].student_id || !data.data[i].lecture_time) {
			let obj = data.data[i];
			html +=
				`
					
					<!-- student -->
					<ul class='main-ul' class='main-student'>
						<!-- Banner -->
						<li class='student-id' style='display:none;'>${data.data[i].student_id}</li>
						<li class='unit-id' style='display:none;'>${data.data[i].unit_id}</li>
						<li><b>Unit Name: </b>${data.data[i].name}<span></span></li>
						<li><b>Student Name: </b>${data.data[i].student_name}<span></span></li>
						<li><b>Lecture Time: </b>${data.data[i].lecture_time}<span></span></li>
						<li><b>Lecturer Name: </b>${data.data[i].lecturer_name}<span></span></li>
						<li><b>Tutorial Time: </b>${data.data[i].tutorial_time}<span></span></li>
						<li><b>Tutor Name: </b>${data.data[i].tutor_name}<span></span></li>
						<li>
							<button class='student-item-edit'>Edit</button>
							<button class='student-item-remove'>Remove</button>
							<button class='student-item-time' lecture_time='${JSON.stringify(data.data[i].lecture_time)}' tutorial_time='${JSON.stringify(data.data[i].tutorial_time)}'>Time</button>
						</li>
					</ul>
			        `
		}
	}
	$('.main-student-list').html(html);

	$('.student-item-edit').unbind('click');
	$('.student-item-edit').click(async function() {

		$('.popup-content').html('');
		$('.popup-btn-confirm').show();
		$('.popup-shadow').fadeIn();
		$('.popup').fadeIn();
	});

	$('.student-item-remove').unbind('click');
	$('.student-item-remove').click(async function() {
		let student_id = $(this).parent().parent().find('.student-id').text();
		let unit_id = $(this).parent().parent().find('.unit-id').text();
		if (confirm('Are you sure to delete?')) {
			let res1 = await remove(student_id, unit_id, 1);
			let res2 = await remove(student_id, unit_id, 0);
			if (!res1.errcode || !res2.errcode) {
				$(this).parent().parent().remove();
			} else {
				alert(res1.data, res2.data);
			}
		}
	});
	$('.student-item-time').unbind('click');
	$('.student-item-time').click(async function() {
		$('.popup-btn-confirm').hide();
		let html = paintTime($(this).attr('lecture_time'), $(this).attr('tutorial_time'));
		$('.popup-content').html(html);
		$('.popup-shadow').fadeIn();
		$('.popup').fadeIn();
	});
}

function paintTime(lecture_timeStr, tutorial_timeStr) {
	let html = '';
	let flag1 = !!(lecture_timeStr && lecture_timeStr != '[]');
	let flag2 = !!(tutorial_timeStr && tutorial_timeStr != '[]');
	if (flag1 || flag2) {
		if (flag1) {
			let lecture_time = JSON.parse(lecture_timeStr);

			//existed lecture_time
			for (let i = 0; i < lecture_time.length; i++) {
				let textArr = lecture_time[i].split(',');
				let hour = textArr[0];
				let day = textArr[1];
				html +=
					`
					<div class='time-item time-item-lecture'>
						<div class='time-item-hour'>${hour}</div>
						<div class='time-item-day'>${day}</div>
					</div>
				`
			}
		}
		if (flag2) {
			let tutorial_time = JSON.parse(tutorial_timeStr);

			//existed tutorial_time
			for (let i = 0; i < tutorial_time.length; i++) {
				let textArr = tutorial_time[i].split(',');
				let hour = textArr[0];
				let day = textArr[1];
				html +=
					`
						<div class='time-item time-item-tutorial'>
							<div class='time-item-hour'>${hour}</div>
							<div class='time-item-day'>${day}</div>
						</div>
					`
			}
		}
	} else {
		html = `
					<h1 style='width:100%;text-align:center;'>No Time yet</h1>
						
			`
	}
	return html;
}



function popup_hide() {
	if ($('.popup-shadow').css("display") !== 'none') {
		$('.popup').fadeOut();
		$('.popup-shadow').fadeOut();
	}
};


async function remove(student_id, unit_id, type) {

	let time = '';

	let unit = {
		student_id: student_id,
		unit_id: unit_id,
		time: time,
		type: type
	}
	console.log(unit);
	let res = await unitEnroll(unit);
	if (res.errcode) {
		alert(res.data);
		return;
	}
	paintStudentItem();
}


(() => {
	$('.popup-btn-cancel').click(() => {
		popup_hide()
	});
	$('.popup-shadow').click(() => {
		popup_hide()
	});
	$('.nav-btn').click(() => {
		location.href = '../home.html'
	})
})();
