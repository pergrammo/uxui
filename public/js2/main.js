// call mainlist fn.




$(function () {

	// check user
	//if (!sessionStorage.getItem("mid")) {sessionStorage.clear(); HealthverseObj.redirect("login.html", 1000);}

	/*
	// generate id
	let get_id = HealthverseObj.get_qstring(window.location.href, "_p_");

	// check page
	switch (get_id) {
		case "0":
			// remove class
			//$("#p1").removeClass("nav__link--active");
			// add class
			$("#p" + get_id).addClass("nav__link--active");
			// set slider
			//$(".slider").css({ "left": "0%" });
			// get news
			//Newsloan.newsstart();
			break;
		case "1":
			// remove class
			$("#p0").removeClass("nav__link--active");
			// add class
			$("#p" + get_id).addClass("nav__link--active");
			// set slider
			//$(".slider").css({ "left": "33.33%" });
			// get mainlist
			//Mainim.mainlist();
			break;
		case "2":
			// remove class
			$("#p0").removeClass("nav__link--active");
			// add class
			$("#p" + get_id).addClass("nav__link--active");
			// set slider
			//$(".slider").css({ "left": "66.66%" });
			// get history
			//Historyloan.historystart();
			break;
		default:
			// add class
			$("#p" + get_id).addClass("nav__link--active");
			// set slider
			//$(".slider").css({ "left": "0%" });
			// get mainlist
			//Mainim.mainlist();
			break;
	}
	*/

	const useNodeJS = true;   // if you are not using a node server, set this value to false
	const defaultLiffId = "2000349383-Zpx6dd0E";   // change the default LIFF value if you are not using a node server

	// DO NOT CHANGE THIS
	let myLiffId = "";

	// if node is used, fetch the environment variable and pass it to the LIFF method
	// otherwise, pass defaultLiffId

	if (useNodeJS) {
		liff.init({
			liffId: defaultLiffId
		}).then(() => {
			if (!liff.isLoggedIn()) {
				liff.login();
			}
			else {
				myLiffId = defaultLiffId;
				Lineapi.initializeLiffOrDie(myLiffId);
			}
		})
	}
	else {
		myLiffId = defaultLiffId;
		Lineapi.initializeLiffOrDie(myLiffId);
	}
})

// Lineapi Class
const Lineapi = (function () {
	let lineobj = {};

	/**
	* Check if myLiffId is null. If null do not initiate liff.
	* @param {string} myLiffId The LIFF ID of the selected element
	*/
	lineobj.initializeLiffOrDie = function (myLiffId) {
		if (!myLiffId) {
			HealthverseObj.notify_loading(`เข้าระบบ Line, ก่อนใช้งาน!`);
		} else {
			console.log(myLiffId)
			lineobj.initializeLiff(myLiffId);
		}
	}

	/**
	* Initialize LIFF
	* @param {string} myLiffId The LIFF ID of the selected element
	*/
	lineobj.initializeLiff = function (myLiffId) {
		liff
			.init({
				liffId: myLiffId
			})
			.then(() => {
				// start to use LIFF's api
				lineobj.initializeApp();
			})
			.catch((err) => {
				HealthverseObj.notify_loading(`เข้าระบบ Line, ก่อนใช้งาน!`);
			});
	}

	/**
	  * Initialize the app by calling functions handling individual app components
	  */
	lineobj.initializeApp = function () {

		// check if the user is logged in/out, and disable inappropriate button
		if (liff.isLoggedIn()) {
			// get mainlist
			Mainim.mainlist(liff);

			// get navbar fn.
			HealthverseObj.navbar(liff);

			// get notification fn.
			$('#page-notify').click(function () {
				Notificationim.notificationstart(liff);
			});
		} else {
			HealthverseObj.notify_loading(`เข้าระบบ Line, ก่อนใช้งาน!`);
		}
	}

	return lineobj;
})();

// Mainim Class
const Mainim = (function () {
	let mainimobj = {};

	// mainlist fn.
	mainimobj.mainlist = function (liff) {

		// clean data
		$('#content').empty();

		liff.getProfile().then(function (profile) {

			// get collectmainlist fn.
			mainimobj.collectmainlist(profile)

			// get querymainlist fn.
			mainimobj.querymainlist(profile)

		}).catch(function (error) {
			HealthverseObj.notify_loading(`Error getting profile: ` + error)
		});

		/*
		// get fastloan submit.
		$('#fastloan').click(function () {
			window.open("agreement.html", "_self");
		});

		// get fastloansub submit.
		var arrfl = ["a", "b", "c", "d"];
		arrfl.forEach(function (item, index) {
			$('#fastloansub_' + item).click(function () {
				window.open("agreement.html", "_self");
			});
		});

		// get assetloan submit.
		$('#assetloan').click(function () {
			HealthverseObj.notify_loading(`รอการเปิดใช้งานระบบ`);
			//window.open("agreement.html", "_self");
		});
		*/
	}

	// collectmainlist fn.
	mainimobj.collectmainlist = function (profile) {

		// call url set_collectmainlist
		

		// set input data
		let uid = profile.userId
		let displayname = profile.displayName
		let picture = profile.pictureUrl
		const url_set_collectmainlist = HealthverseObj.get_server("api/v1/point/getOnePoint/"+uid);
		// input form
		let data = new FormData()
		data.append("uid", uid)
		data.append("displayname", displayname)
		data.append("picture", picture)

		if (uid) {
			$.ajax({
				url: url_set_collectmainlist,
				type: "POST",
				dataType: "jsonp",
				beforeSend: () => { },
				processData: false,
				contentType: false,
				data: data,
				success: (result) => {
					const obj = jQuery.parseJSON(result)
					console.log()
					switch (obj.status) {
						case "0":
							HealthverseObj.notify_loading(obj.msg)
							console.log(obj.msg)
							break
						case "1":
							// change read status (N)
							if (obj.read == "N") { $("#page-notify").css({ "color": "#FF0000" }) } //else { $("#page-notify").css({ "color": "#161e2d" }) }
							console.log(obj.msg)
							break
						default:
							HealthverseObj.notify_loading(obj.msg)
							console.log(obj.msg)
							break
					}
				},
				complete: () => { }
			})
		} else {
			// check empty
			HealthverseObj.notify_loading(`เข้าระบบ Line, ก่อนใช้งาน!`)
			return
		}
	}

	// querymainlist fn.
	mainimobj.querymainlist = function (profile) {
		// call url pointdata
		const sid = profile.userId;
		const url_pointdata = HealthverseObj.get_server("api/v1/point/getPointData/"+sid);

		// clean data
		$('#content').empty();

		// load data
		$.ajax({
			url: url_pointdata,
			type: "POST",
			beforeSend: () => { HealthverseObj.notify_loading(`กำลังโหลดข้อมูล...`) },
			data: {},
			success: (obj) => {
				
				// parse data
				// empty data
				if (!obj.point_uname) { obj.point_uname = profile.displayName }
				if (!obj.point_uimage) { obj.point_uimage = profile.pictureUrl }

				// no point
				if (!obj.campaign_total) { obj.campaign_total = "0" }

				$('#content').append(`
					<div class="main-topic-cover">
						<ul class="main-topic">
							<li class="ta-ct">
								<img src="` + obj.Uimage + `" class="main-queue3" />
							</li>
							<li class="ta-ct">
								<span class="main-topic-text1"><strong>` + obj.Uname + `</strong></span>
							</li>
							<li style="padding: 20px 0; text-align: center;">
								<div class="main-queue2">
									<ul class="main-queue2">
										<li class="mg-t-20 ta-ct"><span class="main-topic-text3">ยอดคงเหลือ</span></li>
										<li class="mg-tp-0 ta-ct"><span class="main-topic-text4"><strong>` + obj.Utotal + ` HVP</strong></span></li>
									</ul>
								</div>
							</li>
							<li class="ta-ct">
								<img src="img/05_profile/hvimage.png" style="width: 100%;" />
							</li>
						</ul>
					</div>
				`);
			},
			complete: () => { $("#notify").removeClass("show") }
		})
	}

	return mainimobj;
})();