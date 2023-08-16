// Notificationim Classdata
const Notificationim = (function () {
	let notificationobj = {};

	// notificationstart fn.
	notificationobj.notificationstart = function () {
		// get page-name
		$('#page-name').empty();
		$('#page-name').append(`<strong>Update</strong>`);

		// get notification
		notificationobj.notification();
	}

	// notification fn.
	notificationobj.notification = function () {
		// clean data
		$('#content').empty();

		// get content
		$('#content').append(`
			<div class="notification-queue-cover">
				<div class="notification-sub-queue">
					<ul class="notification-queue">
						<li class="left">
							<i class="material-icons" style="font-size: 3em; color: #161e2d;">&#xe86c;</i>
						</li>
						<li class="right">
							<span class="notification-queue-sub-text" style="color: #161e2d;"><strong>Receive points = +20HVP</strong></span>
							<span class="notification-queue-sub-text2">Detail: <strong>Get Coupon 20HVP</strong></span>
							<span class="notification-queue-sub-text2">08/16/2023 00:00:00</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="notification-queue-cover">
				<div class="notification-sub-queue">
					<ul class="notification-queue">
						<li class="left">
							<i class="material-icons" style="font-size: 3em; color: #161e2d;">&#xe5c9;</i>
						</li>
						<li class="right">
							<span class="notification-queue-sub-text" style="color: #161e2d;"><strong>Pay points = -20HVP</strong></span>
							<span class="notification-queue-sub-text2">Detail: <strong>Use Coupon 20HVP</strong></span>
							<span class="notification-queue-sub-text2">08/12/2023 00:00:00</span>
						</li>
					</ul>
				</div>
			</div>
			<div id="loadMore" class="notification-loadmore-detail">
				<span>Load More</span>
			</div>
		`);
	}

	return notificationobj;
})();
