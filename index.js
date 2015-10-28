/*----------------------------------------------------
------------------------------------------------------
-----------------START TIMER ON CLICK-----------------
------------------------------------------------------
----------------------------------------------------*/

function startTimerOnClick() {
	function formatTime(time) {
	    time = time / 10;
	    var min = parseInt(time / 6000),
	        sec = parseInt(time / 100) - (min * 60),
	        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
	    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
	}

	function pad(number, length) {
	    var str = '' + number;
	    while (str.length < length) {str = '0' + str;}
	    return str;
	}	

	$('#startButton').click(function() {
    // Timer speed in milliseconds
    var incrementTime = 35;

    // Current timer position in milliseconds
    var currentTime = 0;

		var timer = $.timer(updateTimer, incrementTime, true);

    function updateTimer() {
	    var timeString = formatTime(currentTime);
	    $('#timer').html(timeString);
	    currentTime += incrementTime;
    }
	});
}

/*------------------------------------
--------------------------------------
-----------------MAIN-----------------
--------------------------------------
------------------------------------*/

$(function() {
  startTimerOnClick();
});