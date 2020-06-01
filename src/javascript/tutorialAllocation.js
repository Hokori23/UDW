(function(window, document) {
	window.onload = async function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		try {
			let user = JSON.parse(localStorage.getItem('udw'));
			let res = await checkLogin();
			if (res.errcode || !user) {
				alert("You have not logged in yet");
				location.href = '../home.html';
				return;
			}
			if (user.role != 4) {
				alert("Only Student accessable");
				location.href = '../home.html';
				return;
			}
			$('.nav-name').text(user && user.name || '');
		} catch (e) {
			alert(e.responseText)
		}
		paintEnrolled();

	}

})(window, document);

async function paintEnrolled() {
	$('.main-left-enrolled').empty();
	$('.main-right-enrolled').empty();
	let data = await unitQueryByStudent();
	if (!data.errcode || !data.data.length) {
		if (!data.data.length) {
			$('.enrolled-banner').html('No enrolled unit yet')
		} else {
			$('.enrolled-banner').html('Enrolled Units')
		}
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
		arr = unitArr;

		sessionStorage.setItem('unit_enrolled', JSON.stringify(arr))

		for (let i = 0; i < arr.length; i++) {
			let item = arr[i],
				el = createEnrolled(item);
			if (i % 2 === 0)
				$('.main-left-enrolled').append(el);
			else
				$('.main-right-enrolled').append(el)
		}
	} else {
		alert(data.data)
	}
}

function createEnrolled(item) {

	let tutorial_time = JSON.stringify(item.tutorial_time);
	let el =
		`
        <div class="unit-item">
            <div class="unit-detail unit-id">ID: ${item.unit_id}</div>
            <div class="unit-detail unit-name">Name: ${item.name}</div>
            <div class="unit-detail unit-lecturer">Lecturer: ${item.lecturer_name}</div>
            <div class="unit-detail unit-campus">Campus: ${item.campus}</div>
            <div class="unit-detail unit-capacity">Capacity: ${item.capacity}</div>
            <div class="unit-detail unit-tutorial-time">Tutorial Time: ${tutorial_time}</div>
            <div class="unit-detail unit-uc">UC: ${item.uc_name}</div>
            <div class="unit-detail unit-tutor">Tutor: ${item.tutor_name}</div>
            <div class="unit-detail unit-description">Desctiption: ${item.description}</div>
            <div class="unit-choose" onclick='popup_edit(${item.unit_id},${tutorial_time})'>Edit</div>
        </div>
        `
	return el;
}

async function popup_edit(unit_id, selectedTutorial_time) {
	let data = await unitRetrieve();
	if (!data.errcode) {
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
		arr = unitArr;

		sessionStorage.setItem('unit_detail', JSON.stringify(arr))
	}
	let unit = JSON.parse(sessionStorage.getItem('unit_detail'));
	let lecture_time;
	let tutorial_time;
	for (let i = 0; i < unit.length; i++) {
		if (unit[i].unit_id == unit_id) {
			lecture_time = unit[i].lecture_time;
			tutorial_time = unit[i].tutorial_time;
		}
	}
	let html = '';
		//tutorial time
		html += `
			<div class='enroll-box'>
				Tutorial Time: 
				<select class='enroll-tutorial'>
		`;
		for (let i = 0; i < tutorial_time.length; i++) {
			html += `
			<option value='${tutorial_time[i]}'>${tutorial_time[i]}</option>
		`;
		}
		html +=
			`
			</select>
			<button onclick='enroll(${unit_id},0)'>Add</button>
		<button onclick ='remove(${unit_id},0)'>Remove</button>
		</div>
		`;

	$('.popup-content').html(html)
	$('.popup').fadeIn();
	$('.popup-shadow').fadeIn();

	$('.popup-btn-cancel').unbind('click');
	$('.popup-btn-cancel').click(() => {
		popup_hide();
	})
}

async function remove(unit_id, type) {

	let unit = JSON.parse(sessionStorage.getItem('unit_enrolled'));
	let html = '';
	let time = [];
	if (unit && unit.length) {
		for (let i = 0; i < unit.length; i++) {
			if (unit[i].unit_id == unit_id) {
				if (type == 1) {
					time = unit[i].lecture_time || [];
				} else {
					time = unit[i].tutorial_time || [];
				}
				break;
			}
		}

		if (type == 1) {
			//lecturer
			let val = $('.enroll-lecture').val();
			let index = time.indexOf(val);
			if (index != -1) {
				time.splice(index, 1)
			} else {
				alert('Not enrolled yet')
				return;
			}
		} else {
			//tutorial
			let val = $('.enroll-tutorial').val();
			let index = time.indexOf(val);
			if (index != -1) {
				time.splice(index, 1)
			} else {
				alert('Not enrolled yet')
				return;
			}
		}
	} else {
		alert('Not enrolled yet')
		return;
	}


	time = JSON.stringify(time);
	unit = {
		unit_id: unit_id,
		time: time,
		type: type
	}
	let res = await unitEnroll(unit);
	if (res.errcode) {
		alert(res.data);
		return;
	}
	paintEnrolled();
	popup_hide();
}


async function enroll(unit_id, type) {

	let unit = JSON.parse(sessionStorage.getItem('unit_enrolled'));
	let html = '';
	let time = [];
	if (unit && unit.length) {
		for (let i = 0; i < unit.length; i++) {
			if (unit[i].unit_id == unit_id) {
				if (type == 1) {
					time = unit[i].lecture_time || [];
				} else {
					time = unit[i].tutorial_time || [];
				}
				break;
			}
		}

		if (type == 1) {
			//lecturer
			let val = $('.enroll-lecture').val();
			if (time.indexOf(val) == -1) {
				time.push(val)
			} else {
				alert('Already Enrolled')
				return;
			}
			console.log($('.enroll-lecture').val());
		} else {
			//tutorial
			let val = $('.enroll-tutorial').val();
			if (time.indexOf(val) == -1) {
				time.push(val)
			} else {
				alert('Already Enrolled')
				return;
			}
		}
	} else {
		if (type == 1) {
			time.push($('.enroll-lecture').val())
		} else {
			time.push($('.enroll-tutorial').val())
		}
	}


	time = JSON.stringify(time);
	unit = {
		unit_id: unit_id,
		time: time,
		type: type
	}
	console.log(unit);
	console.log(unit.time);
	let res = await unitEnroll(unit);
	console.log(res);
	if (res.errcode) {
		alert(res.data);
		return;
	}
	paintEnrolled();
	popup_hide();
}
$('.popup-shadow').click(popup_hide);

function popup_hide() {
	if ($('.popup-shadow').css("display") !== 'none') {
		$('.popup').fadeOut();
		$('.popup-shadow').fadeOut();
	}
}
(() => {
	$('.nav-btn').click(() => {
		location.href = '../home.html'
	})
})();
