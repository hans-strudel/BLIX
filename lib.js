function topN(obj, n){
	var tmp = [0];
	Object.keys(obj).forEach(function(key){
		if (parseInt(obj[key]) > Math.min.apply(null, tmp)){
			tmp.push(parseInt(obj[key]));
			tmp.sort(function(a,b){return a-b});
			if (tmp.length > n) tmp.splice(0,1);
		}
	});
	return tmp;
}

var obj = {
	'a': 2,
	'b': 10,
	'e': 140,
	'basdf': 310,
	'fffb': 190,
}

var x = topN(obj, 3)

console.log(x);