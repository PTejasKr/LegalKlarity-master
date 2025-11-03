"""
Feedback collection system for LegalKlarity - Collects user feedback
to improve document analysis quality.
"""
import json
import os
from datetime import datetime
from enum import Enum


class FeedbackCategory(Enum):
    """Categories of feedback that can be collected"""
    ACCURACY = "accuracy"
    RELEVANCE = "relevance"
    COMPLETENESS = "completeness"
    CLARITY = "clarity"
    TIMELINESS = "timeliness"
    RECOMMENDATIONS = "recommendations"


class FeedbackCollector:
    """
    Collects and manages user feedback for document analysis improvement
    """
    
    def __init__(self, storage_path=None):
        self.storage_path = storage_path or 'feedback_storage'
        if not os.path.exists(self.storage_path):
            os.makedirs(self.storage_path)
        
        self.feedback_file = os.path.join(self.storage_path, 'feedback.json')
        self.feedback_history = self._load_feedback_history()
    
    def _load_feedback_history(self):
        """
        Load existing feedback from storage
        """
        if os.path.exists(self.feedback_file):
            try:
                with open(self.feedback_file, 'r') as f:
                    return json.load(f)
            except (json.JSONDecodeError, FileNotFoundError):
                return []
        return []
    
    def _save_feedback_history(self):
        """
        Save feedback history to storage
        """
        with open(self.feedback_file, 'w') as f:
            json.dump(self.feedback_history, f, indent=2)
    
    def validate_feedback(self, feedback_data):
        """
        Validate feedback data structure
        """
        required_fields = [
            'document_id',
            'original_document_snippet',  # First 500 chars of original document
            'analysis_result',            # The analysis that was provided
            'feedback'                    # The feedback object
        ]
        
        if not all(field in feedback_data for field in required_fields):
            raise ValueError(f"Feedback must contain: {required_fields}")
        
        # Validate feedback structure
        feedback_obj = feedback_data['feedback']
        required_feedback_fields = [
            'accuracy',          # 1-5 rating
            'relevance',         # 1-5 rating
            'completeness',      # 1-5 rating
            'overall_rating',    # 1-5 rating
            'comments',          # Optional text feedback
            'improvement_suggestions'  # What should be improved
        ]
        
        if not all(field in feedback_obj for field in required_feedback_fields):
            raise ValueError(f"Feedback object must contain: {required_feedback_fields}")
        
        # Validate rating ranges
        ratings = ['accuracy', 'relevance', 'completeness', 'overall_rating']
        for rating_field in ratings:
            value = feedback_obj[rating_field]
            if not isinstance(value, (int, float)) or not (1 <= value <= 5):
                raise ValueError(f"{rating_field} must be a number between 1 and 5")
        
        return True
    
    def collect_feedback(self, feedback_data):
        """
        Collect and store user feedback
        """
        # Validate feedback data
        self.validate_feedback(feedback_data)
        
        # Create feedback entry
        feedback_entry = {
            'id': len(self.feedback_history) + 1,
            'timestamp': datetime.now().isoformat(),
            'document_id': feedback_data['document_id'],
            'original_document_snippet': feedback_data['original_document_snippet'],
            'analysis_result': feedback_data['analysis_result'],
            'feedback': feedback_data['feedback'],
            'processed': False  # Will be set to True when processed by ML model
        }
        
        # Add to feedback history
        self.feedback_history.append(feedback_entry)
        
        # Save to storage
        self._save_feedback_history()
        
        return {
            'message': 'Feedback received successfully',
            'feedback_id': feedback_entry['id'],
            'processed': False
        }
    
    def get_unprocessed_feedback(self):
        """
        Get feedback that hasn't been processed by the ML model yet
        """
        return [fb for fb in self.feedback_history if not fb.get('processed', False)]
    
    def mark_feedback_processed(self, feedback_id):
        """
        Mark feedback as processed by the ML model
        """
        for feedback in self.feedback_history:
            if feedback['id'] == feedback_id:
                feedback['processed'] = True
                self._save_feedback_history()
                return True
        return False
    
    def get_feedback_summary(self):
        """
        Get a summary of collected feedback
        """
        if not self.feedback_history:
            return {
                'total_feedback': 0,
                'average_ratings': {},
                'recent_feedback': []
            }
        
        total_feedback = len(self.feedback_history)
        
        # Calculate average ratings
        if total_feedback > 0:
            accuracy_sum = sum(fb['feedback']['accuracy'] for fb in self.feedback_history)
            relevance_sum = sum(fb['feedback']['relevance'] for fb in self.feedback_history)
            completeness_sum = sum(fb['feedback']['completeness'] for fb in self.feedback_history)
            overall_sum = sum(fb['feedback']['overall_rating'] for fb in self.feedback_history)
            
            average_ratings = {
                'accuracy': round(accuracy_sum / total_feedback, 2),
                'relevance': round(relevance_sum / total_feedback, 2),
                'completeness': round(completeness_sum / total_feedback, 2),
                'overall': round(overall_sum / total_feedback, 2)
            }
        else:
            average_ratings = {}
        
        # Get recent feedback
        recent_feedback = self.feedback_history[-5:]  # Last 5 feedback entries
        
        return {
            'total_feedback': total_feedback,
            'average_ratings': average_ratings,
            'recent_feedback': recent_feedback
        }
    
    def export_feedback(self, export_format='json'):
        """
        Export feedback data in specified format
        """
        if export_format == 'json':
            return json.dumps(self.feedback_history, indent=2)
        else:
            raise ValueError(f"Unsupported export format: {export_format}")


class FeedbackAPI:
    """
    API interface for feedback collection
    """
    
    def __init__(self, collector):
        self.collector = collector
    
    def submit_feedback(self, document_id, original_document, analysis_result, feedback):
        """
        Submit feedback through the API
        """
        feedback_data = {
            'document_id': document_id,
            'original_document_snippet': original_document[:500],  # First 500 chars
            'analysis_result': analysis_result,
            'feedback': feedback
        }
        
        return self.collector.collect_feedback(feedback_data)
    
    def get_feedback_summary(self):
        """
        Get feedback summary through the API
        """
        return self.collector.get_feedback_summary()