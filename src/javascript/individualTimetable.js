(function(window, document) {
	window.onload = function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');
		unitQueryAll()
	}

	const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	function unitQueryAll() {

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
		
		$.ajax({
			url: '../../php/api/unit/studentquery.php',
			success(data) {
				if (data.errcode) {
					alert(data.data)
					if(data.errcode==401){
						//back
					}
				} else {
					let unitNameMap = new Map();
					let unitArr = [];
					let flag = 0;
					for (let i = 0; i < data.data.length; i++) {
						if (!unitNameMap.has(data.data[i].name)) {
							unitNameMap.set(data.data[i].name, flag);
							unitArr.push({
								Unit: data.data[i].name
							})
							if (data.data[i].type == 1) {
								//Lecture Time
								unitArr[flag]['Lecture time'] = JSON.parse(data.data[i].time);
							} else {
								//Tutor Time
								unitArr[flag]['Tutorial time'] = JSON.parse(data.data[i].time);
							}

							flag++;
						} else {
							let position = unitNameMap.get(data.data[i].name);
							if (data.data[i].type == 1) {
								//Lecture Time
								unitArr[position]['Lecture time'] = JSON.parse(data.data[i].time);
							} else {
								//Tutor Time
								unitArr[position]['Tutorial time'] = JSON.parse(data.data[i].time);
							}
						}
					}
					paint(unitArr)
				}
			},
			error(e) {
				console.log(e)
			}
		})
	}

	function paint(Data) {

		for (let i = 0; i < week.length; i++) {
			//Paint Basis
			let html = `<div class='header-item'>${week[i]}</div>`
			for (let i = 7; i < 18; i++) {
				html += `
				<div class='rol-item unit' time='${i}'>
				</div>
				`
			}
			$('.flex-col.col-group.' + week[i]).html(html);

			for (let j = 0; j < Data.length; j++) {
				//Attach Lecture time
				Data[j]['Lecture time'] && Data[j]['Lecture time'].forEach((item, index) => {
					let date = item.split(',');
					if (date[1] === week[i]) {
						let time = date[0].split('-');
						let height = (Number(time[1]) - Number(time[0])) * 80;
						let html =
							`
						<div class='attach-unit lec' style="height:${height}px;-webkit-line-clamp:${height/20}">
							${Data[j].Unit}
						</div>
					`
						$('.flex-col.col-group.' + week[i]).find(`.rol-item.unit[time=${time[0]}]`).html(html)
					}
				})
				//Attach Tutorial time
				Data[j]['Tutorial time'] && Data[j]['Tutorial time'].forEach((item, index) => {
					let date = item.split(',');
					if (date[1] === week[i]) {
						let time = date[0].split('-');
						let height = (Number(time[1]) - Number(time[0])) * 80;
						let html =
							`
						<div class='attach-unit tut' style="height:${height}px;-webkit-line-clamp:${height/20}">
							${Data[j].Unit}
						</div>
					`
						$('.flex-col.col-group.' + week[i]).find(`.rol-item.unit[time=${time[0]}]`).html(html)
					}
				})
			}
		}

	}
})(window, document);
