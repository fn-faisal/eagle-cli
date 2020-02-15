export function trackProgress(err: any, res: any) {
    if(err)
      return console.error(err);
  
    var contentLength = parseInt(res.headers["content-length"], 10),
        received = 0, progress = 0;
    res.on("data", function(data: any) {
      received += data.length;
      progress = received / contentLength;
      // Do funky stuff with progress
      console.log(progress);
    });
  }