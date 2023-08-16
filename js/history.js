// Historyim Classdata
const Historyim = (function () {
	let historyobj = {};

	// historystart fn.
	historyobj.historystart = function () {
		// get history
		historyobj.history();
	}

	// history fn.
	historyobj.history = function () {
		// clean data
		$('#content').empty();

		// get topic
		$('#content').append(`
			<div class="history-queue-cover" style="margin-top: 20px; text-align: left;">
				<span class="history-queueheader-text" style="padding-left: 2px; font-size: 0.9em; color: #161e2d;"><strong>(+) Receive / (-) Pay</strong></span>
			</div>
			<div class="history-queue-cover">
				<div class="history-sub-queue">
					<ul class="history-queue">
						<li style="text-align: left;">
							<span class="history-queue-sub-text" style="color: #03A2FC;"><strong>Receive</strong></span>
							<span class="history-queue-sub-text2">Get Coupon 20HVP</span>
						</li>
						<li style="text-align: right;">
							<span class="history-queue-sub-text" style="color: #28DA19;"><strong>+20</strong></span>
							<span class="history-queue-sub-text2">08/16/2023 00:00:00</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="history-queue-cover">
				<div class="history-sub-queue">
					<ul class="history-queue">
						<li style="text-align: left;">
							<span class="history-queue-sub-text" style="color: #FF0000;"><strong>Pay</strong></span>
							<span class="history-queue-sub-text2">Use Coupon 20HVP</span>
						</li>
						<li style="text-align: right;">
							<span class="history-queue-sub-text" style="color: #FF0000;"><strong>-20</strong></span>
							<span class="history-queue-sub-text2">08/12/2023 00:00:00</span>
						</li>
					</ul>
				</div>
			</div>
			<div id="loadMore" class="history-loadmore-detail">
				<span>Load More</span>
			</div>
		`);
	}

	return historyobj;
})();
