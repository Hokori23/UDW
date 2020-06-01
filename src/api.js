/** COMMON*/
function checkLogin() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/checklogin.php',
			success(data) {
				if (data.errcode) {
					localStorage.removeItem('udw')
				}
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function logOut() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/logout.php',
			success(data) {
				if (!data.errcode) {
					localStorage.removeItem('udw')
				}
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function getUser() {
	return JSON.parse(localStorage.getItem("udw"));
}

/** STAFF*/

function staffGetSelf() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/getself.php',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffLogin(data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/login.php',
			data: data,
			method: 'POST',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffRegister(staff) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/register.php',
			data: staff,
			method: 'POST',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffModifySelf(staff) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/modify.php',
			data: staff,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffModifyTime(time){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/modifytime.php',
			data: time,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffModifyByUC(staff) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/modify.php',
			data: staff,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffDeleteByDC(id) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/delete.php',
			data: {
				id: id,
			},
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffCreateByUC(staff) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/register.php',
			data: staff,
			method: 'POST',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function staffRetrieveByUC() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/staff/queryall.php',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

/** STUDENT*/

function studentGetSelf() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/student/getself.php',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function studentLogin(data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/student/login.php',
			method: 'POST',
			data: data,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function studentRegister(student) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/student/register.php',
			method: 'POST',
			data: student,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function studentModify(student) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/student/modify.php',
			data:student,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

/** UNIT*/

function unitCreateByDC(unit) {
	let {
		name,
		uc_id,
		lecturer_id,
		capacity,
		description,
		semester,
		campus
	} = unit;
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/create.php',
			data: {
				name: name,
				uc_id: uc_id,
				lecturer_id: lecturer_id,
				capacity: capacity,
				description: description,
				semester: semester,
				campus: campus
			},
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function unitModifyByDC(unit) {
	let {
		unit_id,
		name,
		uc_id,
		lecturer_id,
		capacity,
		description,
		semester,
		campus
	} = unit;
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/modify.php',
			data: {
				unit_id: unit_id,
				name: name,
				uc_id: uc_id,
				lecturer_id: lecturer_id,
				capacity: capacity,
				description: description,
				semester: semester,
				campus: campus
			},
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function unitDeleteByDC(unit_id) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/delete.php',
			data: {
				unit_id: unit_id
			},
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function unitModifyByUC(unit) {

	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/modify.php',
			data: unit,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})

}

function unitRetrieve() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/queryall.php',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function unitEnroll(unit) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/enroll.php',
			data: unit,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function unitQueryByStudent() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/studentquery.php',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

function allStudentUnitDetails(){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/queryenrolled.php',
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}

/** UNIT_TIME*/
function unitTimeModifyByUC(unit_time) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: './php/api/unit/time.php',
			data: unit_time,
			success(data) {
				resolve(data)
			},
			error(e) {
				reject(e)
			}
		})
	})
}
