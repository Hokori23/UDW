(function(window, document) {
	window.onload = function() {
		$('.main-title-line').addClass('main-title-ani');
		$('.nav').addClass('nav_slide');

		//getUserName
		(async function() {
			try {
				let res = await checkLogin();
				if (!res.errcode) {
					let user = getUser();
					$('.nav-name').text(user.name || '');
					$('.login').find('span').html('Log out');
				}
			} catch (e) {
				alert(e.responseText)
			}
		})()
	}
})(window, document);

((window, document) => {
	const $ = ele => typeof ele === "string" ? document.querySelector(ele) : "";
	let CLICK = 0;
	const con = $(".nav-btn");
	const slide = $('.nav');
	con.classList.add("nav-btn-click");


	con.onmouseenter = () => con.classList.add("nav-btn-hover");
	con.onmouseleave = () => con.classList.remove("nav-btn-hover");

	con.onclick = () => {
		if (CLICK === 0) {
			con.classList.remove("nav-btn-hover");
			con.classList.remove("nav-btn-click");
			slide.classList.remove("nav_slide");
			CLICK = 1;
		} else {
			con.classList.add("nav-btn-click");
			slide.classList.add("nav_slide");
			CLICK = 0;
		}
	}
	// window.onclick = e => {
	//     if( e.target.className.split(' ')[0] !== "nav-btn" && e.target.className.split(' ')[0] !== "line" ) 
	//         con.classList.remove("nav-btn-click");
	// }

})(window, document);


(function(window, document) {
	$('.register').mouseenter(function() {
		$(".sign-light-box").addClass("sign-light-box-ani")
		$('.login').addClass('choose-color-one')
		$('.register').addClass('choose-color-two')
	})
	$('.register').mouseleave(function() {
		$(".sign-light-box").removeClass("sign-light-box-ani")
		$('.login').removeClass('choose-color-one')
		$('.register').removeClass('choose-color-two')
	})

})(window, document);

(function(window, document) {
	$('.login').click(function() {
		if ($('.login').find('span').html() === 'Login') {
			$('.main-login').removeClass('main-login-tran')
		} else {
			(async function() {
				try {
					let res = await logOut();
					alert(res.data)
					if (!res.errcode) {
						$('.nav-name').text('');
						$('.login').find('span').html('Login');
					}
				} catch (e) {
					alert(e.responseText)
				}
			})()
		}
	})
	$('.login-fork-btn').click(function() {
		$('.main-login').addClass('main-login-tran')
	})
})(window, document);

(function(window, document) {
	$('.login-btn').click(function() {
		let data = {
			id: $('#sid').val(),
			password: $("#spassword").val()
		}

		if (data.id.length == 7) {
			homeStudentLogin(data)
		}

		if (data.id.length == 12) {
			homeStaffLogin(data)
		}

	})


	async function homeStudentLogin(data) {
		try {
			let res = await studentLogin(data);
			if (res.errcode === 0) {
				localStorage.setItem("udw", JSON.stringify(res.data));
				$('.main-login').addClass('main-login-tran')
				alert('Login successfully');
				let user = getUser();
				$('.nav-name').text(user.name || '');
				$('.login').find('span').html('Log out');
			} else alert(res.data);
		} catch (e) {
			alert(e)
		}
	}

	async function homeStaffLogin(data) {
		try {
			let res = await staffLogin(data);
			console.log(res)
			if (res.errcode === 0) {
				localStorage.setItem("udw", JSON.stringify(res.data));
				$('.main-login').addClass('main-login-tran')
				alert('Login successfully');
				let user = getUser();
				$('.nav-name').text(user.name || '');
				$('.login').find('span').html('Log out');
			} else alert(res.data);
		} catch (e) {
			alert(e)
		}
	}
})(window, document);
