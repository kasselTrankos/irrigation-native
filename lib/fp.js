function Future(computation, _return) {
    this.fork = computation;
    this._return = _return || function() {};
  }
  Future.prototype.chain = function _chain(f) {
    var fork = this.fork;
    var _return = this._return;
  
    return new Future(function(reject, resolve) {
      return fork(function(a) {
        return reject(a);
      }, function(b) {
        return f(b).fork(reject, resolve);
      });
    }, _return);
  };
  
  Future.prototype.of = function _of(b) {
    return new Future(function(_, resolve) {
      return resolve(b);
    });
  };
  Future.of = Future.prototype.of;
  
  Future.prototype.map = function _map(f) {
    var fork = this.fork;
    var _return = this._return;
  
    return new Future(function(reject, resolve) {
      return fork(function(a) {
        return reject(a);
      }, function(b) {
        return resolve(f(b));
      });
    }, _return);
  };
  
  Future.map = Future.prototype.map;
  
  
  
  const IO = function(f) {
    this.__value = f;
  };
  
  IO.of = function(x) {
    return new IO(function() {
      return x;
    });
  };
  
  IO.prototype.map = function(f) {
    return new IO(f(this.__value));
  };
  
  const doNothig = () => {};
  
  module.exports = {Future, IO, doNothig};