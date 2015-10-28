/*----------------------------------------
------------------------------------------
-----------------ADD ZEROS----------------
------------------------------------------
----------------------------------------*/

function addZeros(number, length) {
	var string = '' + number; // Int to string.
	while (string.length < length) { string = '0' + string; }
	return string;
}

/*----------------------------------
------------------------------------
-----------------NOW----------------
------------------------------------
----------------------------------*/

function now() {
	return (new Date().getTime());
}

/*-------------------------------------------
---------------------------------------------
-----------------START TIMER-----------------
---------------------------------------------
-------------------------------------------*/

function startTimer() {
	var startTime = now();
	var currentTime = 0;

	var timer = setInterval(function() {
								currentTime = (now() - startTime) + parseInt($('#additionalTime').text());

								var hours = parseInt(currentTime / 3600000);
								var minutes = parseInt(currentTime / 60000) - (hours * 60);
								var seconds = parseInt(currentTime / 1000) - (minutes * 60);
								var milliseconds = parseInt(currentTime % 1000);
								$('#timer').text(addZeros(hours, 2) + ':' + addZeros(minutes, 2) + ':'
																 + addZeros(seconds, 2) + '.' + addZeros(milliseconds, 3));
							}, 55); // in millisecond.

	$('#pauseButton').click(function() {
    clearInterval(timer);
		$('#additionalTime').text(currentTime);

		$('#pauseButton').css('display', 'none');
		$('#startButton').css('display', 'inline-block');
		$('#clearButton').css('display', 'inline-block');
	});
}


/*----------------------------------------------
------------------------------------------------
-----------------BUTTONS EVENTS-----------------
------------------------------------------------
----------------------------------------------*/


	/*-------------------------------
	-------START TIMER ON CLICK------
	-------------------------------*/

	function startTimerOnClick() {
		$('#startButton').click(function () {
			$(this).css('display', 'none'); // Hide the 'Start' button.
			$('#clearButton').css('display', 'none'); // Hide the 'Clear' button in the case it was shown.
			$('#pauseButton').css('display', 'inline-block'); // Show 'Pause' button.

			startTimer();
		});
	}

	/*-------------------------
	-------CLEAR ON CLICK------
	-------------------------*/

	function clearOnClick() {
		$('#clearButton').click(function() {
			$('#clearButton').css('display', 'none');
			$('#additionalTime').text('0'); // Delete any additional time.
			$('#timer').text('00:00:00.000');
		});
	}


/*------------------------------------
--------------------------------------
-----------------MAIN-----------------
--------------------------------------
------------------------------------*/

function test() {
	$(document).on('click', '#test', function() {
		$('link').attr('href', '/chronometer/style.css');
	});
}

$(function() {
  startTimerOnClick();
	clearOnClick();
	test();
});
