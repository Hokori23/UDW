/* * * * * * * * *
 * DOM Variable  *
 * * * * * * * * */
const content = $('#enroll--content')
const backBtn = $('.back-btn')



/* * * * * * *
 * Mock Data *
 * * * * * * */
const listData = [{
	'Unit': 'ICT Systems Strategy and Management',
	'Available Semester': ['Semester 1', 'Semester2'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']

}, {
	'Unit': 'Enterprise Architecture and Systems',
	'Available Semester': ['Semester 1', 'Semester2'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Network Security Techniques and Technology',
	'Available Semester': ['Semester 1', 'Semester2'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Knowledge and Infomation Management',
	'Available Semester': ['Semester 1', 'Semester2'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}];



/* * * * *
 * Paint *
 * * * * */
//Paint Function
const paint = (listData) => {
	let html = ''
	for (let j = 0; j < listData.length; j++) {
		html += `<div class='enroll--content--box'>`
		for (let i in listData[j]) {
			if (i === 'Available Semester') {
				let str = ''
				listData[j][i].map((item, index, arr) => {
					return str += `<option value='${item}'>${item}</option>`
				})
				html +=
					`
			<div class='row enroll--content--item bg-warning'>
			${i}: <div class="input-group enroll--content--select">
							<select class="form-control" name='semester'>
							${str}
							</select>
						</div>
			</div>
				`
			} else if (i === 'Campus') {
				let str = ''
				listData[j][i].map((item, index, arr) => {
					return str += `<option value='${item}'>${item}</option>`
				})
				html +=
					`
			<div class='row enroll--content--item bg-warning'>
			${i}: <div class="input-group enroll--content--select">
							<select class="form-control" name='campus' required='required'>
							${str}
							</select>
							</div>
							<div class='row enroll--content--item bg-warning flex-row-end'>
							<div class='btn btn-success enroll--content--btn'>Enroll</div>
					</div>
			</div>
				`
			} else {
				html +=
					`
			<div class='row enroll--content--item bg-warning'>
				${i}: <span class='text-info'>${listData[j][i]}</span>
			</div>`
			}
		}

		html += `</div>`
	}
	content.html(html)
}

//Paint First Content
paint(listData)





/* * * * * * * * * *
 * Event Listener  *
 * * * * * * * * * */
//BackWardBTN
backBtn.click(() => {
	history.go(-1)
});
