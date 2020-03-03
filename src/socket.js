import io from 'socket.io-client';
import Task from './../lib/task';


const socket = io('http://micasitatucasita.com:3000');
const listen = id => new Task((_, resolve) => {
  socket.on(id, resolve)
});
const publish = (ID, msg) => socket.emit(ID, msg);



module.exports = {listen, publish};