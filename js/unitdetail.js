/* * * * * * * *
 * DOM Variable*
 * * * * * * * */
let menuToggle = $('#menu-toggle')
let list = $('#detail--list');
let content = $('#detail--content')
let backBtn = $('.back-btn')

/* * * * * * * 
 * Mock Data *
 * * * * * * */
const listData = [{
	'Unit': 'ICT Systems Strategy and Management',
	'Unit Coordinator': 'Tom',
	'Lecturer': 'John',
	'Desp': 'A lecture',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']

}, {
	'Unit': 'Enterprise Architecture and Systems',
	'Unit Coordinator': 'Tom',
	'Lecturer': 'John',
	'Desp': 'A lecture',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Network Security Techniques and Technology',
	'Unit Coordinator': 'Tom',
	'Lecturer': 'John',
	'Desp': 'A lecture',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Knowledge and Infomation Management',
	'Unit Coordinator': 'Tom',
	'Lecturer': 'John',
	'Desp': 'A lecture',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}];




/* * * * * * *
 * Painting  *
 * * * * * * */

//Paint List
let html = '';
for (let i = 0; i < listData.length; i++) {
	let listItem = `
			<div class='row detail--list--item btn btn-success'>
				${listData[i].Unit}
			</div>`
	html += listItem;
}
list.html(html)

//Paint Function
let paint = (listData) => {
	let html = ''
	for (let i in listData) {
		if (i === 'Available Semester') {
			html +=
				`
			<div class='row detail--content--item bg-warning'>
			${i}: ${listData[i].join(',')}
			</div>
				`
		} else if (i === 'Campus') {
			html +=
				`
			<div class='row detail--content--item bg-warning'>
			${i}: ${listData[i].join(',')}
			</div>
				`
		} else {
			html +=
				`
			<div class='row detail--content--item bg-warning'>
				${i}: <span class='text-info'>${listData[i]}</span>
			</div>`
		}
	}
	html +=
		`
				<div class='row detail--content--item bg-warning flex-row-end'>
				<a href='unitenroll.html'>Here to enroll</a>
				</div>
				`
	content.html(html)
}

//Paint First Content
paint(listData[0])




/* * * * * * * * * *
 * Event Listener  *
 * * * * * * * * * */

//MenuToggleBTN
menuToggle.click(() => {
	list.toggle()
});

//BackWardBTN
backBtn.click(() => {
	history.go(-1)
});

//MenuItemPaint
for (let i = 0; i < list.children().length; i++) {
	list.children()[i].onclick = () => {
		paint(listData[i])
	}
}
