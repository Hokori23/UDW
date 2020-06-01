(function(window, document) {
	window.onload = async function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		//getUserName
		(async function() {
			try {
				let res = await checkLogin();
				if (res.errcode == 0) {
					let user = getUser();
					$('.nav-name').text(user && user.name || '');
				}
			} catch (e) {
				alert(e && e.responseText || e)
			}
		})()

		paintDetail();

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
			for (let i = 0; i < arr.length; i++) {
				console.log();
				if (!arr[i].lecture_time || arr[i].lecture_time == '[]' || !arr[i].lecture_time.length) {
					arr.splice(i, 1);
					i--;
				}
			}
			console.log(arr);
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
	}

	function createDetail(item) {
		let lecture_time = JSON.stringify(item.lecture_time);
		let tutorial_time = JSON.stringify(item.tutorial_time);
		let el =
			`
        <div class="unit-item">
            <div class="unit-detail unit-id">ID: ${item.unit_id}</div>
            <div class="unit-detail unit-name">Name: ${item.name}</div>
            <div class="unit-detail unit-lecturer">Lecturer: ${item.lecturer_name}</div>
            <div class="unit-detail unit-campus">Campus: ${item.campus}</div>
            <div class="unit-detail unit-capacity">Capacity: ${item.capacity}</div>
            <div class="unit-detail unit-lecture-time">Lecture Time: ${lecture_time}</div>
            <div class="unit-detail unit-tutorial-time">Tutorial Time: ${tutorial_time}</div>
            <div class="unit-detail unit-uc">UC: ${item.uc_name}</div>
            <div class="unit-detail unit-tutor">Tutor: ${item.tutor_name}</div>
            <div class="unit-detail unit-description">Desctiption: ${item.description}</div>
        </div>
        `
		return el;
	}
})(window, document);

// choose unit
((window, document) => {

	$(document).on('click', '.unit-tochoose', function() {
		window.location.href = './unitEnrollment.html'
	})

})(window, document);


(() => {
	$('.nav-btn').click(() => {
		location.href = '../home.html'
	})
})();
