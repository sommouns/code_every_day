var cp = require('child_process')

var child = cp.spawn('echo', ['hello', 'icketang'])

child.stdout.pipe(process.stdout)

