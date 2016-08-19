var fs = require('fs');
var msg = process.argv[2];

var MEM = JSON.parse(fs.readFileSync('memory.json', 'utf-8'));

var subj = [],
	nouns = [];

if (process.argv[2]){
	newMSG(process.argv[2])
} else {
	fs.readFile('merritt.txt', 'utf-8', function(err,data){
	if (err) throw new Error(err);
	
	data.split('\r\n').forEach(function(line){
		newMSG(line);
	})
	})
}

function topN(obj, n){
	var tmp = [0],
		vals = [''];
	Object.keys(obj).forEach(function(key){
		if (parseInt(obj[key]) > Math.min.apply(null, tmp)){
			tmp.push(parseInt(obj[key]));
			vals.push(key);
			tmp.sort(function(a,b){return a-b});
			vals.sort();
			if (tmp.length > n){
				tmp.splice(0,1);
				vals.splice(0,1);
			}
		}
	});
	return vals;
}

function newMSG(msg){
	msg.split(' ').forEach(function(word, ind){
		if (word == "is") return;
		if (word.match(/[A-Z][a-z]+/g) && ind !== 0){
			nouns.push(word.match(/[A-Z][a-z]+/g)[0]);
			subj.push(word.match(/[A-Z][a-z]+/g)[0]);
		} else if (word.match(/[A-z]+/g)){
			subj.push(word.match(/[A-z]+/g)[0]);
			nouns.push(word.match(/[A-z]+/g)[0]);
		} else if (word.match(/[0-9]+/g)){
			nouns.push(word.match(/[0-9]+/g)[0]);
		}
	})
	var freq = {};
	subj.forEach(function(sub){
		if (MEM[sub]){
			MEM[sub].forEach(function(k,i){
				freq[k] = (freq[k] || 0) + (1 * (i+1)/10);
			})
			//console.log(MEM[sub]);
		}
		MEM[sub] = MEM[sub] || [];
		nouns.forEach(function(noun){
			MEM[sub].push(noun);
		})
	})
	
	console.log(topN(freq,5));
	//console.log(freq);
	
	fs.writeFile('memory.json', JSON.stringify(MEM), function(err){
		if (err) throw new Error(err);
	})
}