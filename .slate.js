/*********
* Slate file hardcoded for my current monitor setup
**********/

var get_window_state = function(win) {

	if(win.topLeft().x < 100 && win.screen().id() == 0 ) {
		loc = 'A'
	} else if(win.topLeft().x > 100 && win.screen().id() == 0 ) {
		loc = 'B'
	} else if(win.topLeft().x < 2020 && win.screen().id() == 1 ) {
		loc = 'C'
	} else if(win.topLeft().x > 2020 && win.screen().id() == 1 ) {
		loc = 'D'
	}

	if(win.size().height > 800) {
		loc += '2';
	} else if(win.topLeft().y <= 100) {
		loc += '1';
	} else if(win.topLeft().y > 100) {
		loc += '3';
	}

	return(loc);
}

var set_window_state = function(win, state) {

	if(typeof(win) == 'undefined') return;

	x = 0;
	y = 0;
	height = 0;
	screen_id = 0;

	switch(state.charAt(0)){
		case 'A':
			x = 0;
			screen_id = 0;
			break;

		case 'B':
			x = 960;
			screen_id = 0;
			break;

		case 'C':
			x = 1920;
			screen_id = 1;
			break;

		case 'D':
			x = 2880;
			screen_id = 1;
			break;
	}

	switch(state.charAt(1)){
		case '1':
			y = 0;
			height = slate.screenForRef(screen_id).visibleRect().height/2;
			break;

		case '2':
			y = 0;
			height = slate.screenForRef(screen_id).visibleRect().height;
			break;

		case '3':
			height = slate.screenForRef(screen_id).visibleRect().height/2;
			y = slate.screenForRef(screen_id).rect().height - height;
			break;
	}	

	// Note: The size-move-size sandwich fixes a known issue and as of Jun 17, 2013
	// is the recommended approch by the author of slate.
	win.resize({
		"width" : 960,
		"height" : height
	})

	win.move({
		"x" : x,
		"y" : y
	});

	win.resize({
		"width" : 960,
		"height" : height
	})
	// End note
}

var bump_loc_up = function(state) {
	switch(state.charAt(1)){
		case "3":
			return state.charAt(0) + "2";
		case "2":
			return state.charAt(0) + "1";
		default:
			return state;
	}
}

var bump_loc_down = function(state) {
	switch(state.charAt(1)){
		case "1":
			return state.charAt(0) + "2";
		case "2":
			return state.charAt(0) + "3";
		default:
			return state;
	}
}

var bump_loc_left = function(state) {
	switch(state.charAt(0)){
		case "D":
			return "C" + state.charAt(1);
		case "C":
			return "B" + state.charAt(1);
		case "B":
			return "A" + state.charAt(1);
		case "A":
			return "A2";
		default:
			return state;
	}
}

var bump_loc_right = function(state) {
	// Don't go right if there is only one screen
	if(state.charAt(0) == "B" && slate.screenCount() == 1) return "B2";

	switch(state.charAt(0)){
		case "A":
			return "B" + state.charAt(1);
		case "B":
			return "C" + state.charAt(1);
		case "C":
			return "D" + state.charAt(1);
		case "D":
			return "D2";
		default:
			return state;
	}
}

slate.bind("right:alt", function(win) {
	set_window_state(win, bump_loc_right(get_window_state(win)));
});

slate.bind("left:alt", function(win) {
	set_window_state(win, bump_loc_left(get_window_state(win)));
});

slate.bind("up:alt", function(win) {
	set_window_state(win, bump_loc_up(get_window_state(win)));
});

slate.bind("down:alt", function(win) {
	set_window_state(win, bump_loc_down(get_window_state(win)));
});