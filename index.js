/*-----------------------------------------------------------
-------------------------------------------------------------
-----------------LOAD ADDITIONAL TIME COOKIE-----------------
-------------------------------------------------------------
-----------------------------------------------------------*/

function loadAdditionalTimeCookie() {
	// If there is no additionalTime cookie.
 if (typeof Cookies.get('additionalTime') == 'undefined') {
	 $('#additionalTime').text('0');
 }

 else { // If the cookie exists.
	 $('#additionalTime').text(Cookies.get('additionalTime'));
 }
}

/*---------------------------------------------------
-----------------------------------------------------
-----------------HANDLE THEME CHANGE-----------------
-----------------------------------------------------
---------------------------------------------------*/

// Allow the user to change the page's theme by checking a radio button.
function handleThemeChange() {
	$("[value='darkTheme']").click(function() {
		$('link').attr('href', '/chronometer/dark.css');
	});

	$("[value='lightTheme']").click(function() {
		$('link').attr('href', '/chronometer/light.css');
	});
}

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

/*----------------------------------------------------------------------------------
------------------------------------------------------------------------------------
-----------------TRANSFORM MILLISECONDS TO FORMATTED TIME AND PRINT-----------------
------------------------------------------------------------------------------------
----------------------------------------------------------------------------------*/

function transformMillisecondsToFormattedTimeAndPrint(time) { // Time in milliseconds.
	var hours = parseInt(time / 3600000);
	var minutes = parseInt(time / 60000) - (hours * 60);
	var seconds = parseInt(time / 1000) - (minutes * 60);
	var milliseconds = parseInt(time % 1000);
	$('#timer').text(addZeros(hours, 2) + ':' + addZeros(minutes, 2) + ':'
									 + addZeros(seconds, 2) + '.' + addZeros(milliseconds, 3));
}

/*-------------------------------------------
---------------------------------------------
-----------------START TIMER-----------------
---------------------------------------------
-------------------------------------------*/

function startTimer() {
	var additionalTime = 0;
	var currentTime = 0;

	var startTime = now();

	var timer = setInterval(function() {
								var additionalTime = parseInt($('#additionalTime').text());
								currentTime = (now() - startTime) + additionalTime;
								transformMillisecondsToFormattedTimeAndPrint(currentTime);
							}, 55); // in millisecond.

	$('#pauseButton').click(function() {
    clearInterval(timer);

		Cookies.remove('additionalTime');

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

/*--------------------------------------------------------
----------------------------------------------------------
-----------------SAVE CHRONOMETER ON EXIT-----------------
----------------------------------------------------------
--------------------------------------------------------*/

// Puts the chronometer's actual time in milliseconds in a cookie.
function saveChronometerOnExit() {
	window.onbeforeunload = function() {
		var additionalTime = $('#additionalTime').text();
		Cookies.set('additionalTime', additionalTime, 365);
	}
}

/*------------------------------------
--------------------------------------
-----------------MAIN-----------------
--------------------------------------
------------------------------------*/

$(function() {
	loadAdditionalTimeCookie();
	var additionalTime = $('#additionalTime').text();
	transformMillisecondsToFormattedTimeAndPrint(additionalTime);

  startTimerOnClick();
	clearOnClick();

	handleThemeChange();

	saveChronometerOnExit();
});
