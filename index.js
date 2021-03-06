var program
  , slice = Array.prototype.slice;

exports = module.exports = function(callback){
	var stdin = process.stdin;
	stdin.setEncoding('utf8');

	var piped = false;
	var onreadable = function(){
		var chunk = this.read();

		if(!piped && chunk == null){
			// We are not being piped.
			var args = program
				? program.args
				: slice.call(process.argv, 2);
			callback.apply(null, args);
			stdin.removeListener('readable', onreadable);
			stdin.pause();
		} else if(chunk != null){
			piped = true;
			callback(chunk);
		}
	};

	stdin.on('readable', onreadable);
};

Object.defineProperty(exports, 'program', {
	get: function(){
		if(!program) {
			program = require('commander');
			program.process = exports;
		}
		return program;
	}
});
