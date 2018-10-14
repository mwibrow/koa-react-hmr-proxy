// Break webpack static analysis in order to stop
// webpack injecting enviroment variables during build.
const proc = process
module.exports = proc.env
