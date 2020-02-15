"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trackProgress(err, res) {
    if (err)
        return console.error(err);
    var contentLength = parseInt(res.headers["content-length"], 10), received = 0, progress = 0;
    res.on("data", function (data) {
        received += data.length;
        progress = received / contentLength;
        // Do funky stuff with progress
        console.log(progress);
    });
}
exports.trackProgress = trackProgress;
