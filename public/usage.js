
if (!sup1) {
    var sup1 = new SuperGif({ gif: document.getElementById('exampleimg') });
    sup1.load(function () {
    });
}

function getVoices() {
    speechSynthesis.getVoices();
}
getVoices();

function playsyncronized(text) {
    if (text === "") return
    var voice = speechSynthesis.getVoices().filter((voice) => {
        return (voice.name == "Google UK English Female" && voice.lang == "en-GB")
    })[0];
    console.log(voice)
    var substrings = text?.match(/[^.?,!]+[.?,!]?/g);
    for (var i = 0, l = substrings.length; i < l; ++i) {
        var str = substrings[i]?.trim();
        var numpunc = (str.match(/[.?,!]/g) || []).length;
        if (str.length - numpunc > 0) {
            var speakingDurationEstimate = str.length * 50;
            if (str.match(/[\u3400-\u9FBF]/)) {
                speakingDurationEstimate = str.length * 200;
            }
            var msg = new SpeechSynthesisUtterance();
            (function (dur) {
                msg.addEventListener('start', function () {
                    sup1.play_for_duration(dur);
                })
            })(speakingDurationEstimate);
            msg.text = str;
            msg.voice = voice;
            window.speechSynthesis.speak(msg);
        }
    }
}