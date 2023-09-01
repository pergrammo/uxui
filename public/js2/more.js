
//const { json } = require("body-parser");
//const { application } = require("express");

// Moreim Classdata
const Moreim = (function () {
	let moreobj = {};

	// morestart fn.
	moreobj.morestart = function (liff) {
		// check user
		//if (!sessionStorage.getItem("mid")) {sessionStorage.clear(); TreasuryIm.redirect("login.html", 1000);}
		//var get_mid = "00005";

		// get page-name
		$('#page-name').empty();
		$('#page-name').append(`<strong>เพิ่มเติม</strong>`);

		liff.getProfile().then(function (profile) {
			// get more
			moreobj.querymainlist(profile);
		}).catch(function (error) {
			HealthverseObj.notify_loading(`Error getting profile: ` + error)
		});
	}

	// querymainlist fn.
	moreobj.querymainlist = function (profile) {
		// call url pointdata
		const sid = profile.userId;
		const url_pointdata = HealthverseObj.get_server("serverapi/get_pointdata.php");

		// clean data
		$('#content').empty();

		// load data
		$.ajax({
			url: url_pointdata,
			type: "POST",
			dataType: "application/json",
			beforeSend: () => { HealthverseObj.notify_loading(`กำลังโหลดข้อมูล...`) },
			data: { id: sid },
			success: (result) => {
				// parse data
				const obj = jQuery.parseJSON(result)

				// empty data
				if (!obj.point_uname) {obj.point_uname = profile.displayName}
				if (!obj.point_uimage) {obj.point_uimage = profile.pictureUrl}

				// no point
				//if (!obj.campaign_total) {obj.campaign_total = "0"}

				$('#content').append(`
					<div class="more-queue-cover">
						<div class="more-sub-queue">
							<ul class="more-queue">
								<li class="left">
									<img src="` + obj.point_uimage + `" class="main-queue3" style="width: 50px;" />
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #161e2d;"><strong>` + obj.point_uname + `</strong></span>
									<span class="more-queue-sub-text2">เบอร์โทร: <label style="color: #03A2FC;">ลงทะเบียน</label></span>
								</li>
							</ul>
						</div>
					</div>
					<div class="more-queue-cover">
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe3c2;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">My QR-Code</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe638;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">แต้มแลกคูปอง</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe8f6;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">แต้มแลกของรางวัล</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="more-queue-cover">
						<span class="more-queue-sub-text2" style="color: #161e2d;"><strong>ข้อมูลและวิธีการ</strong></span>
					</div>
					<div class="more-queue-cover">
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe53f;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">วิธีแลกคูปอง</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe8f7;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">วิธีแลกของรางวัล</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="more-queue-cover">
						<span class="more-queue-sub-text2" style="color: #161e2d;"><strong>ข้อกำหนดและเงื่อนไข</strong></span>
					</div>
					<div class="more-queue-cover">
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe8fd;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">ข้อกำหนดและเงื่อนไขของ Member</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe90c;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">เกี่ยวกับเรา</span>
								</li>
							</ul>
						</div>
					</div>
				`);

			},
			complete: () => { $("#notify").removeClass("show") }
		})
	}

	return moreobj;
})();
