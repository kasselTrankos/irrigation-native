import io from 'socket.io-client';
import Task from './../lib/task';


const socket = io('http://micasitatucasita.com:3000', {forceNew: true});
const listen = id => new Task((_, resolve) => {
  socket.off(id);
  socket.on(id, resolve);
  
});
const irrigate = new Task((_, resolve)=> {
  socket.off('made riego');
  socket.on('made riego', resolve);
});
const publish = (ID, msg) => socket.emit(ID, msg);


module.exports = {listen, publish, irrigate};