import SocketIOClient from 'socket.io-client';
import {Future} from './../lib/fp';


const socket = SocketIOClient('http://micasitatucasita.com:3000');
const listen = id => fn => socket.off(id) && socket.on(id, fn);
const publish = ID => msg => socket.emit(ID, msg);

const emit = id => msg => {
    publish(id)(msg);
    return new Future((_, resolve) => listen(id)(msg=> resolve(msg)));
  };

module.exports = emit;