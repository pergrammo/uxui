// Notificationim Classdata
const Notificationim = (function () {
	let notificationobj = {};

	// notificationstart fn.
	notificationobj.notificationstart = function (liff) {
		// check user
		//if (!sessionStorage.getItem("mid")) {sessionStorage.clear(); TreasuryIm.redirect("login.html", 1000);}
		//var get_mid = "00005";

		// get page-name
		$('#page-name').empty();
		$('#page-name').append(`<strong>อัพเดต</strong>`);

		liff.getProfile().then(function (profile) {
			// get readnotification
			notificationobj.readnotification(profile);

			// get notification
			notificationobj.notification(profile);

		}).catch(function (error) {
			HealthverseObj.notify_loading(`Error getting profile: ` + error)
		});
	}

	// readnotification fn.
	notificationobj.readnotification = function (profile) {
		// call url set_readnotification
		const url_set_readnotification = HealthverseObj.get_server("serverapi/set_readnotification.php")

		// set input data
		let uid = profile.userId
		let displayname = profile.displayName
		let picture = profile.pictureUrl

		// input form
		let data = new FormData()
		data.append("uid", uid)
		data.append("displayname", displayname)
		data.append("picture", picture)

		if (uid) {
			$.ajax({
				url: url_set_readnotification,
				type: "POST",
				beforeSend: () => {},
				processData: false,
				contentType: false,
				data: data,
				success: (result) => {
					const obj = jQuery.parseJSON(result)
					switch (obj.status) {
						case "0":
							HealthverseObj.notify_loading(obj.msg)
							console.log(obj.msg)
							break
						case "1":
							// change read status (R)
							$("#page-notify").css({ "color": "#161e2d" });
							console.log(obj.msg)
							break
						default:
							HealthverseObj.notify_loading(obj.msg)
							console.log(obj.msg)
							break
					}
				},
				complete: () => {}
			})
		} else {
			// check empty
			HealthverseObj.notify_loading(`เข้าระบบ Line, ก่อนใช้งาน!`)
			return
		}
	}

	// notification fn.
	notificationobj.notification = function (profile) {
		// get line uid
		const sid = profile.userId;

		// call url notificationlist
		const url_notificationlist = HealthverseObj.get_server("serverapi/get_notificationlist.php");

		// call url url_countnotification
		const url_countnotification = HealthverseObj.get_server("serverapi/get_countnotification.php");

		// clean data
		$('#content').empty();

		// load content data.
		$.ajax({
			url: url_notificationlist,
			type: "POST",
			beforeSend: () => { HealthverseObj.notify_loading(`กำลังโหลดข้อมูล...`) },
			data: { row: 0, perpage: 15, id: sid },
			success: (result) => {

				// parse data
				var obj = jQuery.parseJSON(result);

				// check empty data
				if (obj.resultdata != "empty") {

					// query new data
					$.each(obj, function (key, val) {

						// get stat
						//let stat = notificationobj.getstatnotification(val["coupon_status"]);

						// get content
						$('#content').append(`
							<div class="notification-queue-cover">
								<div class="notification-sub-queue">
									<ul class="notification-queue">
										<li class="left">
											<i class="material-icons" style="font-size: 3em; color: #` + val["notify_color"] + `;">` + val["notify_icon"] + `</i>
										</li>
										<li class="right">
											<span class="notification-queue-sub-text" style="color: #` + val["notify_color"] + `;"><strong>` + val["notify_topic"] + `</strong></span>
											<span class="notification-queue-sub-text2">` + val["notify_detail"] + `</span>
											<span class="notification-queue-sub-text2">` + val["insert_date"] + `</span>
										</li>
									</ul>
								</div>
							</div>
                    	`);

						/*
						// get content
						$('#content').append(`
							<div class="notification-queue-cover">
								<div class="notification-sub-queue">
									<ul class="notification-queue">
										<li class="left">
											<i class="material-icons" style="font-size: 3em; color: #03A2FC;">&#xe86c;</i> <!--&#xe5c9;-->
										</li>
										<li class="right">
											<span class="notification-queue-sub-text" style="color: #03A2FC;"><strong>สแกน "รับแต้ม" = 400 HVP</strong></span>
											<span class="notification-queue-sub-text2">คูปอง Get Coupon 400 HVP</span>
											<span class="notification-queue-sub-text2">2023/04/24 00:00:00</span>
										</li>
									</ul>
								</div>
							</div>
                    	`);
						*/

						/*
						// get notification-detail fn.
						$('.notification-queue').click(function (e) {
							window.open("notificationdetail.html?_sid_=" + val["notification_id"], "_self");
							if (!e.preventDefault()) { throw "Break Loop."; }
						});
						*/

					});

					// loadmore content
					$('#content').append(`
				    <div id="content-loadmore"></div>
				    <div id="loadMore" class="notification-loadmore-detail">
					    <span>โหลดเพิ่มเติม</span>
				    </div>
				    <input type="hidden" id="row" value="0">
            	    <input type="hidden" id="all">
			    `);

					// get member-name fn.
					notificationobj.getnotificationmore(url_notificationlist, url_countnotification, sid);

				} else {
					// empty data
					$('#content').append(`
                	<ul class="notification-empty">
                        <li>
                            <span class="notification-empty-text">ยังไม่มีข้อมูล!!</span>
                        </li>
                    </ul>
                `);
				}

			},
			complete: () => { $("#notify").removeClass("show") }
		})
	}

	/*
	// getstatnotification fn.
	notificationobj.getstatnotification = function (s_stat) {
		let stat = [];
		let statthname, statcolor, statpoint, statpointcolor;
		switch (s_stat) {
			case "A":
				statthname = "รับแต้ม";
				statcolor = "#03A2FC";
				statpoint = "+";
				statpointcolor = "#28DA19";
				break;
			case "D":
				statthname = "จ่ายแต้ม";
				statcolor = "#FF0000";
				statpoint = "";
				statpointcolor = "#FF0000";
				break;
			default:
				statthname = "รับแต้ม";
				statcolor = "#03A2FC";
				statpoint = "+";
				statpointcolor = "#28DA19";
				break;
		}

		// send stat
		return stat = [statthname, statcolor, statpoint, statpointcolor];
	}
	*/

	// getcountnotification fn.
	notificationobj.getcountnotification = function (s_countnotification, sid) {
		// load data
		$.ajax({
			url: s_countnotification,
			type: "POST",
			data: { id: sid },
		}).success(function (result) {

			// parse data
			var obj = jQuery.parseJSON(result);

			// check empty data
			if (obj.resultdata != "empty") {

				// query data
				$('#all').val(obj.allcount);

			} else {
				// empty data
				$('#all').val(0);
			}

		});
	}
	
	// getlistmore fn.
	notificationobj.getnotificationmore = function (s_notificationlist, s_countnotification, sid) {

		// getcountnotification fn.
		notificationobj.getcountnotification(s_countnotification, sid);

		$("#loadMore span").click(function () {

			var row = Number($('#row').val());
			var allcount = Number($('#all').val());
			row = row + 15;

			if (row <= allcount) {
				$("#row").val(row);

				$.ajax({
					url: s_notificationlist,
					type: 'post',
					data: { row: row, perpage: 15, id: sid },
					beforeSend: function () {
						$("#loadMore span").text("กำลังโหลด...");
					},
					success: function (response) {

						// Setting little delay while displaying new content
						setTimeout(function () {
							// appending posts after last post with class="post"
							$(".notification-queue-cover:last").after(notificationobj.getquerynotificationmore(response)).show().fadeIn("slow");

							var rowno = row + 15;

							// checking row value is greater than allcount or not
							if (rowno > allcount) {
								//hide loadmore
								$("#loadMore span").css({ "display": "none" });
							} else {
								$("#loadMore span").text("โหลดเพิ่มเติม");
							}
						}, 2000);

					}
				});
			} else {
				$('#loadMore span').text("กำลังโหลด...");

				// Setting little delay while removing contents
				setTimeout(function () {

					// When row is greater than allcount then remove all class='post' element after 3 element
					$('.notification-queue-cover:nth-child(15)').nextAll('.member-queue-cover').remove().fadeIn("slow");

					// Reset the value of row
					$("#row").val(0);

				}, 2000);

			}

		});

	}
	
	// getquerynotificationmore fn.
	notificationobj.getquerynotificationmore = function (srs) {
		// parse data
		var obj = jQuery.parseJSON(srs);
		    
		// check empty data
		if (obj.resultdata!="empty") {
		
		// query new data
		$.each(obj, function(key, val) {

			// get stat
			let stat = notificationobj.getstatnotification(val["coupon_status"]);

			// get content
			$('#content').append(`
				<div class="notification-queue-cover">
					<div class="notification-sub-queue">
						<ul class="notification-queue">
							<li class="left">
								<i class="material-icons" style="font-size: 3em; color: #` + val["notify_color"] + `;">` + val["notify_icon"] + `</i>
							</li>
							<li class="right">
								<span class="notification-queue-sub-text" style="color: #` + val["notify_color"] + `;"><strong>` + val["notify_topic"] + `</strong></span>
								<span class="notification-queue-sub-text2">` + val["notify_detail"] + `</span>
								<span class="notification-queue-sub-text2">` + val["insert_date"] + `</span>
							</li>
						</ul>
					</div>
				</div>
			`);

			/*
			// get notification-detail fn.
			$('.notification-queue').click(function (e) {
				window.open("notificationdetail.html?_sid_=" + val["notification_id"], "_self");
				if (!e.preventDefault()) { throw "Break Loop."; }
			});
			*/
			
		});
		
		} else {
			// empty data
			$('#content-loadmore').append(`
			    <ul class="notification-empty">
					<li>
						<span class="notification-empty-text">ยังไม่มีข้อมูล!!</span>
					</li>
				</ul>
			`);
		}
	}

	return notificationobj;
})();
