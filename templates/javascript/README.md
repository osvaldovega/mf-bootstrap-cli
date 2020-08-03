# Microfrontend-Blueprint

Frontend template for creating a new host webapp with guest microfrontends.

Please read the Wiki documentation for more information about the basic concepts:
[Raisin Wiki Page: Frontend Composition Strategy](https://raisin-jira.atlassian.net/wiki/x/TABOGQ)

# Tutorial

Technologies used

- Yarn
- React (16.13.1)
- React Hooks
- Webpack (5.0.0-beta.22)
- Webpack Module Federation

# Pre-requesites

- yarn (any version, recommemnded v1.22.0).
- NodeJs (any of the last version works, recommended v13.14.0 or higher).
- ReactJS (v16, recommended 16.13.1)
- Webpack (v5.0.0-beta.22, This specific version)

## Getting Started

1 - Clone the _Microfrontend Blueprint_ repository in 2 different folders, then rename one to _Guest_ and the other one to _Host_:

```
$ git clone git@gitlab.raisin.systems:frontend/tools/microfrontend-blueprint.git
```

2 - Install the depencies (Remember to use Yarn instead of NPM, to avoid conflicts) in both applications:

```
$ yarn install
```

3 - Create a `.env` file with the following content in the root folder of both projects:

```
// .env

// The port will define where your application will run locally, make sure to use a unique port to avoid conflicts across applications.

PORT=3000
HOST=localhost

```

For instance in this tutorial we are going to create a Button that will be exposed in the _Guest_, and then consumed in the _Host_.

## Exposing a component (Guest App)

1- Create a Button:

```
// Guest
// src

$ mkdir -p src/components/button
$ cd src/components/button && touch index.js
```

```
// src/components/button/index.js

import React from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

export default Button;
```

2 - Expose the Button by changing the configuration of the `ModuleFederationPlugin`:

```
// Guest
// webpack/webpack.config.js

const webpackBaseConfig = {
    ...otherWebpackConfigs,

  plugins: [
    new ModuleFederationPlugin({
        name: "mfGuest",
        library: { type: "var", name: "mfGuest" },
        exposes: {
            "./Button": path.join(APP_DIR, "components/button"),
        },
    }),
  ],
};

```

## Consuming a component (Host App)

1 - Create a new component

```
// Host
// src

$ mkdir -p src/components/alert
$ cd src/components/alert && touch index.js styles.scss
```

```
// Host
// src/components/alert/index.js

import React from "react";
import styles from "./styles.scss";

const Alert = ({ error }) => {
  return (
    <div className={styles.alert}>
        <div className={error ? styles.errorAlert : styles.successAlert}>
        { error ? "Something went wrong" : "Everything in the world is fine" }
        </div>
    </div>
  );
};

export default Alert
```

```
// Host
// src/components/alert/styles.scss

.alert {
  max-width: 320px;
  margin: 20px 0;
}

.errorAlert {
  padding: 20px;
  color: #e6411a;
  background-color: #fae6e4;
}

.successAlert {
  padding: 20px;
  color: #007300;
  background-color: #e5f8e0;
}
```

2 - Add the _Guest_ as a remote entry into the _Host_ by changing the config of the `ModuleFederationPlugin`:

```
// Host
// webpack/webpack.config.js

const webpackBaseConfig = {
    ...otherWebpackConfigs,

  plugins: [
    new ModuleFederationPlugin({
      name: "mfHost",
      library: { type: "var", name: "mfHost" },
      remotes: {
        mfGuest: "mfGuest",
      },
    }),
  ],
};
```

3 - Consume the Button from _Guest_ inside _Host_ by adding it in the code:

```
// Host
// src/App.js

import React, { Suspense, useState } from "react";
import Button from "mfGuest/Button"; // <-- this is how to import a MF component
import Alert from "./components/alert";

const App = () => {
  const [error, setError] = useState(false);

  const triggerError = () => setError(true);
  const resetError = () => setError(false);

  return (
    <>
      <h1>Host App</h1>

      <Button onClick={triggerError} text={"Generate error"} />

      <Button
        style={{ marginLeft: "20px" }}
        onClick={resetError}
        text={"Remove error"}
      />

      <Alert error={error} />
    </>
  );
};

export default App;
```

3 - Add in the _Host_ `public/index.html` file the link to the remote entry or _Guest_:

```
// Host
// public/index.html

<head>
    <!-- ...  -->
    <!-- Link to the remote entry (Guest) -->
    <script src="http://localhost:3000/mfGuest.bundle.js"></script>
</head>
```

Note: The URL is composed of the location and name of the _Guest Module_ which you defined before in the Guest's webpack configuration:

```
   new ModuleFederationPlugin({
      name: "mfGuest",
    }),

```
