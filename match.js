match = function(first, second){
	var f = [],
		s = [],
		score = 0;

	for (var c = 0; c < first.length; c++){
		f.push(first.charCodeAt(c));
	}
	for (var c = 0; c < second.length; c++){
		s.push(second.charCodeAt(c));
	}
	console.log(f,s);
	
	f.forEach(function(ch, i){
		s.forEach(function(ch2, j){
			if (ch === ch2){
				score += 1/(f.length | s.length);
			} else if (Math.abs(ch2-ch) === 32){
				score += 1/((f.length | s.length) + 1);
			} else {
				
			}
		})
	})

	return score;
}

s = match(process.argv[2], process.argv[3])
console.log(s);