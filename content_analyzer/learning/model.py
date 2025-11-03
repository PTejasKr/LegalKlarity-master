"""
Learning model for LegalKlarity - Implements a machine learning system that learns
from user feedback to improve document analysis over time.
"""
import os
import json
import pickle
import numpy as np
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import re


class DocumentAnalysisLearner:
    """
    A machine learning model that learns from document analysis feedback
    to improve future predictions and recommendations.
    """
    
    def __init__(self, model_path=None):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2),
            lowercase=True
        )
        self.classifier = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model_path = model_path or 'learning_model.pkl'
        self.feedback_data = []
        self.is_trained = False
        
        # Load existing model if available
        if os.path.exists(self.model_path):
            self.load_model()
    
    def extract_features(self, text):
        """
        Extract features from document text for classification
        """
        # Basic text statistics
        word_count = len(text.split())
        char_count = len(text)
        avg_word_length = np.mean([len(word) for word in text.split()]) if text.split() else 0
        
        # Legal-specific features
        legal_keywords = [
            'agreement', 'contract', 'party', 'obligation', 'liability', 'warranty',
            'indemnification', 'termination', 'jurisdiction', 'arbitration', 'dispute',
            'compliance', 'regulation', 'penalty', 'remedy', 'condition', 'clause'
        ]
        
        keyword_counts = []
        for keyword in legal_keywords:
            keyword_counts.append(len(re.findall(r'\b' + re.escape(keyword) + r'\b', text.lower())))
        
        # Combine text features with statistics
        features = {
            'word_count': word_count,
            'char_count': char_count,
            'avg_word_length': avg_word_length,
            'legal_keyword_counts': keyword_counts
        }
        
        return features
    
    def preprocess_feedback(self, document_text, analysis_result, user_feedback):
        """
        Process user feedback to create training data
        """
        features = self.extract_features(document_text)
        
        # Create training sample from feedback
        training_sample = {
            'text': document_text,
            'features': features,
            'analysis_result': analysis_result,
            'user_feedback': user_feedback,
            'timestamp': datetime.now().isoformat()
        }
        
        return training_sample
    
    def add_feedback(self, document_text, analysis_result, user_feedback):
        """
        Add user feedback to the learning system
        """
        sample = self.preprocess_feedback(document_text, analysis_result, user_feedback)
        self.feedback_data.append(sample)
        
        # Retrain model with new feedback periodically
        if len(self.feedback_data) % 10 == 0:  # Retrain every 10 feedback entries
            self.retrain_model()
    
    def prepare_training_data(self):
        """
        Prepare training data from feedback
        """
        if not self.feedback_data:
            return None, None
        
        # Extract texts and labels from feedback
        texts = [sample['text'] for sample in self.feedback_data]
        
        # Create labels based on user feedback
        # For now, creating binary classification for "accurate analysis"
        labels = []
        for sample in self.feedback_data:
            feedback = sample['user_feedback']
            # Simple heuristic - if user says "accurate" or "good", label as positive
            if any(word in feedback.get('accuracy', '').lower() for word in ['accurate', 'good', 'correct']):
                labels.append(1)
            elif any(word in feedback.get('accuracy', '').lower() for word in ['inaccurate', 'bad', 'incorrect']):
                labels.append(0)
            else:
                # Default to positive if no clear feedback
                labels.append(1)
        
        return texts, labels
    
    def train_model(self, texts=None, labels=None):
        """
        Train the learning model
        """
        if texts is None or labels is None:
            texts, labels = self.prepare_training_data()
        
        if texts is None or len(texts) == 0:
            print("No training data available")
            return
        
        # Vectorize the texts
        X = self.vectorizer.fit_transform(texts)
        
        # Train the classifier
        self.classifier.fit(X, labels)
        self.is_trained = True
        
        # Save the trained model
        self.save_model()
        print(f"Model trained with {len(texts)} samples")
    
    def retrain_model(self):
        """
        Retrain the model with all accumulated feedback
        """
        print("Retraining model with new feedback...")
        self.train_model()
    
    def predict_analysis_quality(self, document_text):
        """
        Predict the quality of analysis for a given document
        """
        if not self.is_trained:
            # Return neutral prediction if model is not trained
            return {'quality_score': 0.5, 'confidence': 0.5}
        
        try:
            # Transform the text using the fitted vectorizer
            X = self.vectorizer.transform([document_text])
            
            # Predict
            prediction = self.classifier.predict_proba(X)[0]
            
            # Return quality score based on prediction
            quality_score = prediction[1] if len(prediction) > 1 else 0.5
            confidence = max(prediction)
            
            return {
                'quality_score': float(quality_score),
                'confidence': float(confidence)
            }
        except Exception as e:
            print(f"Prediction error: {e}")
            return {'quality_score': 0.5, 'confidence': 0.0}
    
    def save_model(self):
        """
        Save the trained model to disk
        """
        model_data = {
            'vectorizer': self.vectorizer,
            'classifier': self.classifier,
            'is_trained': self.is_trained,
            'feedback_data': self.feedback_data
        }
        
        with open(self.model_path, 'wb') as f:
            pickle.dump(model_data, f)
        print(f"Model saved to {self.model_path}")
    
    def load_model(self):
        """
        Load a trained model from disk
        """
        try:
            with open(self.model_path, 'rb') as f:
                model_data = pickle.load(f)
            
            self.vectorizer = model_data['vectorizer']
            self.classifier = model_data['classifier']
            self.is_trained = model_data['is_trained']
            self.feedback_data = model_data.get('feedback_data', [])
            
            print(f"Model loaded from {self.model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
    
    def get_performance_metrics(self):
        """
        Calculate performance metrics if we have enough data
        """
        if len(self.feedback_data) < 2:
            return {'message': 'Not enough feedback data to calculate metrics'}
        
        texts, labels = self.prepare_training_data()
        if texts is None or len(texts) < 2:
            return {'message': 'Not enough labeled data to calculate metrics'}
        
        X = self.vectorizer.transform(texts)
        predictions = self.classifier.predict(X)
        
        # Generate classification report
        report = classification_report(labels, predictions, output_dict=True)
        
        return {
            'accuracy': report['accuracy'],
            'precision': report['weighted avg']['precision'],
            'recall': report['weighted avg']['recall'],
            'f1_score': report['weighted avg']['f1-score'],
            'total_samples': len(labels)
        }


class FeedbackProcessor:
    """
    Processes user feedback to improve document analysis
    """
    
    def __init__(self, learner_model):
        self.learner = learner_model
    
    def process_feedback(self, document_id, analysis_result, feedback):
        """
        Process user feedback to improve future analyses
        """
        # Validate feedback structure
        required_fields = ['accuracy', 'relevance', 'completeness', 'overall_rating']
        if not all(field in feedback for field in required_fields):
            raise ValueError(f"Feedback must contain: {required_fields}")
        
        # Store feedback for learning
        self.learner.add_feedback(
            document_text=feedback.get('original_document', ''),
            analysis_result=analysis_result,
            user_feedback=feedback
        )
        
        return {
            'message': 'Feedback processed successfully',
            'document_id': document_id
        }