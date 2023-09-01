// Scanqr Classdata
const Scanqrim = (function () {
	let scanqrobj = {};

	// scanqrstart fn.
	scanqrobj.scanqrstart = function (liff) {
		// get scanqr
		scanqrobj.scanqr(liff);
	}

	// scanqr fn.
	scanqrobj.scanqr = function (liff) {
		// clean data
		$('#content').empty();

		// get topic
		$('#content').append(`
			<div class="scanqr-queueheader-cover">
				<ul class="scanqr-queueheader">
					<li class="ta-ct">
						<img src="img/05_profile/scanner.png" />
					</li>
					<li class="ta-ct">
						<span class="scanqr-queueheader-text">กดปุ่ม "สแกน QR" ที่ด้านล่าง!</span>
					</li>
				</ul>
			</div>
		`);

		if (liff.isInClient()) {
			
			liff.scanCodeV2().then(result => {
				// get scanqrlist fn.
				scanqrobj.scanqrlist(liff, result.value)
            }).catch(err => {
				HealthverseObj.notify_loading(`scanCode failed!`)
            });
        } else {
           HealthverseObj.notify_loading('กรุณาเข้าสู่ระบบ');
        }
	}

	// scanqrlist fn.
	scanqrobj.scanqrlist = function (liff, value) {

		liff.getProfile().then(function (profile) {
			// get qccampaign fn.
			scanqrobj.qccampaign(liff, profile, value)

		}).catch(function (error) {
			// empty/error scan
			HealthverseObj.notify_loading(`กรุณาสแกน QR ใหม่อีกครั้ง!`)
		});
	}

	// qccampaign fn.
	scanqrobj.qccampaign = function (liff, profile, value) {
		// call url get_campaigndata
		const url_get_campaigndata = HealthverseObj.get_server("serverapi/get_campaigndata.php")

		// set querystring
		const cap = HealthverseObj.get_qstring(value, "cap");

		// load data
        $.ajax({
            url: url_get_campaigndata,
            type: "POST",
			beforeSend: () => {},
            data: { id: cap },
            success: (result) => {
                // parse data
                const obj = jQuery.parseJSON(result)
                // check data
				if (obj.campaign_id) {
					// get collectcampaign fn.
					scanqrobj.collectcampaign(profile, value)
					// get collectscanqrlist fn.
					scanqrobj.collectscanqrlist(liff, profile, value)
				} else {
					// empty data
					HealthverseObj.notify_loading(`"ไม่ใช่" คูปองของระบบ!`)
				}
            },
			complete: () => {}
        })
	}

	// collectcampaign fn.
	scanqrobj.collectcampaign = function (profile, value) {
		// call url set_collectcampaign
		const url_set_collectcampaign = HealthverseObj.get_server("serverapi/set_collectcampaign.php")

		// set input data
		let uid = profile.userId

		// set querystring
		const cap = HealthverseObj.get_qstring(value, "cap");

		// input form
		let data = new FormData()
		// profile
		data.append("uid", uid)
		// value
		data.append("cap", cap)

		if (uid) {
			$.ajax({
				url: url_set_collectcampaign,
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

	// collectscanqrlist fn.
	scanqrobj.collectscanqrlist = function (liff, profile, value) {
		// call url set_collectscanqrlist
		const url_set_collectscanqrlist = HealthverseObj.get_server("serverapi/set_collectscanqrlist.php")

		// set input data
		let uid = profile.userId
		let displayname = profile.displayName
		let picture = profile.pictureUrl

		// set querystring
		const cap = HealthverseObj.get_qstring(value, "cap");
		const cop = HealthverseObj.get_qstring(value, "cop");
		const pts = HealthverseObj.get_qstring(value, "pts");
		const nam = HealthverseObj.get_qstring(value, "nam");

		// check point status
		let stt
		(pts < 0) ? stt = "D" : stt = "A"

		// input form
		let data = new FormData()
		// profile
		data.append("uid", uid)
		data.append("displayname", displayname)
		data.append("picture", picture)
		// value
		data.append("cap", cap)
		data.append("cop", cop)
		data.append("nam", nam)
		data.append("stt", stt)
		data.append("pts", pts)

		if (uid) {
			$.ajax({
				url: url_set_collectscanqrlist,
				type: "POST",
				beforeSend: () => { /*HealthverseObj.notify_loading(`กำลังโหลดข้อมูล...`)*/ },
				processData: false,
				contentType: false,
				data: data,
				success: (result) => {
					const obj = jQuery.parseJSON(result)
					switch (obj.status) {
						case "0":
							HealthverseObj.notify_loading(obj.msg)
							break
						case "1":
							// send messaging
							scanqrobj.scanqrmessaging(liff, displayname, nam, stt, pts)

							// send information
							$("#mModalData").css({ "display": "block" });
							scanqrobj.modaldata(obj.msg, nam, stt, pts)

							// send collectnotificationlist
							scanqrobj.collectnotificationlist(profile, obj.msg, nam, stt, pts)
							break
						default:
							HealthverseObj.notify_loading(obj.msg)
							break
					}
				},
				complete: () => { /*$("#notify").removeClass("show")*/ }
			})
		} else {
			// check empty
			HealthverseObj.notify_loading(`เข้าระบบ Line, ก่อนใช้งาน!`)
			return
		}
	}

	// scanqrmessaging fn.
	scanqrobj.scanqrmessaging = function (liff, displayname, nam, stt, pts) {
		// get pointstatus fn.
		let stat = [];
		stat = scanqrobj.pointstatus(stt)

		// sendMessages api.
		liff.sendMessages([{
			"type": "flex",
			"altText": "มีการ Scan Point จาก: \"" + displayname + "\" จำนวน = " + pts + " HVP",
			"contents": {
				"type": "bubble",
				/*
				"styles": {
					"header": {
						"backgroundColor": "#ffaaaa",
					},
					"body": {
						"backgroundColor": "#aaffaa",
						"separator": true,
						"separatorColor": "#efefef"
					},
					"footer": {
						"backgroundColor": "#aaaaff"
					}
				},
				*/
				"header": {
					"type": "box",
					"layout": "vertical",
					"contents": [
						{
							"type": "text",
							"text": "กิจกรรม Scan Point"
						}
					]
				},
				"hero": {
					"type": "image",
					"url": "https://healthverse.world/point/img/06_notify/" + stat[2],
					"size": "full",
					"aspectRatio": "2:1"
				},
				"body": {
					"type": "box",
					"layout": "vertical",
					"contents": [
						{
							"type": "text",
							"text": "คุณได้ \"" + stat[0] + "\" = " + pts + " HVP"
						},
						{
							"type": "text",
							"text": "จากคูปอง " + nam
						}
					]
				},
				"footer": {
					"type": "box",
					"layout": "vertical",
					"contents": [
						{
							"type": "text",
							"text": "ขอบคุณสำหรับการเข้าร่วมกิจกรรม"
						}
					]
				}
			}
		}]).then(function() {
			HealthverseObj.notify_loading(`ส่งข้อความแจ้งเข้าระบบเรียบร้อย.`)
		}).catch(function(error) {
			HealthverseObj.notify_loading(`การส่งข้อความไม่สำเร็จ!`)
		});
	}

	// pointstatus fn.
	scanqrobj.pointstatus = function (stt) {
		// covert point status
		let stat = [];
		let statthname, statcolor, statimage;
		switch (stt) {
			case "A":
				statthname = "รับแต้ม";
				statcolor = "#03A2FC";
				statimage = "income.png";
				break;
			case "D":
				statthname = "ใช้จ่ายแต้ม";
				statcolor = "#FF0000";
				statimage = "outcome.png";
				break;
			default:
				statthname = "รับแต้ม";
				statcolor = "#03A2FC";
				statimage = "income.png";
				break;
		}
		stat = [statthname, statcolor, statimage]
		return stat
	}

	// modaldata fn.
	scanqrobj.modaldata = function (msg, nam, stt, pts) {
		// get pointstatus fn.
		let stat = [];
		stat = scanqrobj.pointstatus(stt)

		// clean data
		$('#mModalData').empty();
	
		// query content
		$('#mModalData').append(`
			<div class="modaldata-content">
				<div class="modaldata-header">
					<ul class="modaldata-headmenu">
						<li class="item1"><i id="modaldata-close" class="material-icons">&#xe5cd;</i></li>
						<li class="item2"><span style="font-size: 1em; color: #4985ff;">&nbsp;</span></li>
					</ul>
				</div>
				<div class="modaldata-body">
					<ul class="modaldata-menu">	
						<li>
							<img src="img/05_profile/success.png" style="width: 110px;" />
						</li>
						<li>
							<span style="font-size: 1.5em;"><strong>` + msg + `</strong></span>
						</li>
						<li>
							<span style="font-size: 0.9em;">คุณได้ "` + stat[0] + `" = <label style="color: #` + stat[1] + `;"><strong>` + pts + ` HVP</strong></label></span>
						</li>
						<li>
							<span style="font-size: 0.9em;">จากคูปอง <strong>` + nam + `</strong></span>
						</li>
						<li>
							<span style="font-size: 0.7em;">(เข้าดูแต้มสะสมของคุณที่เมนู "แต้มสะสม" ด้านล่าง)</span>
						</li>
						<li>
							<div id="btn-modaldata-close" class="btn-modaldata">
								<span style="font-size: 1em; color: #FFFFFF;"><strong>ปิด</strong></span>
							</div> 
						</li>
					</ul>
				</div>
			</div>
		`);	
	
		// get modaldata-close fn.
		$("#modaldata-close").click(function () {
			$("#mModalData").css({ "display": "none" });
		});

		// get btn-modaldata-close fn.
		$("#btn-modaldata-close").click(function () {
			$("#mModalData").css({ "display": "none" });
		});
			
	}

	// collectnotificationlist fn.
	scanqrobj.collectnotificationlist = function (profile, msg, nam, stt, pts) {
		// call url set_collectnotificationlist
		const url_set_collectnotificationlist = HealthverseObj.get_server("serverapi/set_collectnotificationlist.php")

		// get pointstatus fn.
		let stat = [];
		stat = scanqrobj.pointstatus(stt)

		// set input data
		let uid = profile.userId
		let displayname = profile.displayName
		let picture = profile.pictureUrl
		let smsg = msg
		let snam = nam
		let sstt = stt
		let sstt0 = stat[0]
		let sstt1 = stat[1]
		let spts = pts

		// input form
		let data = new FormData()
		data.append("uid", uid)
		data.append("displayname", displayname)
		data.append("picture", picture)
		data.append("smsg", smsg)
		data.append("snam", snam)
		data.append("sstt", sstt)
		data.append("sstt0", sstt0)
		data.append("sstt1", sstt1)
		data.append("spts", spts)

		if (uid) {
			$.ajax({
				url: url_set_collectnotificationlist,
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
							// change read status (N)
							$("#page-notify").css({ "color": "#FF0000" });
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

	return scanqrobj;
})();
