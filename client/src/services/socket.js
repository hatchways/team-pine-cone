import socketClient from "socket.io-client";
export const socket = socketClient(window.location.origin + "/");
