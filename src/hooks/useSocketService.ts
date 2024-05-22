import { useEffect } from 'react';
import io from 'socket.io-client';
let socketConnections: { [url: string]: any } = {};
const connect = (url: string) => {
  socketConnections[url] = io(url, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
    transports: ['websocket'],
    withCredentials: true,
    upgrade: false,
    forceNew: true,
  });
};
const disconnect = (url: string) => {
  if (socketConnections[url]) {
    socketConnections[url].disconnect();
    delete socketConnections[url];
  }
};
const emit = (url: string, event: string, data: any) => {
  if (socketConnections[url]) {
    socketConnections[url].emit(event, data);
  } else {
    console.error(`Socket connection not found for ${url}`);
  }
};
const on = (url: string, event: string, callback: (...args: any[]) => void) => {
  if (socketConnections[url]) {
    socketConnections[url].on(event, callback);
  } else {
    console.error(`Socket connection not found for ${url}`);
  }
};
const useSocketService = (url: string) => {
  useEffect(() => {
    connect(url);
    return () => {
      disconnect(url);
    };
  }, [url]);
  return {
    emit: (event: string, data: any) => emit(url, event, data),
    on: (event: string, callback: (...args: any[]) => void) => on(url, event, callback),
  };
};
export default useSocketService;
