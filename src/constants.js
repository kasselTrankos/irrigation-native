export const CONSTANTS = {
  HOST: 'http',
  DOMAIN: 'micasitatucasita.com',
  PORT:'3000',
  CONFIG: 'config',
  KALENDAR: 'kalendar',
};

export const KALENDAR =  Object.assign({}, CONSTANTS, {PATH: CONSTANTS.KALENDAR});
export const CONFIG = Object.assign({}, CONSTANTS, {PATH: CONSTANTS.CONFIG});