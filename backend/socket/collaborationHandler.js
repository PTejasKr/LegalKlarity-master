// socket/collaborationHandler.js
import { initializeCollaborationServer, getUsersInDocument } from '../services/collaborationService.js';

let io;

export const setupCollaborationSocket = (server) => {
  io = initializeCollaborationServer(server);
  
  // Additional socket event handlers can be added here if needed
  io.on('connection', (socket) => {
    // Custom event handlers for your application can be added here
    
    // Example: Handle a request for current users in a document
    socket.on('get-users-in-document', (documentId) => {
      const users = getUsersInDocument(documentId);
      socket.emit('document-users', { documentId, users });
    });
  });
};

export const getSocketInstance = () => io;