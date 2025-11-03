// services/socketService.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

let socket;

export const connectSocket = (documentId, userId) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      query: { documentId, userId }
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinDocument = (documentId) => {
  if (socket) {
    socket.emit('join-document', documentId);
  }
};

export const leaveDocument = (documentId) => {
  if (socket) {
    socket.emit('leave-document', documentId);
  }
};

export const sendCursorMove = (position) => {
  if (socket) {
    socket.emit('cursor-move', position);
  }
};

export const sendComment = (comment) => {
  if (socket) {
    socket.emit('add-comment', comment);
  }
};

export const removeComment = (commentId) => {
  if (socket) {
    socket.emit('remove-comment', commentId);
  }
};

export const onUsersUpdate = (callback) => {
  if (socket) {
    socket.on('users-update', callback);
  }
};

export const onCursorMove = (callback) => {
  if (socket) {
    socket.on('cursor-move', callback);
  }
};

export const onCommentAdded = (callback) => {
  if (socket) {
    socket.on('comment-added', callback);
  }
};

export const onCommentRemoved = (callback) => {
  if (socket) {
    socket.on('comment-removed', callback);
  }
};