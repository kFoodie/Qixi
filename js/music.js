// 音乐配置
var audioConfig = {
    enable: true, // 是否开启音乐
    playURl: 'music/happy.mp3', // 正常播放地址
    cycleURL: 'music/circulation.mp3' // 正常循环播放地址
};

/////////
//背景音乐 //
/////////
function Hmlt5Audio(url, isloop) {
    var audio = new Audio(url);
    audio.autoPlay = true;
    audio.loop = isloop || false;
    audio.play();
    return {
        end: function(callback) {
            audio.addEventListener('ended', function() {
                callback();
            }, false);
        }
    };
}