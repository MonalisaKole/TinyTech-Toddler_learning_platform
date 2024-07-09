const transcription = document.getElementById('transcription');
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
        transcription.innerHTML = 'Listening... ';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                transcription.innerHTML += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        transcription.innerHTML += interimTranscript;
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
    };
} else {
    alert('Your browser does not support speech recognition');
}
	
function startProcess(objectName){
	recognition.start();
	setTimeout(() => {
		recognition.stop();
	}, 5000);
	setTimeout(() => {
		processAudioTranscript(objectName);
	}, 5001);
}

function processAudioTranscript(objectName) {
	transcriptionResult.innerHTML = '';
	if (transcription.innerHTML.toLowerCase().includes(objectName.toLowerCase()) ) {
		transcriptionResult.innerHTML = 'Result: Correct';
		const outcome = document.getElementById("yes");
		const objectNameAudio = document.getElementById(objectName);
		outcome.play();
		outcome.addEventListener('ended', () => {
			objectNameAudio.play();
		});
		objectNameAudio.addEventListener('ended', () => {
			window.location.href = objectName.concat('','.html');
		});
	} else {
		transcriptionResult.innerHTML = 'Result: Retry';
		document.getElementById("tryAgain").play();
	}
}