# Microfrontend-Application

Base Micro-Frontend application.

# Tutorial

Technologies used

- React (16.13.1)
- Webpack (5.0.0-beta.22)
- Webpack Module Federation

# Pre-requesites

- NodeJs (any of the last version works, recommended v13.14.0 or higher).
- ReactJS (v16, recommended 16.13.1)
- Webpack (v5.0.0-beta.22, This specific version)

## Getting Started

1. Check and update the `.env` file:

```
// .env

# Name of the application
APP_NAME=mf-application

# Name of the Webpack Module Federation bundle
MF_NAME=mf-application

# Application port
PORT=3001

#  Use as output public path for webpack (DEVELOPMENT)
HOST=localhost

# Use as output public path for webpack (PRODUCTION)
PUBLIC_PATH_PROD=/

# Boolean variable to enable or disabled the webpack bundle analyzer
ANALYZER=false
```

## Exposing a component.

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

2 - Expose the Button by adding the component in the file `webpack/moduleFerderation.js`:

```
// webpack/moduleFerderation.js

const exposes = {
  "./Button": path.join(APP_DIR, "components/button"),
};

```

## Consuming a component

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
