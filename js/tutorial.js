/* * * * * * * * *
 * DOM Variable  *
 * * * * * * * * */
const content = $('#tutorial-content')
const backBtn = $('.back-btn');

/* * * * * * *
 * Mock Data *
 * * * * * * */
const Data = [{
		'Unit': 'Web Development',
		'Tutorial time': ['13-14,Tue', '15-17,Tue'],
		'Location': ['Pandora', 'Rivendell', 'Neverland'],
		'Capacity': 30
	},
	{
		'Unit': 'ICT Professional Practices and Project Management',
		'Tutorial time': ['14-16,Thu', '8-10,Fri'],
		'Location': ['Pandora'],
		'Capacity': 30
	},
	{
		'Unit': 'Knowledge and Information Management',
		'Tutorial time': ['11-13,Thu', '14-16,Mon'],
		'Location': ['Pandora', 'Rivendell'],
		'Capacity': 30
	},
]

/* * * * * * *
 * Painting  *
 * * * * * * */
let html = ''
for (let i = 0; i < Data.length; i++) {
	let timeSelect = '';
	let locationSelect = '';
	Data[i]['Tutorial time'].forEach((item, index) => {
		let time = item.split(',')[0].split('-');
		time.forEach((item, index) => {
			if (Number(item) >= 12) {
				time[index] = Number(item) - 12 + ':00 PM'
			} else {
				time[index] = item + ':00 AM'
			}
		})
		let timeText =time.join(' - ')+'  '+item.split(',')[1];
		timeSelect += `<option value='${timeText}'>${timeText}</option>`
	})
	
	Data[i]['Location'].forEach((item, index) => {
		locationSelect += `<option value='${item}'>${item}</option>`
	})
	
	html +=
		`
			<div class='flex-row tutorial-row'>
				<div class='flex-col'>
					<div>Unit: <span class='text-warning text-bold text'>${Data[i]['Unit']}</span></div>
					<div>Capacity: <span class='text-warning text-bold text'>${Data[i]['Capacity']}</span></div>
				</div>
				<div class='flex-row edit-group'>
					<div class="input-group">
						<select class="form-control" name='time'>
							${timeSelect}
						</select>
					</div>
					<div class="input-group">
						<select class="form-control" name='time'>
							${locationSelect}
						</select>
					</div>
					<div class='btn btn-primary'>
						Edit
					</div>
				</div>
			</div>
		`
}
content.html(html)

/* * * * * * * * *
 * Event Listener*
 * * * * * * * * */
//BackWardBTN
backBtn.click(() => {
	history.go(-1)
});