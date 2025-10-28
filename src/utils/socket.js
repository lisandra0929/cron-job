// Socket.IO y Redis Adapter para escalabilidad
const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');

let ioInstance = null;

function setupSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  // Configura el adaptador Redis (ajusta la URL si tu Redis no está en localhost)
  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

  io.on('connection', (socket) => {
    console.log('Cliente conectado a Socket.IO');
    // Puedes agregar más listeners aquí si lo necesitas
  });

  ioInstance = io;
}

function getIO() {
  if (!ioInstance) throw new Error('Socket.IO no inicializado');
  return ioInstance;
}

module.exports = { setupSocket, getIO };
