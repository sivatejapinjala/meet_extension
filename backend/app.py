from flask import Flask, request, jsonify
from sentiment_analysis import analyze_sentiment
from eye_gaze_tracking import track_eye_gaze
from anti_cheating import analyze_video_for_cheating
import os

app = Flask(__name__)

# Ensure uploads directory exists
os.makedirs('uploads', exist_ok=True)

@app.route('/sentiment-analysis', methods=['POST'])
def sentiment_analysis():
    data = request.get_json()
    text = data['text']
    result = analyze_sentiment(text)
    return jsonify(result)

@app.route('/track-eye-gaze', methods=['POST'])
def gaze_tracking():
    video = request.files['video']
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)  # Save the uploaded video
    result = track_eye_gaze(video_path)
    return jsonify(result)

@app.route('/detect-cheating', methods=['POST'])
def detect_cheating():
    video = request.files['video']
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)  # Save the uploaded video
    result = analyze_video_for_cheating(video_path)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
