from transformers import pipeline

# Load the sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

def analyze_sentiment(text):
    """
    Analyzes the sentiment of the provided text.
    
    Parameters:
    - text (str): The text to analyze.

    Returns:
    - dict: A dictionary with the sentiment and confidence score.
    """
    result = sentiment_pipeline(text)[0]  # Get the result
    return {
        "sentiment": result['label'].lower(),
        "confidence": result['score']
    }
