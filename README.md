# proc-args

This is a simple module that abstracts away the difference between taking command-line arguments and reading data from the pipe. Her's an example:

```javascript
var proc = require('proc-args');

proc(function(arg){
	doneSomethingWith(arg);
});
```

In the above example `arg` could either be an argument passed to tyour program from the command line or data piped in from stdin. So if your program is `foo` then this command `foo myfile.js` and `echo myfile.js | foo` can be treated the same.

## commander.js

Additionally proc-args wraps Commander.js, adding the ability to use it in this way.  For example:

```javascript
var program = require('proc-args').program;

program
	.version('0.0.1')
	.parse(process.argv);

program.process(function(arg){
	Got the arg!
});
```
