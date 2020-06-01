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
			if (user.role != 2 && user.role != 1) {
				alert("Only DC、UC accessable");
				location.href = '../home.html';
				return;
			}
			$('.nav-name').text(user && user.name || '');
		} catch (e) {
			alert(e.responseText)
		}

		paintDetail();
	}



	$('.popup-shadow').click(() => {
		popup_hide();
	})
	$('.popup-btn-cancel').click(() => {
		popup_hide();
	})


})(window, document);


function popup_hide() {
	if ($('.popup-shadow').css("display") !== 'none') {
		$('.popup-input').fadeOut();
		$('.popup-select').fadeOut();
		$('.popup-shadow').fadeOut();
	}
}

function createDetail(item) {
	let lecture_time = JSON.stringify(item.lecture_time);
	let tutorial_time = JSON.stringify(item.tutorial_time);
	let el =
		`
	    <div class="unit-item">
	        <div class="unit-detail unit-id">
				<span>ID:</span> ${item.unit_id}
				
			</div>
	        <div class="unit-detail unit-name">
				<span>Name:</span> ${item.name}
				
			</div>
	        <div class="unit-detail unit-lecturer">
				<span>Lecturer:</span> ${item.lecturer_name}
				
				<button class='popup-btn' onClick="pop_up_input('Lecturer ID','lecturer_id','${item.unit_id}')">Edit</button>
			</div>
	        <div class="unit-detail unit-campus">
				<span>Campus:</span> ${item.campus}
				
			</div>
	        <div class="unit-detail unit-capacity">
				<span>Capacity:</span> ${item.capacity}
				
			</div>
	        <div class="unit-detail unit-lecture-time">
				<span>Lecture Time:</span> ${lecture_time}
				<button class='popup-btn popup-btn-lecture' unit_id="${item.unit_id}" onClick="pop_up_select('1',this)">Edit</button>
			</div>
	        <div class="unit-detail unit-tutorial-time">
				<span>Tutorial Time:</span> ${tutorial_time}
				<button class='popup-btn popup-btn-tutorial' unit_id="${item.unit_id}" onClick="pop_up_select('0',this)">Edit</button>
			</div>
	        <div class="unit-detail unit-uc">
				<span>UC:</span> ${item.uc_name}
				
			</div>
	        <div class="unit-detail unit-tutor">
				<span>Tutor:</span> ${item.tutor_name}
				
				<button class='popup-btn' onClick="pop_up_input('Tutor ID','tutor_id','${item.unit_id}')">Edit</button>
			</div>
	        <div class="unit-detail unit-description">
				<span>Desctiption:</span> ${item.description}
				
			</div>
	    </div>
	    `
	return el;
}

async function paintDetail() {
	$('.main-left').empty();
	$('.main-right').empty();
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
		for (let i = 0; i < arr.length; i++) {
			let item = arr[i],
				el = createDetail(item);
			if (i % 2 === 0)
				$('.main-left').append(el);
			else
				$('.main-right').append(el)
		}
	} else {
		alert(data.data)
	}

	let user = JSON.parse(localStorage.getItem('udw'));
	if (user.role == 1) {
		$('.popup-btn').attr("disabled", true);
		$('.popup-btn').addClass("disabled");
	}
}


function pop_up_input(text, val, unit_id) {
	let item = JSON.parse(sessionStorage.getItem('unit_detail'));
	for (let i = 0; i < item.length; i++) {
		if (item[i].unit_id == unit_id) {
			item = item[i];
			break;
		}
	}
	let el = `
		<span>Input ${text}: </span>
		<input type='number' value='${item[val]}' id='modify-${val}'/>
		`
	$('.popup-content-input').html(el);
	$('.popup-shadow').fadeIn();
	$('.popup-input').fadeIn();

	$('.popup-btn-confirm').unbind('click');
	$('.popup-btn-confirm').click(async () => {
		item[val] = $(`#modify-${val}`).val();
		let res = await unitModifyByUC(item);
		if (res.errcode) {
			alert(res.data)
		} else {
			popup_hide();
		}
		paintDetail();
	})
}


async function paintTime(val, type, unit_id) {
	let className = type == 1 ? 'time-item-lecture' : 'time-item-tutorial';
	sessionStorage.setItem('unit_time', JSON.parse(val));
	let html = ''
	if (val && val != '[]') {
		let time = JSON.parse(val);

		//existed time
		for (let i = 0; i < time.length; i++) {
			let textArr = time[i].split(',');
			let hour = textArr[0];
			let day = textArr[1];
			html +=
				`
					<div class='${className} time-item'>
						<div class='time-item-hour'>${hour}</div>
						<div class='time-item-day'>${day}</div>
						<button class='time-item-delete' onclick='removeTime(${i},${type},${unit_id})'>Remove</button>
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

async function pop_up_select(type, e) {
	let unit_id = e.getAttribute('unit_id');
	let unit_detail = JSON.parse(sessionStorage.getItem('unit_detail'));
	let time = '';
	for (let i = 0; i < unit_detail.length; i++) {
		if (unit_detail[i].unit_id == unit_id) {
			if (type == 1) {
				time = unit_detail[i].lecture_time;
			} else {
				time = unit_detail[i].tutorial_time;
			}
		}
	}
	time = JSON.stringify(time)
	let html = await paintTime(time, type, unit_id)
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

	$('.popup-btn-confirm').unbind('click')
	$('.popup-btn-confirm').click(async () => {
		let unit_detail = JSON.parse(sessionStorage.getItem('unit_detail'));
		let time = '';
		for (let i = 0; i < unit_detail.length; i++) {
			if (unit_detail[i].unit_id == unit_id) {
				console.log(unit_detail[i]);
				if (type == 1) {
					time = unit_detail[i].lecture_time;
				} else {
					time = unit_detail[i].tutorial_time;
				}
			}
		}

		let startTime = $('.start-time').val();
		let endTime = $('.end-time').val();
		let day = $('.day').val();
		if (!startTime || !endTime || !day) {
			alert('Select start time & end time');
			return;
		}
		let newTime = startTime + '-' + endTime + ',' + day;
		if (time) {
			time.push(newTime);
			newTime = JSON.stringify(time);
		} else {
			newTime = JSON.stringify([newTime]);
		}

		let unit_time = {
			unit_id: unit_id,
			time: newTime,
			type: type
		}
		
		let res = await unitTimeModifyByUC(unit_time);
		if (res.errcode) {
			alert(res.data)
		} else {
			time = newTime;
			let html = await paintTime(newTime, type, unit_id);
			$('.popup-content').html(html)
			paintDetail();
		}
	})

}

(() => {
	$('.nav-btn').click(() => {
		location.href = '../home.html'
	})
})();

async function removeTime(index, type, unit_id) {
	let unit_detail = JSON.parse(sessionStorage.getItem('unit_detail'));
	let newTime;
	for (let i = 0; i < unit_detail.length; i++) {
		if (unit_detail[i].unit_id == unit_id) {
			if (type == 1) {
				unit_detail[i].lecture_time.splice(index, 1);
				newTime = unit_detail[i].lecture_time;
			} else {
				unit_detail[i].tutorial_time.splice(index, 1);
				newTime = unit_detail[i].tutorial_time;
			}
			break;
		}
	}
	sessionStorage.setItem('unit_detail', JSON.stringify(unit_detail));
	newTime = JSON.stringify(newTime)
	let unit_time = {
		unit_id: unit_id,
		time: newTime,
		type: type
	}
	let res = await unitTimeModifyByUC(unit_time);
	if (res.errcode) {
		alert(res.data)
	} else {
		time = newTime;
		let html = await paintTime(newTime, type, unit_id);
		$('.popup-content').html(html)
		paintDetail();
	}
}
