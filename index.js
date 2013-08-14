var slice = Array.prototype.slice;

exports = module.exports = function(callback){
	var stdin = process.stdin;
	stdin.setEncoding('utf8');

	var piped = false;
	stdin.on('readable', function(){
		var chunk = this.read();

		if(!piped && chunk == null){
			// We are not being piped.
			var program = exports.program;
			var args = program
				? program.args
				: slice.call(process.argv, 2);
			callback.apply(null, args);
		} else if(chunk != null){
			callback(chunk);
		}
	});
};

exports.program = require('commander');
exports.program.process = exports;
