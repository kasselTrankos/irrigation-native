const app = {
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#6699CC',
    marginTop: 0,
    height: 1200,
    
  },
  spinner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 20,
    flex: 1,
    justifyContent: 'center',
  },
  spinnerBG: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  counter: {
    position: 'absolute',
    zIndex: 80,
    color: '#ff0099',
    fontSize: 100,
    top: 75,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 300,
    backgroundColor: '#eee',
  },
  containerWater: {
    position: 'relative',
    height: 180,
    width: 160,
    top: 80,
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#97081A',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  waterIndicator: {
    position: 'relative',
    marginTop: 0,
  },
};

module.exports = app;