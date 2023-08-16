// Moreim Classdata
const Moreim = (function () {
	let moreobj = {};

	// morestart fn.
	moreobj.morestart = function () {
		// get page-name
		$('#page-name').empty();
		$('#page-name').append(`<strong>More</strong>`);

		// get more
		moreobj.querymainlist();
	}

	// querymainlist fn.
	moreobj.querymainlist = function () {
		// clean data
		$('#content').empty();

		// load data
		$('#content').append(`
					<div class="more-queue-cover">
						<div class="more-sub-queue">
							<ul class="more-queue">
								<li class="left">
									<img src="img/05_profile/pergrammo.png" class="main-queue3" style="width: 50px;" />
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #161e2d;"><strong>Charlie</strong></span>
									<span class="more-queue-sub-text2">Mobile: <label style="color: #03A2FC;">Register</label></span>
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
									<span class="more-queue-sub-text" style="color: #03A2FC;">HVP to Coupon</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe8f6;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">HVP to Rewards</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="more-queue-cover">
						<span class="more-queue-sub-text2" style="color: #161e2d;"><strong>How to</strong></span>
					</div>
					<div class="more-queue-cover">
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe53f;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">Change Coupon</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe8f7;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">Change Rewards</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="more-queue-cover">
						<span class="more-queue-sub-text2" style="color: #161e2d;"><strong>Policy & Condition</strong></span>
					</div>
					<div class="more-queue-cover">
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe8fd;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">About Member</span>
								</li>
							</ul>
						</div>
						<div class="more-sub-queue2">
							<ul class="more-queue2">
								<li class="left" style="padding-top: 3px;">
									<i class="material-icons" style="font-size: 1.5em; color: #03A2FC;">&#xe90c;</i>
								</li>
								<li class="right">
									<span class="more-queue-sub-text" style="color: #03A2FC;">About Us</span>
								</li>
							</ul>
						</div>
					</div>
				`);
	}

	return moreobj;
})();
