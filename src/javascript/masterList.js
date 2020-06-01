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
			if (user.role != 1) {
				alert("Only DC accessable");
				location.href = '../home.html';
				return;
			}
			$('.nav-name').text(user && user.name || '');
		} catch (e) {
			alert(e.responseText)
		}
		paintUnitItem();
		paintStaffItem();
	}
})(window, document);




// change
((window, document) => {


	$('.li-unit').click(function() {
		$('.main-staff').hide();
		$('.main-create').show();
		$('.main-list').show();
		$('.main-create').removeClass('main-change');
		$('.main-list').removeClass('main-list-change');
	})

	$('.li-staff').click(function() {
		$('.main-staff').show();
		$('.main-create').addClass('main-change').hide();
		$('.main-list').addClass('main-list-change').hide();

	})
})(window, document);



// create unit
((window, document) => {

	$('.main-create-btn').click(function() {
		createItem();
	})



	async function createItem() {
		let data = {
			name: $("#unit-name").val(),
			uc_id: $('#unit-uc').val(),
			lecturer_id: $("#unit-lecturer").val(),
			capacity: $("#unit-capacity").val(),
			campus: $("#unit-campuses").val(),
			semester: $("#unit-periods").val(),
			description: $("#description").val()
		}

		data = await unitCreateByDC(data);
		if (data.errcode === 0) {
			paintUnitItem();
			$("#unit-name").val("");
			$("#unit-lecturer").val("");
			$("#unit-capacity").val("");
			$("#unit-uc_id").val("");
			$("#unit-periods").val("");
			$("#description").val("");
		} else {
			alert(data.data)
		}

	}

})(window, document);


// unit-item-controll
((window, document) => {
	$(document).on("click", ".unit-item-show", function() {
		$(this).parent().parent().addClass("unit-item-detail");
		$(this).parent().siblings(".unit-item-description").removeClass('unit-item-unshow');
	});


	$(document).on('click', '.unit-item-change', function() {
		$('.main-list-unit').addClass('shadow-show');
		$('.unit-change-box').fadeIn();
		let unit_id = $(this).parent().parent().find('.unit-item-id').text().split(": ")[1];
		let name = $(this).parent().parent().find('.unit-item-name').text();
		let text = $(this).parent().parent().find('.change-item-val').text();
		let arr = text.split(";");
		let data = {
			name: name,
			uc: arr[0],
			lecturer: arr[2],
			capacity: arr[4],
			campuse: arr[5],
			period: arr[6],
			description: arr[7]
		};

		let el =
			`
        <div class="unit-change-box">
            <div class="unit-change-close"><span>+</span></div>
            <div class="unit-change-input unit-change-input-name">
                <span>Name: &nbsp;</span>
                <input type="text" id="change-name">
            </div>
            <div class="unit-change-input">
                <span>UC ID:</span>
                <input type="text" id="change-uc">
            </div>
            <div class="unit-change-input">
                <span>Lecturer ID:</span>
                <input type="text" id="change-lecturer">
            </div>
            <div class="unit-change-input">
                <span>Capacity:</span>
                <input type="text" id="change-capacity">
            </div>
            <div class="unit-change-input">
                <span>Campuse:</span>
                <select class="form-control" name='expertise' required='required' id="change-campuses">
                    <option value='Pandora'>Pandora</option>
                    <option value='Rivendell'>Rivendell</option>
                    <option value='Neverland'>Neverland</option>
                </select>
            </div>
            <div class="unit-change-input">
                <span>Period:</span>
                <select class="form-control" name='expertise' required='required' id="change-periods">
                    <option value='Semester 1'>Semester 1</option>
                    <option value='Semester 2'>Semester 2</option>
                    <option value='Winter School'>Winter School</option>
                    <option value='Spring School'>Spring School</option>
                </select>
            </div>
            
            <div class="unit-change-descript">
                <textarea name=""  cols="30" rows="10" id="change-description"></textarea>
            </div>

            <div class="float-clear"></div>
            <div class="unit-change-btn">
                Change
            </div>
        </div>
        `
		$('.main-list').append(el);

		$('#change-name').val(data.name);
		$('#change-uc').val(data.uc);
		$('#change-lecturer').val(data.lecturer);
		$('#change-capacity').val(data.capacity);
		$('#change-campuses').val(data.campuse);
		$('#change-periods').val(data.period);
		$('#change-description').val(data.description);

		$('.unit-change-btn').unbind('click');
		$('.unit-change-btn').click(function() {
			let unit = {
				unit_id: unit_id,
				name: $('#change-name').val(),
				capacity: $('#change-capacity').val(),
				description: $('#change-description').val(),
				uc_id: $('#change-uc').val(),
				lecturer_id: $('#change-lecturer').val(),
				semester: $('#change-periods').val(),
				campus: $('#change-campuses').val()
			};
			(async () => {
				let data = await unitModifyByDC(unit);
				if (data.errcode === 0) {
					$('.unit-change-box').remove();
					$('.main-list-unit').removeClass('shadow-show');
					paintUnitItem();
				} else {
					alert(data.data)
				}
			})();
		});

		$('.unit-change-close').unbind('click');
		$('.unit-change-close').click(function() {
			$('.unit-change-box').remove();
			$('.main-list-unit').removeClass('shadow-show');
		})


	})
})(window, document);




//paint-unit
async function paintUnitItem() {

	let data = await unitRetrieve();
	if (data.errcode) {
		$('.main-list-unit').html(
			`
				<div style='height:100%;width:100%;display:flex;justify-content:center;align-items:center;'><h1>No unit</h1></div>
		`
		);
		return;
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
	data.data = arr = unitArr;


	let html = ''
	for (let i = 0; i < data.data.length; i++) {
		let obj = data.data[i];
		html +=
			`
					<div class="main-list-unit-item">
						<div class="unit-item-id">ID: ${obj.unit_id}</div>
						<div class="unit-item-name">${obj.name}</div>
						
						<div class="unit-item-lecturer unit-item-tip">UC ID:&nbsp;<span class="change-item-val">${obj.uc_id};</span></div>
						<div class="unit-item-uc unit-item-tip">UC:&nbsp;<span class="change-item-val">${obj.uc_name};</span></div>
						
						<div class="unit-item-lecturer unit-item-tip">Lecturer ID:&nbsp;<span class="change-item-val">${obj.lecturer_id};</span></div>
						<div class="unit-item-lecturer unit-item-tip">Lecturer:&nbsp;<span class="change-item-val">${obj.lecturer_name};</span></div>
						<div class="unit-item-capacity unit-item-tip">Capacity:&nbsp;<span class="change-item-val">${obj.capacity};</span></div>
						<div class="unit-item-campause unit-item-tip">Campause:&nbsp;<span class="change-item-val">${obj.campus};</span></div>
						<div class="unit-item-period unit-item-tip">Period:&nbsp;<span class="change-item-val">${obj.semester};</span></div>
						<div class="unit-item-description unit-item-unshow">Description:&nbsp;&nbsp;&nbsp;<p><span class="change-item-val">${obj.description};</span></p></div>
						<div class="unit-item-croll">
							<div class="unit-item-delete unit-item-controll">Delete</div>
							<div class="unit-item-change unit-item-controll">Modify</div>
							<div class="unit-item-show unit-item-controll">show detail</div>
						</div>
					</div>
			        `
	}
	$('.main-list-unit').html(html);

	$('.unit-item-delete').unbind('click');
	$('.unit-item-delete').click(async function() {
		let id = $(this).parent().parent().find('.unit-item-id').text().split(": ")[1]
		if (confirm('Are you sure to delete')) {
			let res = await unitDeleteByDC(id);
			if (!res.errcode) {
				$(this).parent().parent().remove();
			} else {
				alert(res.data)
			}
		}
	});
}




// paint-staff
async function paintStaffItem() {
	let data = await staffRetrieveByUC();
	console.log(data.data);
	if (data.errcode) {
		$('.main-staff-list').html(
			`
				<div style='height:100%;width:100%;display:flex;justify-content:center;align-items:center;'><h1>No staff</h1></div>
		`
		);
		return;
	}
	sessionStorage.setItem('all_staffs', JSON.stringify(data.data));
	let html = `
			<h1 style='text-align:center;width:100%;'>Academic Staff</h1>`
	for (let i = 0; i < data.data.length; i++) {
		let obj = data.data[i];
		html +=
			`
					
					<!-- staff -->
					<ul class='main-ul' class='main-staff'>
						<!-- Banner -->
						<li class='staff-id'>${data.data[i].staff_id}<span></span></li>
						<li>${data.data[i].name}<span></span></li>
						<li>${data.data[i].email}<span></span></li>
						<li>${data.data[i].address}<span></span></li>
						<li>${data.data[i].birth}<span></span></li>
						<li>${data.data[i].phone_number}<span></span>
						</li>
						<!-- Qualification -->
						<li>${data.data[i].qualification}<span></span>
						<li>${data.data[i].expertise}<span></span>
						<li>
							<button class='staff-item-edit'>Edit</button>
							<button class='staff-item-remove'>Remove</button>
							<button class='staff-item-time' value='${data.data[i].time}'>Time</button>
						</li>
					</ul>
			        `
	}
	$('.main-staff-list').html(html);

	$('.staff-item-edit').unbind('click');
	$('.staff-item-edit').click(async function() {

		$('.popup-btn-confirm').show();
		$('.popup-shadow').fadeIn();
		$('.popup').fadeIn();
	});

	$('.staff-item-remove').unbind('click');
	$('.staff-item-remove').click(async function() {
		let id = $(this).parent().parent().find('.staff-id').text();
		if (confirm('Are you sure to delete?')) {
			let res = await staffDeleteByDC(id);
			if (!res.errcode) {
				$(this).parent().parent().remove();
			} else {
				alert(res.data)
			}
		}
	});
	$('.staff-item-time').unbind('click');
	$('.staff-item-time').click(async function() {
		$('.popup-btn-confirm').hide();
		let html = paintTime($(this).attr('value'));
		$('.popup-content').html(html);
		$('.popup-shadow').fadeIn();
		$('.popup').fadeIn();
	});
}

function paintTime(timeStr) {
	let html = '';
	if (timeStr && timeStr != '[]') {
		let time = JSON.parse(timeStr);

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



function popup_hide() {
	if ($('.popup-shadow').css("display") !== 'none') {
		$('.popup').fadeOut();
		$('.popup-shadow').fadeOut();
	}
};




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
