const replace = require('replace-in-file');

const options = {

    //Single file
    files: 'path/to/file',
  
    //Multiple files
    files: [
      'path/to/file',
      'path/to/other/file',
    ],
  
    //Glob(s) 
    files: [
      './node_modules/native-base/src/*.js',
    ],
  
    //Replacement to make (string or regex) 
    from: /componentWillUpdate/gm,
    to: 'UNSAFE_componentWillUpdate',
  };
  replace(options)
  .then(changedFiles => {
    changedFiles
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });