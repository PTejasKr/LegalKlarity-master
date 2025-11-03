import { useState, useEffect, useRef } from 'react';
import { Users, MessageCircle, X } from 'lucide-react';
import io, { Socket } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  color: string;
  cursor: { x: number; y: number };
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  position: { x: number; y: number };
}

export default function CollaborationPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const documentId = 'sample-document-id'; // This would be a real document ID in a real app

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001');
    
    const socket = socketRef.current;
    
    // Join the document session
    socket.emit('join-document', documentId);
    
    // Listen for user join events
    socket.on('user-joined', (data) => {
      console.log('User joined:', data);
      // In a real app, you would update the users list
    });
    
    // Listen for user leave events
    socket.on('user-left', (data) => {
      console.log('User left:', data);
      // In a real app, you would update the users list
    });
    
    // Listen for users update
    socket.on('users-update', (usersList) => {
      setUsers(usersList);
    });
    
    // Listen for cursor movement
    socket.on('cursor-move', (data) => {
      // Update user cursor position
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === data.userId 
            ? { ...user, cursor: data.position } 
            : user
        )
      );
    });
    
    // Listen for new comments
    socket.on('comment-added', (comment) => {
      setComments(prevComments => [...prevComments, comment]);
    });
    
    // Listen for comment removal
    socket.on('comment-removed', (commentId) => {
      setComments(prevComments => prevComments.filter(c => c.id !== commentId));
    });
    
    // Cleanup on component unmount
    return () => {
      socket.emit('leave-document', documentId);
      socket.disconnect();
    };
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() && socketRef.current) {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: 'current-user', // This would be the actual user ID
        userName: 'You',
        text: newComment,
        timestamp: new Date().toISOString(),
        position: { x: 50, y: 50 } // This would be the actual position on the document
      };
      
      // Emit the new comment to other users
      socketRef.current.emit('add-comment', comment);
      setComments(prevComments => [...prevComments, comment]);
      setNewComment('');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (socketRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Emit cursor position to other users
      socketRef.current.emit('cursor-move', { x, y });
    }
  };

  return (
    <div className="flex h-full">
      {/* Document View Area */}
      <div 
        className="flex-grow relative bg-gray-50 overflow-hidden dark:bg-slate-900"
        onMouseMove={handleMouseMove}
      >
        {/* Simulated Document */}
        <div className="absolute inset-0 bg-white m-4 rounded-lg shadow-lg p-8 overflow-auto dark:bg-slate-800">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Sample Legal Agreement</h1>
          <p className="text-gray-600 mb-4 dark:text-slate-300">
            This Agreement is made and entered into as of the date of acceptance by and between the parties listed below.
          </p>
          <p className="text-gray-600 mb-4 dark:text-slate-300">
            1. <span className="font-semibold">Services</span>. The Service Provider agrees to perform the services described in Exhibit A.
          </p>
          <p className="text-gray-600 mb-4 dark:text-slate-300">
            2. <span className="font-semibold">Term</span>. This Agreement shall commence on the Effective Date and continue for a period of one (1) year.
          </p>
          <p className="text-gray-600 mb-4 dark:text-slate-300">
            3. <span className="font-semibold">Payment</span>. The Client agrees to pay the Service Provider the fees set forth in Exhibit B.
          </p>
          {/* Add more content as needed */}
        </div>

        {/* User Cursors */}
        {users.map(user => (
          <div
            key={user.id}
            className={`absolute w-4 h-4 ${user.color || 'bg-blue-500'} rounded-full border-2 border-white shadow-lg transition-all duration-100 ease-out`}
            style={{ left: `${user.cursor?.x || 0}%`, top: `${user.cursor?.y || 0}%` }}
            onMouseEnter={() => setHoveredUser(user.id)}
            onMouseLeave={() => setHoveredUser(null)}
          >
            {hoveredUser === user.id && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap dark:bg-slate-700">
                {user.name || 'Anonymous User'}
              </div>
            )}
          </div>
        ))}

        {/* Comment Pins */}
        {comments.map(comment => (
          <div
            key={comment.id}
            className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer"
            style={{ left: `${comment.position.x}%`, top: `${comment.position.y}%` }}
          >
            <MessageCircle size={16} className="text-white" />
          </div>
        ))}
      </div>

      {/* Collaboration Panel */}
      {isPanelOpen && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col dark:bg-slate-800 dark:border-slate-700">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Collaboration</h2>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Online Users */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-gray-600 dark:text-slate-400" />
              <h3 className="font-medium text-gray-800 dark:text-white">Online Users ({users.length})</h3>
            </div>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 ${user.color || 'bg-blue-500'} rounded-full`}></div>
                  <span className="text-sm text-gray-700 dark:text-slate-300">{user.name || 'Anonymous User'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="flex-grow overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <h3 className="font-medium text-gray-800 mb-3 dark:text-white">Comments</h3>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm text-gray-800 dark:text-white">{comment.userName}</span>
                    <span className="text-xs text-gray-500 dark:text-slate-400">
                      {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-slate-300">{comment.text}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-slate-400">
                  No comments yet. Be the first to add one!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Panel Toggle Button */}
      {!isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-l-lg p-2 shadow-md hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
        >
          <MessageCircle size={20} className="text-gray-600 dark:text-slate-400" />
        </button>
      )}
    </div>
  );
}