import SocketIOClient from 'socket.io-client';
import Task from './../lib/task';


const socket = SocketIOClient('http://micasitatucasita.com:3000');
const listen = id => fn => socket.off(id) && socket.on(id, fn);
const publish = ID => msg => socket.emit(ID, msg);



module.exports = {listen, publish};