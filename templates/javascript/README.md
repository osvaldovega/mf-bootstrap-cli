# Microfrontend-Application

Micro-Frontend basic template.

# Pre-requesites

- Node v12.18.3 or higher.
- NPM v6.14.6 or higher.
- Yarn v1.22.4 or higher.

# Usage

- To run/start the project run.

  ```
  $ yarn start
  ```

- To build the project run.

  ```
  $ yarn build
  ```

- To run the tests.

  ```
  $ yarn test
  ```

- To run the test on watch mode.

  ```
  $ yarn test:watch
  ```

- To run eslint on the project.
  ```
  $ yarn lint
  ```

These are the available scripts:

```
"start": "cross-env NODE_ENV=development webpack-dev-server --config ./webpack/webpack.development.js",

"build": "cross-env NODE_ENV=production webpack --config ./webpack/webpack.production.js",

"lint": "eslint --ext .ts,.tsx,.js,.jsx --no-error-on-unmatched-pattern src/",

"lint:fix": "eslint --ext .ts,.tsx,.js,.jsx --no-error-on-unmatched-pattern --quiet --fix",

"pretest": "yarn test:clean && yarn lint",

"test:clean": "rimraf ./coverage",

"test": "cross-env NODE_ENV=test jest --config jest.config.js --coverage",

"test:watch": "cross-env NODE_ENV=test jest --watchAll",

"prettify": "prettier . --write"
```

# Getting Started

1. Install project dependencies:

   ```
   $ yarn install
   ```

2. Open and check the `.env` file and update the port, project name, and micro-frontend name if you want to, if not you can use default ones:

   ```
   // .env

   # Name of the application
   APP_NAME=mfApplication

   # Name of the Webpack Module Federation bundle
   MF_NAME=mfApplication

   # Application port
   PORT=3001

   #  Use as output public path for webpack (DEVELOPMENT)
   HOST=localhost

   # Use as output public path for webpack (PRODUCTION)
   PUBLIC_PATH_PROD=/
   ```

3. Start the project running the command.
   ```
   $ yarn start
   ```

# Expose/Export assets through Webpack Module Federation (Plugin).

To expose any type of assets or element using the MF plugin, first check that your local project runs properly locally. After this, you can share/expose any asset or element in the following way.

1. Open the `webpack/moduleFederation.js` file, should look like this:

   ```
   const { includePathFromSrc } = require('./paths');

   /**
   * Object where will be include all
   * components, logic and shared files
   * e.g './Button': includePathFromSrc('component/Button/index.js')
   */
   const exposes = {};

   /**
   * Object with the names of remotes files
   * module federation bundle files to include
   * in the application.
   * e.g <remote name>: '<MF_NAME>@http://localhost:<PORT>/static/remoteEntry.js'
   * e.g mfRemote: 'mfRemote@http://localhost:3002/static/remoteEntry.js'
   */
   const remotes = {};

   module.exports = {
   	exposes,
   	remotes,
   };
   ```

2. Edit the file and add the list or assets inside the `exposes` object:

   ```
   /**
   * Object where will be include all
   * components, logic and shared files
   * e.g './Button': includePathFromSrc('component/Button/index.js')
   */
   const exposes = {
   	'./<asset name>': includePathFromSrc('path/of/your/element'),
   	'./<asset name>': includePathFromSrc('path/of/your/element'),
   };
   ```

   > NOTE: Please be sure to add always a dot and slash before the asset name. e.g `./MyButton` and the elements to share will be always inside `src/` directory.

3. Restart the application.

4. To confirm that the assets are properly exposed through the MF plugin, the project should run properly locally and see if the module was created properly run the URL.

   ```
   http://localhost:3001/static/remoteEntry.js
   ```

   > NOTE: The port is the same value that you set in the `.env` file and the remote entry file should load without any problem.

# Consume/Import assets through Webpack Module Federation (Plugin).

1. Confirm that the project is running properly locally.
2. Open the `webpack/moduleFederation.js` file, should look like this:

   ```
   const { includePathFromSrc } = require('./paths');

   /**
   * Object where will be include all
   * components, logic and shared files
   * e.g './Button': includePathFromSrc('component/Button/index.js')
   */
   const exposes = {};

   /**
   * Object with the names of remotes files
   * module federation bundle files to include
   * in the application.
   * e.g <remote name>: '<MF_NAME>@http://localhost:<PORT>/static/remoteEntry.js'
   * e.g mfRemote: 'mfRemote@http://localhost:3002/static/remoteEntry.js'
   */
   const remotes = {};

   module.exports = {
   	exposes,
   	remotes,
   };
   ```

3. Edit the file and add inside the `remotes` object the reference to the assets you need to import.

   ```
   /**
   * Object with the names of remotes files
   * module federation bundle files to include
   * in the application.
   * e.g <remote name>: '<MF_NAME>@http://localhost:<PORT>/static/remoteEntry.js'
   * e.g mfRemote: 'mfRemote@http://localhost:3002/static/remoteEntry.js'
   */
   const remotes = {
   	 <module federation name>: '<module federation name>@<URL>:<port>/remoteEntry.js'
    };
   ```

   > NOTE: The module federation name, is the name used for the other micro-frontend application inside the `.env` file, the variable name is `MF_NAME`.
   > In case you are pointing to the production URL, you need to use the `module federation name`, domain and the remoteEntry.js, like this: `mfApplication: 'mfApplication@<production URL>/remoteEntry.js'`

4. Restart the application and confirm the application is still running properly.
5. To start using the remote entry in your application go to the file that you need to import the assets and import it in the following way

   ```
   const <asset name> = React.lazy(() => import('mfApplication/<asset name>'));
   ```

   > Remember: `mfApplication` is the value that you assign to the remote entry in your application inside the `webpack/moduleFederation.js` file in the remotes section.
