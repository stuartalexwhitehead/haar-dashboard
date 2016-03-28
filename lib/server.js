/**
 * This is the only ES5 file.
 * Any further server-side modules will be transpiled from ES2015 by babel-register.
 */
require('babel-polyfill');
require('babel-register')({
  only: '/lib/**/*',
  presets: ['es2015', 'stage-2', 'react'],
});

require('server/app').default.listen(3001, () => {
  console.log('listening on port 3001'); // eslint-disable-line no-console
});
