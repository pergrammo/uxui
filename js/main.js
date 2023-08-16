// call mainlist fn.
$(function() {
	// querymainlist fn.
	Mainim.querymainlist();

	// get notification fn.
	$('#page-notify').click(function () {
		Notificationim.notificationstart();
	});
});

// Mainim Class
const Mainim = (function () {
	let mainimobj = {};

	// querymainlist fn.
	mainimobj.querymainlist = function () {

		// clean data
		$('#content').empty();

		// load data
		$('#content').append(`
			<div class="main-topic-cover">
				<ul class="main-topic">
					<li class="ta-ct">
						<img src="img/05_profile/pergrammo.png" class="main-queue3" />
					</li>
					<li class="ta-ct">
						<span class="main-topic-text1"><strong>Charlie</strong></span>
					</li>
					<li style="padding: 20px 0; text-align: center;">
						<div class="main-queue2">
							<ul class="main-queue2">
								<li class="mg-t-20 ta-ct"><span class="main-topic-text3">Total Points</span></li>
								<li class="mg-tp-0 ta-ct"><span class="main-topic-text4"><strong>100 HVP</strong></span></li>
							</ul>
						</div>
					</li>
					<li class="ta-ct">
						<img src="img/05_profile/hvimage.png" style="width: 100%;" />
					</li>
				</ul>
			</div>
		`);
	}

	return mainimobj;
})();