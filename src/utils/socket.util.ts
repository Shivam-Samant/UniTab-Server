import { Server } from "socket.io";

// Structure to manage active sessions
interface ActiveSession {
  userId: string;
  appId: string;
  tabId: string;
}

export const activeSessions: Record<string, ActiveSession> = {}; // Replace this with Redis in production

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("app-opened", ({ userId, appId, tabId }) => {
      // Check for conflicting sessions (excluding the current tab)
      const conflictingSessions = Object.entries(activeSessions).filter(
        ([, session]) => session.userId === userId && session.appId === appId && session.tabId !== tabId
      );

      if (conflictingSessions.length > 0) {
        // Notify the current tab of the conflict
        io.to(socket.id).emit("conflict", {
          appId,
          message: "Another tab opened this application.",
        });
      }

      // Register the current session
      activeSessions[socket.id] = { userId, appId, tabId };
    });

    socket.on("log-out-other-tabs", ({ appId, userId, tabId }) => {
      Object.entries(activeSessions).forEach(([socketId, session]) => {
        if (session.appId === appId && session.userId === userId && session.tabId !== tabId) {
          // Notify the conflicting tabs to log out
          io.to(socketId).emit("logged-out", { appId, message: "You were logged out from another tab." });
          delete activeSessions[socketId];
        }
      });
    });

    socket.on("cancel-session", ({ tabId }) => {
      Object.entries(activeSessions).forEach(([socketId, session]) => {
        if (session.tabId === tabId) {
          delete activeSessions[socketId];
        }
      });

      socket.disconnect();
    });

    socket.on("disconnect", () => {
      delete activeSessions[socket.id];
      console.log("Client disconnected:", socket.id);
    });
  });
};
