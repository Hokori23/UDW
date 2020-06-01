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
				alert("Only student accessable");
				location.href = '../home.html';
				return;
			}
			$('.nav-name').text(user && user.name || '');
		} catch (e) {
			console.log(e)
			alert(e.responseText)
		}
		unitQuery();
	}

	const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	async function unitQuery() {
		try {
			let res = await unitQueryByStudent();
			if (res.errcode) {
				res.data.length && alert(res.data);
				if (res.errcode == 401) {
					//back
				}
			} else {
				console.log(res.data);
				let unitNameMap = new Map();
				let unitArr = [];
				let flag = 0;
				for (let i = 0; i < res.data.length; i++) {
					if (!unitNameMap.has(res.data[i].name)) {
						if (res.data[i].time) {
							unitNameMap.set(res.data[i].name, flag);
							unitArr.push({
								Unit: res.data[i].name
							})
							if (res.data[i].type == 1) {
								//Lecture Time
								unitArr[flag]['Lecture time'] = JSON.parse(res.data[i].time);
							} else {
								//Tutor Time
								unitArr[flag]['Tutorial time'] = JSON.parse(res.data[i].time);
							}

							flag++;
						}
					} else {
						if (res.data[i].time) {
							let position = unitNameMap.get(res.data[i].name);
							if (res.data[i].type == 1) {
								//Lecture Time
								let temArr = JSON.parse(res.data[i].time);
								unitArr[position]['Lecture time'] = unitArr[position]['Lecture time'] || [];
								unitArr[position]['Lecture time'] = unitArr[position]['Lecture time'].concat(temArr);
							} else {
								//Tutor Time
								let temArr = JSON.parse(res.data[i].time);
								unitArr[position]['Tutorial time'] = unitArr[position]['Tutorial time'] || [];
								unitArr[position]['Tutorial time'] = unitArr[position]['Tutorial time'].concat(temArr);
							}
						}
					}
				}
				paint(unitArr)
			}
		} catch (e) {
			console.log(e);
			alert(e.responseText);
		}
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


(() => {
	$('.nav-btn').click(() => {
		location.href = '../home.html'
	})
})();
