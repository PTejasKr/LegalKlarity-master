// services/collaborationService.js
import { Server } from 'socket.io';

// Store document sessions and user data
const documentSessions = new Map();
const userSessions = new Map();

export const initializeCollaborationServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a document session
    socket.on('join-document', (documentId) => {
      socket.join(documentId);
      
      // Initialize document session if it doesn't exist
      if (!documentSessions.has(documentId)) {
        documentSessions.set(documentId, new Set());
      }
      
      // Add user to document session
      documentSessions.get(documentId).add(socket.id);
      
      // Store user session data
      userSessions.set(socket.id, { documentId });
      
      // Notify others in the document about the new user
      socket.to(documentId).emit('user-joined', {
        userId: socket.id,
        userName: socket.handshake.query.userName || 'Anonymous User',
      });
      
      // Send current users in the document to the new user
      const users = Array.from(documentSessions.get(documentId)).map(id => ({
        id,
        name: userSessions.get(id)?.name || 'Anonymous User',
      }));
      socket.emit('users-update', users);
    });

    // Leave a document session
    socket.on('leave-document', (documentId) => {
      socket.leave(documentId);
      
      // Remove user from document session
      if (documentSessions.has(documentId)) {
        documentSessions.get(documentId).delete(socket.id);
        
        // Clean up empty document sessions
        if (documentSessions.get(documentId).size === 0) {
          documentSessions.delete(documentId);
        }
      }
      
      // Remove user session data
      userSessions.delete(socket.id);
      
      // Notify others in the document about the user leaving
      socket.to(documentId).emit('user-left', {
        userId: socket.id,
      });
    });

    // Handle cursor movement
    socket.on('cursor-move', (position) => {
      const userSession = userSessions.get(socket.id);
      if (userSession) {
        socket.to(userSession.documentId).emit('cursor-move', {
          userId: socket.id,
          position,
        });
      }
    });

    // Handle adding a comment
    socket.on('add-comment', (comment) => {
      const userSession = userSessions.get(socket.id);
      if (userSession) {
        socket.to(userSession.documentId).emit('comment-added', comment);
      }
    });

    // Handle removing a comment
    socket.on('remove-comment', (commentId) => {
      const userSession = userSessions.get(socket.id);
      if (userSession) {
        socket.to(userSession.documentId).emit('comment-removed', commentId);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      // Clean up user session
      const userSession = userSessions.get(socket.id);
      if (userSession) {
        const { documentId } = userSession;
        
        // Remove user from document session
        if (documentSessions.has(documentId)) {
          documentSessions.get(documentId).delete(socket.id);
          
          // Clean up empty document sessions
          if (documentSessions.get(documentId).size === 0) {
            documentSessions.delete(documentId);
          }
        }
        
        // Remove user session data
        userSessions.delete(socket.id);
        
        // Notify others in the document about the user leaving
        socket.to(documentId).emit('user-left', {
          userId: socket.id,
        });
      }
    });
  });

  return io;
};

// Utility function to get users in a document session
export const getUsersInDocument = (documentId) => {
  if (documentSessions.has(documentId)) {
    return Array.from(documentSessions.get(documentId)).map(id => ({
      id,
      name: userSessions.get(id)?.name || 'Anonymous User',
    }));
  }
  return [];
};