const app = {
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fffffe',
    marginTop: 20,
    height: '100%',
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
    height: 200,
    width: 245,

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