// Capture audio for sentiment analysis
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    const audioContext = new AudioContext();
    const input = audioContext.createMediaStreamSource(stream);
    // Send audio data to backend for analysis
    sendAudioToBackend(input);
  })
  .catch(function(err) {
    console.log("Error accessing microphone: " + err);
  });

  fetch('http://127.0.0.1:5000/anti-cheating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: "tab_switch" })
  });
  

// Capture video for eye gaze tracking
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    // Analyze eye gaze data here using TensorFlow.js or send to backend
  })
  .catch(function(err) {
    console.log("Error accessing webcam: " + err);
  });

// Function to send audio to the backend
function sendAudioToBackend(audioData) {
  fetch('http://127.0.0.1:5000/analyze-sentiment', {
    method: 'POST',
    body: audioData
  }).then(response => response.json())
    .then(data => console.log("Sentiment Analysis:", data));
}

// Detect tab switching for anti-cheating
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab.url.indexOf('meet.google.com') === -1) {
      console.log("Suspicious activity: Tab switch detected");
      fetch('http://127.0.0.1:5000/anti-cheating', {
        method: 'POST',
        body: JSON.stringify({ action: "tab_switch" })
      });
    }
  });
});
