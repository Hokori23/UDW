/* * * * * * * * *
 * DOM Variable  *
 * * * * * * * * */
const staffList = $('#staff--list');
const backBtn = $('.back-btn');
const page = $('#master-staff--page');
const allocate = $('#master-staff--allocate');
const backBtnShow = $('.back-btn--show');
const lectureList = $('#lecture--list');

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
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']

}, {
	'Unit': 'Enterprise Architecture and Systems',
	'Unit Coordinator': 'Tom',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Network Security Techniques and Technology',
	'Unit Coordinator': 'Tom',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}, {
	'Unit': 'Knowledge and Infomation Management',
	'Unit Coordinator': 'Tom',
	'Available Semester': ['Semester 1', 'Semester 2', 'Winter School', 'Spring School'],
	'Campus': ['Pandora', 'Rivendell', 'Neverland']
}];


/* * * * * * *
 * Painting  *
 * * * * * * */

{
	let html = '';
	for (let i = 0; i < staff.length; i++) {
		html += `<li class='list-group-item'>`
		for (let j in staff[i]) {
			let str = '';
			if (j === 'Preferred days of teaching') {
				str = staff[i][j] + ' days'
			} else if (j === 'Consultation hours') {
				str = staff[i][j] + ' hours'
			} else {
				str = staff[i][j]
			}
			html +=
				`<div class='flex-row-between'>
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
		//Edit button group
		html +=
			`<div class='button--group'>
				<button class='btn btn-primary'>
					Edit
				</button>
				<button class='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>`
	}
	//Add area
	html +=
		`<li class='list-group-item'>
			<div class='button--group list-bottom'>
				<button class='btn btn-warning' id='allocate-btn'>
					 Allocate the lecturer
				</button>
				<button class='btn btn-success'>
					Add a new staff
				</button>
			</div>
		</li>`
	//Paint Staff Info
	staffList.html(html)
}


//Paint Lecture and Lecturer Info
{
	let html = '';
	for (let i = 0; i < lecture.length; i++) {
		html += `<li class='list-group-item'>`
		for (let j in lecture[i]) {
			let str = ''
			if (j === 'Available Semester') {
				str = `<select class='form-control' name='semester'>`
				for (let x = 0; x < lecture[i][j].length; x++) {
					str += `<option value='${lecture[i][j][x]}'>${lecture[i][j][x]}</option>`
				}
				str += `</select>`
			} else if (j === 'Campus') {
				str = `<select class='form-control' name='campus'>`
				for (let x = 0; x < lecture[i][j].length; x++) {
					str += `<option value='${lecture[i][j][x]}'>${lecture[i][j][x]}</option>`
				}
				str += `</select>`
			} else {
				str = lecture[i][j]
			}
			html +=
				`<div class='flex-row-between'>
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
		//Edit button group
		html +=
			`<div class='button--group'>
				<button class='btn btn-success'>
					Edit
				</button>
			</div>
		</li>`
	}
	//Paint Lecture Info
	lectureList.html(html)
}

/* * * * * * * * *
 * Event Listener*
 * * * * * * * * */

//BackWardBTN
backBtn.click(() => {
	history.go(-1)
});

//Allocate
const allocateBtn = $('#allocate-btn')
allocateBtn.click(() => {
	page.addClass('hidden')
	allocate.removeClass('hidden')
})
//Allocate back
backBtnShow.click(() => {
	page.removeClass('hidden')
	allocate.addClass('hidden')
})
