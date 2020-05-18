/* * * * * * * * *
 * DOM Variable  *
 * * * * * * * * */
const unitList = $('#unit--list');
const backBtn = $('.back-btn');

/* * * * * * *
 * Mock Data *
 * * * * * * */
const staff = [{
	Name: 'Tony',
	Qualification: 'PHD',
	Expertise: 'Information Systems',
	'Preferred days of teaching': '1201', //days
	'Consultation hours': '5603' //hours
}, {
	Name: 'Sam',
	Qualification: 'PHD',
	Expertise: 'Human Computer Interaction',
	'Preferred days of teaching': '900', //days
	'Consultation hours': '4421' //hours
}, {
	Name: 'Liam',
	Qualification: 'Master',
	Expertise: 'Network Administration',
	'Preferred days of teaching': '1345', //days
	'Consultation hours': '4774' //hours
}, ]


const lecture = [{
	'Unit': 'ICT Systems Strategy and Management',
	'Unit Coordinator': 'Tom',
	'Lecture': 'Tony',
	'Semester': ['Semester 1'],
	'Available Semester': ['Semester 1', 'Winter School', 'Spring School'],
	'Campus': ['Rivendell'],
	'Available Campus': ['Pandora', 'Rivendell', 'Neverland']

}, {
	'Unit': 'Enterprise Architecture and Systems',
	'Unit Coordinator': 'Tom',
	'Lecture': 'Liam',
	'Semester': ['Semester 1', 'Semester 2'],
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School'],
	'Campus': ['Pandora', 'Rivendell'],
	'Available Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Network Security Techniques and Technology',
	'Unit Coordinator': 'Tom',
	'Lecture': 'Sam',
	'Semester': ['Semester 2', 'Winter School'],
	'Available Semester': ['Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Rivendell', 'Neverland'],
	'Available Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Knowledge and Infomation Management',
	'Unit Coordinator': 'Tom',
	'Lecture': 'Tony',
	'Semester': ['Semester 1', 'Spring School'],
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland'],
	'Available Campus': ['Pandora', 'Rivendell', 'Neverland']
}];


/* * * * * * *
 * Painting  *
 * * * * * * */
//Paint Lecture and Lecturer Info
const paint = () => {
	let html = '';
	for (let i = 0; i < lecture.length; i++) {
		html += `<li class='list-group-item'>`
		for (let j in lecture[i]) {
			let str = ''
			let height = 'auto';
			if (j === 'Semester' || j === 'Campus') {
				continue;
			} else if (j === 'Available Semester') {
				height = 21 * lecture[i][j].length;
				str = `<select multiple class="form-control" style='height:${height}px'>`
				lecture[i][j].forEach((item, index) => {
					let selectedIndex = lecture[i]['Semester'].indexOf(item);
					if (selectedIndex !== -1) {
						str += `<option value='${item}' selected="selected">${item}</option>`
					} else {
						str += `<option value='${item}'>${item}</option>`
					}
				})
				str += `</select>`;
				html +=
					`<div class='flex-row-between' style='height:${height}px'>
						<div>
							Semster: 
						</div>
						<div>
							<span class='text-info'>
								${str}
							</span>
						</div>
					</div>`
			} else if (j === 'Available Campus') {
				height = 21 * lecture[i][j].length;
				str = `<select multiple class="form-control" style='height:${height}px'>`
				lecture[i][j].forEach((item, index) => {
					let selectedIndex = lecture[i]['Campus'].indexOf(item);
					if (selectedIndex !== -1) {
						str += `<option value='${item}' selected="selected">${item}</option>`
					} else {
						str += `<option value='${item}'>${item}</option>`
					}
				})
				str += `</select>`;
				html +=
					`<div class='flex-row-between' style='height:${height}px'>
						<div>
							Campus: 
						</div>
						<div>
							<span class='text-info'>
								${str}
							</span>
						</div>
					</div>`
			} else {
				str = lecture[i][j]
				html +=
					`<div class='flex-row-between' style='height:${height}px'>
						<div>
							${j}: 
						</div>
						<div>
							<span class='text-info'>
								${str}
							</span>
						</div>
					</div>`
			}
		}
	}
	html+=`	<li class='list-group-item'>
				<div class='flex-row-end li-btn-group'>
					<button class='btn btn-warning' onclick="paint()">
						Reset
					</button>
					<button class='btn btn-primary'>
						Add a unit
					</button>
					<button class='btn btn-success'>
						Save
					</button>
				</div>
			</li>`
	//Paint Lecture Info
	unitList.html(html)
}
paint()
/* * * * * * * * *
 * Event Listener*
 * * * * * * * * */

//BackWardBTN
backBtn.click(() => {
	history.go(-1)
});
