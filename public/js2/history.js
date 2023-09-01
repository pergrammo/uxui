
// Historyim Classdata
const Historyim = (function () {
	let historyobj = {};

	// historystart fn.
	historyobj.historystart = function (liff) {
		// check user
		//if (!sessionStorage.getItem("mid")) {sessionStorage.clear(); TreasuryIm.redirect("login.html", 1000);}
		//var get_mid = "00005";

		liff.getProfile().then(function (profile) {
			// get history
			historyobj.history(profile);

		}).catch(function (error) {
			HealthverseObj.notify_loading(`Error getting profile: ` + error)
		});
	}

	// history fn.
	historyobj.history = function (profile) {
		// get line uid
		const sid = profile.userId;
		//console.log(sid);
		// call url historylist
		const url_historylist = HealthverseObj.get_server("serverapi/get_historylist.php");

		// call url url_counthistory
		const url_counthistory = HealthverseObj.get_server("serverapi/get_counthistory.php");

		// clean data
		$('#content').empty();

		// get topic
		$('#content').append(`
			<div class="history-queue-cover" style="margin-top: 20px; text-align: left;">
				<span class="history-queueheader-text" style="padding-left: 2px; font-size: 0.9em; color: #161e2d;"><strong>ประวัติการใช้แต้ม</strong></span>
			</div>
		`);

		// load content data.
		$.ajax({
			url: url_historylist,
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
						let stat = historyobj.getstathistory(val["coupon_status"]);

						// get content
						$('#content').append(`
							<div class="history-queue-cover">
								<div class="history-sub-queue">
									<ul class="history-queue">
										<li style="text-align: left;">
											<span class="history-queue-sub-text" style="color: ` + stat[1] + `;"><strong>` + stat[0] + `</strong></span>
											<span class="history-queue-sub-text2">` + val["coupon_name"] + `</span>
										</li>
										<li style="text-align: right;">
											<span class="history-queue-sub-text" style="color: ` + stat[3] + `;"><strong>` + stat[2] + `` + val["coupon_point"] + `</strong></span>
											<span class="history-queue-sub-text2">` + val["insert_date"] + `</span>
										</li>
									</ul>
								</div>
							</div>
                    	`);

						/*
						// get history-detail fn.
						$('.history-queue').click(function (e) {
							window.open("historydetail.html?_sid_=" + val["history_id"], "_self");
							if (!e.preventDefault()) { throw "Break Loop."; }
						});
						*/

					});

					// loadmore content
					$('#content').append(`
				    <div id="content-loadmore"></div>
				    <div id="loadMore" class="history-loadmore-detail">
					    <span>โหลดเพิ่มเติม</span>
				    </div>
				    <input type="hidden" id="row" value="0">
            	    <input type="hidden" id="all">
			    `);

					// get member-name fn.
					historyobj.gethistorymore(url_historylist, url_counthistory, sid);

				} else {
					// empty data
					$('#content').append(`
                	<ul class="history-empty">
                        <li>
                            <span class="history-empty-text">ยังไม่มีข้อมูล!!</span>
                        </li>
                    </ul>
                `);
				}

			},
			complete: () => { $("#notify").removeClass("show") }
		})
	}

	// getstathistory fn.
	historyobj.getstathistory = function (s_stat) {
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

	// getcounthistory fn.
	historyobj.getcounthistory = function (s_counthistory, sid) {
		// load data
		$.ajax({
			url: s_counthistory,
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
	historyobj.gethistorymore = function (s_historylist, s_counthistory, sid) {

		// getcounthistory fn.
		historyobj.getcounthistory(s_counthistory, sid);

		$("#loadMore span").click(function () {

			var row = Number($('#row').val());
			var allcount = Number($('#all').val());
			row = row + 15;

			if (row <= allcount) {
				$("#row").val(row);

				$.ajax({
					url: s_historylist,
					type: 'post',
					data: { row: row, perpage: 15, id: sid },
					beforeSend: function () {
						$("#loadMore span").text("กำลังโหลด...");
					},
					success: function (response) {

						// Setting little delay while displaying new content
						setTimeout(function () {
							// appending posts after last post with class="post"
							$(".history-queue-cover:last").after(historyobj.getqueryhistorymore(response)).show().fadeIn("slow");

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
					$('.history-queue-cover:nth-child(15)').nextAll('.member-queue-cover').remove().fadeIn("slow");

					// Reset the value of row
					$("#row").val(0);

				}, 2000);

			}

		});

	}
	
	// getqueryhistorymore fn.
	historyobj.getqueryhistorymore = function (srs) {
		// parse data
		var obj = jQuery.parseJSON(srs);
		    
		// check empty data
		if (obj.resultdata!="empty") {
		
		// query new data
		$.each(obj, function(key, val) {

			// get stat
			let stat = historyobj.getstathistory(val["coupon_status"]);

			// get content
			$('#content').append(`
				<div class="history-queue-cover">
					<div class="history-sub-queue">
						<ul class="history-queue">
							<li style="text-align: left;">
								<span class="history-queue-sub-text" style="color: ` + stat[1] + `;"><strong>` + stat[0] + `</strong></span>
								<span class="history-queue-sub-text2">` + val["coupon_name"] + `</span>
							</li>
							<li style="text-align: right;">
								<span class="history-queue-sub-text" style="color: ` + stat[3] + `;"><strong>` + stat[2] + `` + val["coupon_point"] + `</strong></span>
								<span class="history-queue-sub-text2">` + val["insert_date"] + `</span>
							</li>
						</ul>
					</div>
				</div>
			`);

			/*
			// get history-detail fn.
			$('.history-queue').click(function (e) {
				window.open("historydetail.html?_sid_=" + val["history_id"], "_self");
				if (!e.preventDefault()) { throw "Break Loop."; }
			});
			*/
			
		});
		
		} else {
			// empty data
			$('#content-loadmore').append(`
			    <ul class="history-empty">
					<li>
						<span class="history-empty-text">ยังไม่มีข้อมูล!!</span>
					</li>
				</ul>
			`);
		}
	}

	return historyobj;
})();
