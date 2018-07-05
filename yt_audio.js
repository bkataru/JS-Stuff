/*
* Simple module for downloading audio from youtube videos (uses mp3 format).
* Follows the Common.js module pattern so this module can be imported into any Node.js program.
* Requirements:
*   1. Common node modules like fs, path, readline
*   2. ytdl-core
*
* Methods:
*   1. yt_audio.download([url]); [Specify a valid url to this method to download the audio]
* */
var yt_audio = (function () {
    var fs = require('fs');
    var ytdl = require('ytdl-core');
    var path = require('path');
    var readline = require('readline');


    return {
        download: function (url) {
            if (!url) {
                console.log('yt-audio: error, no URL provided');
            }
            else {
                console.log('Getting video info...please wait.');
                ytdl.getInfo(url, function (err, info) {
                    if (err) {
                        console.log('Error while getting info');
                        throw err;
                    }
                    console.log('Successfully downloaded video info, downloading audio now....');

                    var title = info.title;
                    console.log('Video title: ' + title);

                    var options = {
                        filter: 'audioonly'
                    };
                    var dir = path.resolve(__dirname, 'ytdl-music');

                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }

                    var output = path.resolve(__dirname, 'ytdl-music/' + title + '.mp3');

                    var stream = ytdl(url, options);
                    stream.pipe(fs.createWriteStream(output));
                    var starttime;

                    stream.once('response', function() {
                        starttime = Date.now();
                    });
                    stream.on('progress', function(chunkLength, downloaded, total) {
                        var floatDownloaded = downloaded / total;
                        var downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write((floatDownloaded * 100).toFixed(2) + '% downloaded');
                        process.stdout.write('(' + (downloaded / 1024 / 1024).toFixed(2) + 'MB of ' + (total / 1024 / 1024).toFixed(2) + 'MB)\n');
                        process.stdout.write('running for: ' + downloadedMinutes.toFixed(2) + ' minutes');
                        process.stdout.write(', estimated time left: ' + (downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2) + ' minutes');
                        readline.moveCursor(process.stdout, 0, -1);
                    });
                    stream.on('end', function() {
                        process.stdout.write('\n\n');
                    });
                });
            }
        }
    };
})();

module.exports = yt_audio;