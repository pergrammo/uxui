// Scanqr Classdata
const Scanqrim = (function () {
	let scanqrobj = {};

	// scanqrstart fn.
	scanqrobj.scanqrstart = function () {
		// get scanqr
		scanqrobj.scanqr();
	}

	// scanqr fn.
	scanqrobj.scanqr = function () {
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
						<span class="scanqr-queueheader-text">Hit "ScanQR" button!</span>
					</li>
				</ul>
			</div>
		`);
	}

	return scanqrobj;
})();
