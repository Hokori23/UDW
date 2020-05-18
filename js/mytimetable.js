/* * * * * * * *
 * DOM Variable*
 * * * * * * * */
const backBtn = $('.back-btn')


/* * * * * * *
 * Mock Data *
 * * * * * * */
const Data = [{
		'Unit': 'Web Development',
		'Lecture time': ['9-11,Wed'],
		'Tutorial time': ['13-14,Tue', '15-17,Tue']
	},
	{
		'Unit': 'ICT Professional Practices and Project Management',
		'Lecture time': ['16-17,Wed'],
		'Tutorial time': ['14-16,Thu']
	},
	{
		'Unit': 'Knowledge and Information Management',
		'Lecture time': ['13-15,Fri'],
		'Tutorial time': ['11-13,Thu']
	},
]

/* * * * * * * * * *
 * Paint Timetable *
 * * * * * * * * * */
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
		Data[j]['Lecture time'].forEach((item, index) => {
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
		Data[j]['Tutorial time'].forEach((item, index) => {
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

/* * * * * * * * *
 * Event Listener*
 * * * * * * * * */
//BackWardBTN
backBtn.click(() => {
	history.go(-1)
});