"""
LegalKlarity Learning System - Integrates machine learning model with feedback collection 
to continuously improve document analysis.
"""
import os
import threading
import time
from datetime import datetime
from .model import DocumentAnalysisLearner, FeedbackProcessor
from .feedback_collector import FeedbackCollector


class LearningManager:
    """
    Main learning system manager that coordinates model training,
    feedback collection, and analysis improvements.
    """
    
    def __init__(self, model_path=None, feedback_storage_path=None):
        # Initialize the ML model
        self.learner = DocumentAnalysisLearner(model_path=model_path)
        
        # Initialize feedback collector
        self.feedback_collector = FeedbackCollector(storage_path=feedback_storage_path)
        
        # Initialize feedback processor
        self.feedback_processor = FeedbackProcessor(self.learner)
        
        # Background thread for processing feedback
        self.processing_thread = None
        self.processing_active = False
        
        print("Learning Manager initialized")
    
    def start_background_processing(self, interval_seconds=300):  # Process every 5 minutes
        """
        Start background thread to regularly process new feedback
        """
        self.processing_active = True
        self.processing_thread = threading.Thread(
            target=self._background_processing_worker,
            args=(interval_seconds,),
            daemon=True
        )
        self.processing_thread.start()
        print("Background processing started")
    
    def stop_background_processing(self):
        """
        Stop the background processing thread
        """
        self.processing_active = False
        if self.processing_thread:
            self.processing_thread.join()
        print("Background processing stopped")
    
    def _background_processing_worker(self, interval_seconds):
        """
        Background worker that processes new feedback periodically
        """
        while self.processing_active:
            try:
                # Process unprocessed feedback
                unprocessed_feedback = self.feedback_collector.get_unprocessed_feedback()
                
                if unprocessed_feedback:
                    print(f"Processing {len(unprocessed_feedback)} unprocessed feedback entries")
                    for feedback in unprocessed_feedback:
                        self._process_single_feedback(feedback)
                
                # Sleep for the specified interval
                time.sleep(interval_seconds)
                
            except Exception as e:
                print(f"Error in background processing: {e}")
                time.sleep(interval_seconds)  # Still sleep to avoid busy loop
    
    def _process_single_feedback(self, feedback_entry):
        """
        Process a single feedback entry
        """
        try:
            # Process the feedback through the ML system
            document_id = feedback_entry['document_id']
            analysis_result = feedback_entry['analysis_result']
            feedback = feedback_entry['feedback']
            original_document = feedback_entry['original_document_snippet']
            
            # Add feedback to the learning model
            self.learner.add_feedback(
                document_text=original_document,
                analysis_result=analysis_result,
                user_feedback=feedback
            )
            
            # Mark feedback as processed
            self.feedback_collector.mark_feedback_processed(feedback_entry['id'])
            
            print(f"Processed feedback for document {document_id}")
            
        except Exception as e:
            print(f"Error processing feedback entry {feedback_entry.get('id')}: {e}")
    
    def analyze_document_with_learning(self, text, document_type=None):
        """
        Analyze a document using both AI and learning model predictions
        """
        # Get initial analysis (this would come from existing analysis function)
        # For now, we'll simulate getting an analysis
        analysis_result = self._get_base_analysis(text, document_type)
        
        # Get learning-based quality prediction
        quality_prediction = self.learner.predict_analysis_quality(text)
        
        # Enhance the analysis with learning insights
        enhanced_analysis = self._enhance_analysis_with_learning(
            analysis_result, 
            quality_prediction
        )
        
        return enhanced_analysis
    
    def _get_base_analysis(self, text, document_type):
        """
        Get base analysis from existing system (placeholder)
        In a real implementation, this would call the existing analysis function
        """
        # Placeholder - in real implementation, this would call the actual analysis
        return {
            "summary": f"Analysis of {document_type or 'legal document'} with {len(text)} characters",
            "key_terms": [],
            "main_clauses": [],
            "critical_dates": [],
            "parties": [],
            "jurisdiction": "Not analyzed",
            "obligations": [],
            "risks": [],
            "recommendations": ["Have a legal professional review this document"],
            "missing_clauses": [],
            "compliance_issues": [],
            "next_steps": ["Review document with legal counsel"]
        }
    
    def _enhance_analysis_with_learning(self, base_analysis, quality_prediction):
        """
        Enhance base analysis with learning model insights
        """
        enhanced = base_analysis.copy()
        
        # Add learning-based confidence indicators
        enhanced['learning_insights'] = {
            'analysis_quality_prediction': quality_prediction['quality_score'],
            'model_confidence': quality_prediction['confidence'],
            'confidence_level': self._get_confidence_level(quality_prediction['quality_score'])
        }
        
        # Adjust recommendations based on quality prediction
        if quality_prediction['quality_score'] < 0.3:
            enhanced['recommendations'].insert(0, "Highly recommended to have this document reviewed by a legal expert due to potential complexities or unusual clauses")
        elif quality_prediction['quality_score'] < 0.6:
            enhanced['recommendations'].insert(0, "Consider having this document reviewed by a legal expert for important agreements")
        
        # Add document complexity assessment
        enhanced['document_complexity'] = self._assess_document_complexity(base_analysis)
        
        return enhanced
    
    def _get_confidence_level(self, quality_score):
        """
        Convert quality score to confidence level
        """
        if quality_score >= 0.7:
            return "high"
        elif quality_score >= 0.4:
            return "medium"
        else:
            return "low"
    
    def _assess_document_complexity(self, analysis_result):
        """
        Assess document complexity based on analysis results
        """
        # Count elements that indicate complexity
        num_clauses = len(analysis_result.get('main_clauses', []))
        num_risks = len(analysis_result.get('risks', []))
        num_parties = len(analysis_result.get('parties', []))
        
        complexity_score = (num_clauses * 0.3 + num_risks * 0.5 + num_parties * 0.2)
        
        if complexity_score >= 10:
            return "high"
        elif complexity_score >= 5:
            return "medium"
        else:
            return "low"
    
    def submit_user_feedback(self, document_id, original_document, analysis_result, feedback):
        """
        Submit user feedback to improve the learning system
        """
        # Submit feedback to collector
        result = self.feedback_collector.submit_feedback(
            document_id, 
            original_document, 
            analysis_result, 
            feedback
        )
        
        # Process feedback through ML system immediately
        latest_feedback = self.feedback_collector.get_unprocessed_feedback()
        if latest_feedback:
            # Process the most recent feedback entry
            self._process_single_feedback(latest_feedback[-1])
        
        return result
    
    def get_system_performance(self):
        """
        Get overall system performance metrics
        """
        feedback_summary = self.feedback_collector.get_feedback_summary()
        model_performance = self.learner.get_performance_metrics()
        
        return {
            'feedback_summary': feedback_summary,
            'model_performance': model_performance,
            'timestamp': datetime.now().isoformat()
        }


# Global learning manager instance
learning_manager = None


def get_learning_manager():
    """
    Get the global learning manager instance
    """
    global learning_manager
    if learning_manager is None:
        # Create the learning manager with default paths
        model_path = os.getenv('LEARNING_MODEL_PATH', 'learning_model.pkl')
        feedback_storage_path = os.getenv('FEEDBACK_STORAGE_PATH', 'feedback_storage')
        
        learning_manager = LearningManager(
            model_path=model_path,
            feedback_storage_path=feedback_storage_path
        )
        
        # Start background processing
        processing_interval = int(os.getenv('FEEDBACK_PROCESSING_INTERVAL', '300'))
        learning_manager.start_background_processing(processing_interval)
    
    return learning_manager


def shutdown_learning_system():
    """
    Properly shut down the learning system
    """
    global learning_manager
    if learning_manager:
        learning_manager.stop_background_processing()
        learning_manager = None