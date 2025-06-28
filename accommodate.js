// accommodate.js
const micButton = document.getElementById('micButton');
const textInput = document.getElementById('textInput');
const status = document.getElementById('status');

// Check if browser supports SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  micButton.addEventListener('click', () => {
    recognition.start();
    status.textContent = 'Listening... Speak now!';
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    textInput.value += transcript;
    status.textContent = 'Voice input added!';
  };

  recognition.onerror = (event) => {
    status.textContent = `Error: ${event.error}`;
  };

  recognition.onend = () => {
    status.textContent = 'Microphone stopped.';
  };
} else {
  micButton.disabled = true;
  status.textContent = 'Speech recognition not supported in this browser.';
}