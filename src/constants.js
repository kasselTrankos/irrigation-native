export const CONSTANTS = {
  HOST: 'http',
  DOMAIN: 'micasitatucasita.com',
  PORT:'3001',
  SOCKET: '3001',
  CONFIG: 'config',
  KALENDAR: 'kalendar',
  RESTART: '',
  TIME: 500,
};

export const KALENDAR =  Object.assign({}, CONSTANTS, {PATH: CONSTANTS.KALENDAR});
export const CONFIG = Object.assign({}, CONSTANTS, {PATH: CONSTANTS.CONFIG});
export const RESTART = Object.assign({}, CONSTANTS, {PATH: CONSTANTS.RESTART});