## Installing bash commands in the terminal and extensions in the VSC: 

**Computer Installation**

- npmjs.com sign up
- node.js download
- git bash download
- postman
- Docker
- VSC

**VSC Extensions**
Code Spell Checker
ESLint
Live Server
Markdown Preview Enhanced
Material Icon Theme
Docker

**Commands on terminal and package.json scripts**

*pre-install & basic configuration*
- npm install -g typescript 
- ls -> show lists of file in the current directory

*basic node commands*
- node *server.js* *parameter* -> will execute the program and will bring a second parameter in the argv array which can be interpolated in the program by using ${process.argv[2]} 
- console.log(process) -> See the process in the terminal (e.g argv array)

*export parameters - environmental variables*
- export DATABASE_URL = http://mysite/Golanchuk -> assign environmental URL to work on in the current process
- echo $DATABASE_URL -> Find out what is the environmental URL in the current process

*packages*
- npm init -y --> Create our program a module, by creating a package-json file in our root.
- npm login
- npm publish

- npm i -g nodemon -> Rebooting and initializing the server with every save we do. NOTE: could be installed in bash and not on specific project (because it is global)
- nodemon *server.js* -> Now we use this command instead of the usual node *server.js*
- rs -> restarting server (independent of saving the program)
- unset port -> cancel the environmental port

- tsc --init : create tsconfig file, in it we should comment out outDir: "./dist" 
- tsc -w : everytime we save the ts file it will compile to and save js files in the dist folder.

- npm i:  download all our saved modules in new projects.
- npm i -g typescript || tsc: installing TypeScript compiler
- npm i -g ts-node : working with TypeScript-with-Node envelope.
- npm i -g ts-node-dev -D: instead of the regular nodemon, located in the devDependencies
- npm i express: installing express module to replace the normal createServer function.
- npm i @types/express -D: finding express types within TypeScript.


Creating docker database:
- docker run --name mysql -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=johnbryce -e MYSQL_TCP_PORT=3306 -p 3306:3306 mysql:latest 
- docker run --name phpmyadmin -d --link mysql:db -p 8080:80 phpmyadmin

docker compose down -v: abolish the server 
docker compose up -d: create the server afresh

Building docker images:
- docker build ./ -t helloworld:1.0.0

Running docker containers:
- docker run --name weezer-backend-js -d -p 3010:3000 -e DB_HOST=host.docker.internal helloworld:1.0.0


A library that helps with everything that's connected to the configuration and environment of our app:
- npm i config
- npm i @types/config -D

Work with SQL on TS:
- npm i sequelize-typescript

Connect the database language with node:
- npm i mysql2

Using the joi validation mechanism:
- npm i joi
- npm i @types/joi -D

Installing jwt commands and types:
- npm i jsonwebtoken
- npm i @types/jsonwebtoken -D

Installing node types:
- npm i @types/node -D

Integrate servers and localhosts:
- npm i cors
- npm i @types/cors -D

Scripts: to type npm run dev instead of a long command:
- "dev": "ts-node-dev src/app.ts"

*React*
npm create vite@latest
npm i
npm i 
    @reduxjs/toolkit react-redux
    @reduxjs/toolkit 
    axios
    jwt-decode
    react
    react-dom
    react-hook-form
    react-redux
    react-router-dom
    uuid
npm run dev: Run the application in developers' mode
npm run build: Run the application in production mode

*localstack*

- docker run --name localstack -d --rm -it -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack



**Commands on docker - will only work with semicolon in the end**

- mysql -u root; 
- create database  _______;
- show databases/tables; 
- use ________(name of db);
- desc ___________(specific table);


**Generic backend package-json**

```json
{
    "name": "01-weezer-server",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "ts-node-dev src/app.ts",
        "build": "tsc",
        "start": "node ./dist/app.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "@aws-sdk/client-s3": "^3.922.0",
        "@aws-sdk/lib-storage": "^3.922.0",
        "@types/express-fileupload": "^1.5.1",
        "config": "^4.1.1",
        "cors": "^2.8.5",
        "express": "^5.1.0",
        "express-fileupload": "^1.5.2",
        "joi": "^18.0.1",
        "jsonwebtoken": "^9.0.2",
        "jwt-decode": "^4.0.0",
        "mysql2": "^3.15.1",
        "sequelize-typescript": "^2.1.6"
    },
    "devDependencies": {
        "@types/config": "^3.3.5",
        "@types/cors": "^2.8.19",
        "@types/express": "^5.0.3",
        "@types/joi": "^17.2.3",
        "@types/jsonwebtoken": "^9.0.10",
        "@types/node": "^24.8.1",
        "ts-node-dev": "^2.0.0",
        "typescript": "^5.9.3"
    }
}

```

**Generic frontend package-json**

```json
{
    "name": "01-more-usage-for-curley-brackets",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "docker": "vite --mode docker",
        "build:compose": "tsc -b && vite build --mode compose",
        "build": "tsc -b && vite build",
        "qa": "tsc -b && vite build --mode qa",
        "lint": "eslint .",
        "preview": "vite preview"
    },
    "dependencies": {
        "@reduxjs/toolkit": "^2.8.2",
        "axios": "^1.11.0",
        "jwt-decode": "^4.0.0",
        "react": "^19.1.1",
        "react-dom": "^19.1.1",
        "react-hook-form": "^7.62.0",
        "react-redux": "^9.2.0",
        "react-router-dom": "^7.8.2",
        "uuid": "^13.0.0"
    },
    "devDependencies": {
        "@eslint/js": "^9.33.0",
        "@types/react": "^19.1.10",
        "@types/react-dom": "^19.1.7",
        "@vitejs/plugin-react": "^5.0.0",
        "eslint": "^9.33.0",
        "eslint-plugin-react-hooks": "^5.2.0",
        "eslint-plugin-react-refresh": "^0.4.20",
        "globals": "^16.3.0",
        "typescript": "~5.8.3",
        "typescript-eslint": "^8.39.1",
        "vite": "^7.1.2"
    }
}

```


**Generic tsconfig**

```json
{
    "compilerOptions": {
        /* Visit https://aka.ms/tsconfig to read more about this file */
        /* Projects */
        // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
        // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
        // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
        // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
        // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
        // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
        /* Language and Environment */
        "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
        // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
        // "jsx": "preserve",                                /* Specify what JSX code is generated. */
        // "libReplacement": true,                           /* Enable lib replacement. */
        "experimentalDecorators": true, /* Enable experimental support for legacy experimental decorators. */
        "emitDecoratorMetadata": true, /* Emit design-type metadata for decorated declarations in source files. */
        // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
        // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
        // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
        // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
        // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
        // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
        // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */
        /* Modules */
        "module": "commonjs", /* Specify what module code is generated. */
        // "rootDir": "./",                                  /* Specify the root folder within your source files. */
        // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
        // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
        // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
        // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
        // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
        // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
        // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
        // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
        // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
        // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
        // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
        // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
        // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
        // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
        // "resolveJsonModule": true,                        /* Enable importing .json files. */
        // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
        // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */
        /* JavaScript Support */
        // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
        // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
        // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */
        /* Emit */
        // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
        // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
        // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
        // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
        // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
        // "noEmit": true,                                   /* Disable emitting files from a compilation. */
        // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
        "outDir": "./dist", /* Specify an output folder for all emitted files. */
        // "removeComments": true,                           /* Disable emitting comments. */
        // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
        // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
        // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
        // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
        // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
        // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
        // "newLine": "crlf",                                /* Set the newline character for emitting files. */
        // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
        // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
        // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
        // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
        // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
        /* Interop Constraints */
        // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
        // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
        // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
        // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
        // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
        "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
        // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
        "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
        /* Type Checking */
        "strict": false, /* Enable all strict type-checking options. */
        // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
        // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
        // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
        // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
        // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
        // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
        // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
        // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
        // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
        // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
        // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
        // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
        // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
        // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
        // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
        // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
        // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
        // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
        // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
        /* Completeness */
        // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
        "skipLibCheck": true /* Skip type checking all .d.ts files. */
    }
}
```

## Lesson #01 - Server creating

*inner import/export*
- module.exports = {
    sum,
    sub,
    mul
} -> common js way to export 
- const { sum } = require('./calculator') -> common js way to import 

*server*
- require('http').createServer((request, response) => response.end('<h3>hello world</h3>')).listen(3000) -> Creating a basic server by requiring (importing) an inherent http package (doesn't need npm i to install it), then;
create a server with two parameters: request - information we receive as URL paths and methods, and response - the actual content, which must be a string, therefore if pulled out of a JSON structure must be used with JSON.stringify enveloping it, with;
listen concatenated function with the port as its parameter, and also optionally a callback of console log (e.g to tell the the server has started).
- process.env.DATABASE_URL -> will bring the environmental variable\
- process.env.PORT -> will bring the correspondent port on which we will work on
- response.writeHead(404).end('not found') -> A way to deliver a status (instead of page)
- response.setHeader('Content-Type', 'application/json') -> Make sure the format of the page is JSON and not a string.


## Lesson #02 - Express module

**Examples**

*Example #1 - old way to create a server*   

```js
createServer((request, response)): 
```

This function is programmed to receive two callback functions:
request -> information we noramlly receive by the URL paths and methods, or as data wrapped in object which can be accumulated. 
response -> the acutal content to be viewed.


*Example #2 - an express basic application* 

```js
const express = require('express')
const { toXML } = require('jstoxml')
const axios = require('axios')

const PORT = process.env.PORT || 3000

// a middleware in express is a function with the following signature: (request, response, next): void

const notFound = (request, response, next) => {
    response.status(404).send('yo bro, what u want is not here... with accent')
}

const errorResponder = (error, request, response, next) => {
    response.status(error.status || 500).send(error.message || 'internal server error...')
}

const getUsers = async (request, response, next) => {
    try {
        const axiosResponse = await axios('https://dummyjson.com/users')
        request.users = axiosResponse.data.users
        next()
    } catch (error) {
        next(error)
    }
}

const filterUsers = async (request, response, next) => {
    if (request.query.name) {
        request.users = request.users.filter(u => u.firstName.includes(request.query.name))
    }
    next()
}

const respond = async (request, response, next) => {
    if (request.query.format === 'xml') {
        response.setHeader('Content-type', 'application/xml')
        response.end(toXML(request.users))
    } else {
        response.json(request.users)
    }
}

const app = express()

app.get('/users', getUsers, filterUsers, respond)

// not found 404 middleware
app.use(notFound)

// error middlewares
app.use(errorResponder)


app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
```

An express usage example function involving the following applications:

- Requiring express, toXML, & axios packages.
- Creating a port 
- Creating middlewares of express with the following signature: (request, response, next): void.
- Creating error functions of express with the following signature: (error, request, response, next): void.
- An example of awaiting for a promise of dummyjson API.
- next() is an express parameter to go on to the next station; if with parameter will deliver a note of e.
- request.query.name will ask if there is a 'name' query in the URL after the '?'.
- There will only be one response.end or send in the chain of functions.
- app.use() does logic express functions.
- app.METHOD() will do a corresponding server method.
- app.listen() will listen to calls from the port mentioned.



*Example #3 - node application involving express module and routing* 

*app.js*

```js
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
const usersRouter = require('./routers/users')
const productsRouter = require('./routers/products')
const errorLogger = require('./middlewares/error/logger')
const pagerDuty = require('./middlewares/error/pager-duty')
const errorResponder = require('./middlewares/error/responder')
const notFound = require('./middlewares/not-found')
const logRequest = require('./middlewares/log-request')

app.use('/', logRequest)

app.use('/users', usersRouter)
app.use('/products', productsRouter)

// not found 404 middleware
app.use(notFound)

// error middlewares
app.use(errorLogger)
app.use(pagerDuty)
app.use(errorResponder)

app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
```

*routers -> users.js*

```js
const express = require('express')

const users = [
    {
        id: 1,
        name: 'Bob',
    },
    {
        id: 2,
        name: 'Alice',
    },
    {
        id: 3,
        name: 'Diana',
    }
]

const connectMysql = (request, response, next) => {
    const db = { version: 'MySQL 5.1' }
    request.db = db
    console.log('connecting to mysql...')
    next() // calling next without any param, signifies success

    // next('error') // calling next with a param, means there was an error
}

const disconnectMysql = (request, response, next) => {
    console.log('disconnecting from mysql...')
    //next()
}

const getUsers = (request, response, next) => {
    // response.setHeader('Content-Type', 'application/json')
    // response.end(JSON.stringify(users))
    console.log(`db connection is`, request.db)
    response.json(users)
    next()
}

const newUser = (request, response, next) => {
    console.log('saving user....')
    // response.writeHead(201)
    // response.end('saved user in database...')
    response.status(201).send('saved user in database...')
    console.log('responded...')
    next()
}

const usersRouter = express.Router()

usersRouter.use('/', connectMysql)
usersRouter.get('/', getUsers)
usersRouter.post('/', newUser)
usersRouter.use('/', disconnectMysql)

module.exports = usersRouter
```

*routers -> products.js*


```js
const express = require('express')
const { toXML } = require('jstoxml')

const products = [
    {
        id: 1,
        name: 'Mike'
    },
    {
        id: 2,
        name: 'Adidos'
    },
    {
        id: 3,
        name: 'Buma'
    }
]


const connectMongo = (request, response, next) => {
    console.log('connecting to mongo...')
    next()
}

const disconnectMongo = (request, response, next) => {
    console.log('disconnecting from mongo...')
    // next()
}

const getProducts = (request, response, next) => {
    response.setHeader('Content-Type', 'application/xml')
    response.end(toXML(products))
    next()
}

const newProduct = (request, response, next) => {
    // response.writeHead(201)
    // response.end('saving product in database....')
    response.status(201).send('saving saving product in database....')
    next()
}

const productsRouter = express.Router()

productsRouter.use('/', connectMongo)
productsRouter.get('/', getProducts)
productsRouter.post('/', newProduct)
productsRouter.use('/', disconnectMongo)

module.exports = productsRouter
```

*middlewares -> not-found.js*

```js
const notFound = (request, response, next) => {
    response.status(404).send('yo bro, what u want is not here... with accent')
}

module.exports = notFound
```

*middlewares -> log-request.js*

```js
const logRequest = (request, response, next) => {
    console.log('logging request...')
    next() // this is how i let express know that i have finished running
    // and it could forward the wand to the next middleware
}

module.exports = logRequest

```

*middlewares -> error -> logger.js*

```js
const errorLogger = (error, request, response, next) => {
    console.error(err)
    next(err)
}

module.exports = errorLogger
```

*middlewares -> error -> pager-duty.js*

```js
const pagerDuty = (error, request, response, next) => {
    console.log('sending page to Ido')
    next(err)
}

module.exports = pagerDuty
```

*middlewares -> error ->responder.js*

```js
const errorResponder = (error, request, response, next) => {
    response.status(error.status || 500).send(error || 'internal server error...')
}

module.exports = errorResponder
```

- The main app requires the express module, the port, all the different routing to be used, the generic middlewaresponse, the error middlewaresponse, and has the whole chronological skeleton of the app.use logic function with different paths, app.use error functions and finally the app.listen.
- The routers has the chronological stations of express functions connected with next(). Within each station the request can load information and pass it on to the next station. The constants do not necessarily have to be in the same orders but the userRouter (by the express.Router()) has to be in the specific logical order. Finally the router has to be exported (mainly to the app) by module.exports.
- Generic middlewares are also found in the app, which are not connected to specific routing. Also are exported to the main app. 
- Error middlewares are there to ignite when something goes kaput, also in a chronological order. The next function has an error parameter to pass on to the next stage. Also are exported. The last error - the errorResponder doesn't have a next function - it lets the client know there's a problem, by having a send function.

## Lesson #3/#4/#5 - Sequelize/joi/jsonwebtokens

**Location**

*config -> custom-environment-variables.json*

```json
{
    "app": {
        "secret": "APP_SECRET",
        "jwtSecret": "JWT_SECRET"
    }
}
```

**Explanation** 

- The configuration's custom-environment-variables has the whole custom made exports in the app section.


**Location**
*config -> default.json*

```json
{
    "app": {
        "port": 3000,
        "name": "weezer dev",
        "secret": "MySecret",
        "jwtSecret": "JwtSecret"
    },
    "db": {
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "weezer"
    }
}
```

**Explanation** 

- The default configuration file has the first layer information and data about our application - port, name, and secrets (both regular and jwt) - and database - host, port, username, password, and database (its name).
- The default configuration data is the staple one, any other json configuration file with the same data will run it over.
 

**Location**
*config -> production.json*

```json
{
    "app": {
        "name": "weezer prod"
    }
}
```

**Explanation** 

- The production configuration json file contains all the data which is relevant for production mode (not development).


**Location** 

*models -> Comment.ts*

```ts
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";
import Post from "./Post";

@Table({
    underscored: true
})
export default class Comment extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string

    @ForeignKey(() => Post)
    @AllowNull(false)
    @Column(DataType.UUID)
    postId: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    body: string

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Post)
    post: Post
}
```

**Explanation** 

- The models represent the actual tables in the database.
- In each model are imported the whole bunch of decorators by sequelize-typescript.
- Other models can be imported to be connected with our model by a foreign key.
- The models are exported as classes extending the Model function of sequelize-typescript.
- The first decorator is of the table, which will have 'underscored: true' as its parameter to change the title of the fields to snail case instead of camel case.
- Each column has its decorators and type. In the comments model, the ID column is a primary key, has a default data type, and each table has its column with specific data type.
- User ID table is a foreign key of the user model. Also, doesn't allow nulls.
- The comment model belongs to (in an imaginary column) both the user and the post models. That means, that each user and post can have many comments, in a 1:M relation.

**Location**
*models -> Follow.ts*

```ts
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";

@Table({
    underscored: true
})
export default class Follow extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    followerId: string

    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    followeeId: string
}
```

**Explanation** 

- The follow table is essentially a association table connecting the user table with itself (M:M relation)(the user can take both roles of a follower and a followee).
- In this case, the columns are both primary keys and foreign keys of the user table.


**Location**
*models -> Post.ts*

```ts
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";
import Comment from "./Comment";

@Table({
    underscored: true
})
export default class Post extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string // -> user_id


    @AllowNull(false)
    @Column(DataType.STRING)
    title: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    body: string

    @AllowNull(true)
    @Column(DataType.STRING)
    imageUrl: string

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    comments: Comment[]
}
```

**Explanation** 

- The post model belongs to the user model - one user can have many posts (1:M relation).
- Also, the post model has many comments (1:M relation). The HasMany decorator has a CB function that returns a comment model, and also an object with onDelete and onUpdate scenarios, each of them is cascade. These scenarios occur to the comments connected to the post: What will happen to them if the post is deleted or updated? If 'cascade' is chosen, then the comment will also be deleted/updated. If 'Restrict' were chosen then you wouldn't be able to delete/update the post as long as there are comments linked to it.
- The type of the imaginary column of HasMany-comments has a type of an array of comments.
 

**Location**

*models -> User.ts*

```ts
import { BelongsToMany, Column, HasMany } from "sequelize-typescript";
import { Default } from "sequelize-typescript";
import { Index } from "sequelize-typescript";
import { AllowNull } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { PrimaryKey } from "sequelize-typescript";
import { Model, Table } from "sequelize-typescript";
import Comment from "./Comment";
import Post from "./Post";
import Follow from "./Follow";

@Table({
    underscored: true
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    name: string

    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING)
    username: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @HasMany(() => Post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts: Post[]

    @HasMany(() => Comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    comments: Comment[]

    @BelongsToMany(() => User, () => Follow, 'followeeId', 'followerId')
    followers: User[]

    @BelongsToMany(() => User, () => Follow, 'followerId', 'followeeId')
    following: User[]
}
```

**Explanation** 

- The User model's name field has a restricted string data type (maximum 30 characters).
- @Index({ unique: true }) is an option of uniquity of usernames (though are not a key).
- It has many posts (1:M relation). Also, it has many comments (1:M relation).
- The User model is a table which can be linked to itself in a M:M relation: The 'BelongsToMany' decoration of the imaginary column has 4 paramters: 1) CB of the table it connects to (in this particular case it is the same user table), 2) a CB of the association table ('Follow' table), 3) the mutual foreign key => the thing that connects all of the of the members of the column, 4) and the foreign key of each member of the imaginary column. The type is likewise an array of users.


**Location**

*middlewares -> not-found.ts*

```ts
import { NextFunction, Request, Response } from "express";

export default function notFound(request: Request, response: Response, next: NextFunction) {
    next({
        status: 404,
        message: 'yo bro the thang u look is nat here'
    })
}
```
**Explanation** 

- The general middleware not-found, to be thrown unto when there is a mismatch in the route's path (see the app file). Contains a next function with an object parameter containing a status and message, to be delivered to the error middleware next in chain.


**Location**

*middlewares -> validation.ts*

```ts
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validation(validator: ObjectSchema) {
    return async function (request: Request, response: Response, next: NextFunction) {
        try {
            request.body = await validator.validateAsync(request.body)
            next()
        } catch (error) {
            next({
                status: 422,
                message: error.message
            })
        }
    }

}
```
**Explanation**

- This generic middleware is of the validation function we create which enwrap custom validators which are able to restrict new posts and patches methods inputs. For that we need to import the skeletal express functions and and ObjectSchema functions from the joi library.
- The procedure of validation itself is asynchronous. Therefore try & catch is required. If can't process it delivers a next()-error. 



## 28 fileValidation.ts
```ts
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function fileValidation(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            req.files = await validator.validateAsync(req.files)
            next()
        } catch (e) {
            next({
                status: 422,
                message: e.message
            })
        }
    }

}
```

**Location**

*middlewares -> enforce-auth.ts*

```ts
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from 'config'
import User from "../models/User";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

export default function enforceAuth(request: Request, response: Response, next: NextFunction) {

    const jwtSecret = config.get<string>('app.jwtSecret')

    const authHeader = request.get('Authorization') // this will get the value for the Authorization header

    if (!authHeader) return next({
        status: 401,
        message: 'missing Authorization header'
    })

    if (!authHeader.startsWith('Bearer')) return next({
        status: 401,
        message: 'missing Bearer keyword'
    })

    const parts = authHeader.split(' ')
    const jwt = parts[1]

    if (!jwt) return next({
        status: 401,
        message: 'missing jwt'
    })

    try {
        const user = verify(jwt, jwtSecret) as User
        request.userId = user.id
        console.log(user)
        next()

    } catch (error) {
        next({
            status: 401,
            message: 'invalid jwt'
        })
    }
}
```
**Explanation**

- In the enforce authorization middleware we import the functions from express, verify from jsonwebtoken, config from config, Joi from joi and relevant models to be enforced.
- Declaring global namespaces to add functions to interfaces.
- We get the jwtSecret from the config and assign to to jwtSecret constant.
- authHeader constant to get the value of the authorization header from the request.
- conditions if authHeader missing or doesn't start with the keyword Bearer.
- Splitting the authHeader to extract the jwt (if jwt doesn't exist, returns an error middleware).
- Trying to verifying and decoding the jwt we received from the request combining with the jwtSecret from the cofiguration (the one we also use to sign and log in), if not successful, concatenating an error.



**Location**

*middlewares -> param-validation.ts*

```ts
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function paramValidation(validator: ObjectSchema) {
    return async function (request: Request, response: Response, next: NextFunction) {
        try {
            request.params = await validator.validateAsync(request.params)
            next()
        } catch (error) {
            next({
                status: 422,
                message: error.message
            })
        }
    }

}
```
**Explanation**

- The param-validation middleware imports express functions and ObjectSchema from joi. 
- It validates the parameters in the URL using the validateAsync function.


**Location**
*middlewares -> error -> logger.ts*

```ts
import { NextFunction, Request, Response } from "express";

export default function logger(error: any, request: Request, response: Response, next: NextFunction) {
    console.error(err)
    next(err)
}
```
**Explanation** 

- The logger error middleware is the one who shows the error in the console (terminal). Then concatenate the error to the next error.


**Location**
*middlewares -> error -> responder.ts*

```ts
import { NextFunction, Request, Response } from "express";

export default function responder(error: any, request: Request, response: Response, next: NextFunction) {
    response.status(error.status || 500).send(error.message || 'internal server error...')
}
```

**Explanation** 

- The final error middleware is the one who responds to the user and shows him the status and message of the response delivered to him by the next function of the not-found or validation middleware. 


**Location**

*controllers -> profile -> controller.ts*

```ts
import { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";
import { newPostValidator } from "./validator";
import postIncludes from "../common/post-includes";

export async function getProfile(request: Request, response: Response, next: NextFunction) {

    try {
        // const profile = await Post.findAll({ where: { userId } })
        const { posts } = await User.findByPk(request.userId, {
            include: [{
                model: Post,
                ...postIncludes
            }]
        })
        response.json(posts)
    } catch (error) {
        next(error)
    }
}

export async function getPost(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(request.params.id, postIncludes)
        response.json(post)
    } catch (error) {
        next(error)
    }
}

export async function deletePost(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const { id } = request.params
        const deletedRows = await Post.destroy({ where: { id } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        response.json({ success: true })
    } catch (error) {
        next(error)
    }
}

export async function createPost(request: Request, response: Response, next: NextFunction) {

    try {
        const newPost = await Post.create({ ...request.body, userId: request.userId })
        await newPost.reload(postIncludes)
        response.json(newPost)
    } catch (error) {
        next(error)
    }
}

export async function updatePost(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(request.params.id, postIncludes);
        const { title, body } = request.body
        post.title = title
        post.body = body
        await post.save()
        response.json(post)
    } catch (error) {
        next(error)
    }
}
```

**Explanation** 

- The controller is a route specified middleware functions storage which designed to export them to the corresponding router. 
- Imports the express types as well as relevant models, validators and common middlewaresponse.
- Those functions are asynchronous because they contact with the database server. Therefore each function is wrapped with try & catch mechanism.
- The getProfile function elicits the profile's posts from the server, therefore the thing which is needed to be shown in the response is only the user's posts, therefore is wrapped with {}. It awaits the server, to use the sequelize function findByPk of the User model. This function receives two parameters: 1) The primary key - in this case the user ID - to be searched upon to elicit the posts. 2) an object which can include models in arrays of an object, and within them there can be more inclusion if an expansion is needed. Then the response shows them in json display.
- The getPost function elicits a single post by its ID. Therefore, findByPk function's first parameter uses the request's params function to elicit the id from the URL.
- The deletePost function also elicits a single post. The ID is elicited from the request params. The deletedRows are the ones which are destroyed from the posts table, by awaiting the database where the elicited post ID is. If there are no rows deleted, an errored next is returned, otherwise a success: true json is responsed to the server.  
- The createPost function needs a user ID. Then, awaiting to the server for a creating action of the post model; this action has a parameter of object of the deployed request's body and the related user ID. Then, another awaiting to the database occurs to reload the join connections within the newly created posts. Afterwards the response is displayed in json format.
- The updatePost function elicits the post ID from the URL. Awaiting for the relevant post by its primary key. Also elicits the title and body from the request body. Now the server-related post title and body are assigned to the one of the request (client). Afterwards a final await is here as an action to save the post. The response is of json of the now server based post.
  

**Location**

*controllers -> profile -> validator.ts*

```ts
import Joi from "joi";

export const newPostValidator = Joi.object({
    title: Joi.string().min(10).max(40).uppercase().required(),
    body: Joi.string().min(20).required()
})

export const updatePostValidator = newPostValidator

export const getPostValidator = Joi.object({
    id: Joi.string().uuid()
})
```

**Explanation**

- An explanatory instruction - validation - of how to create a post. It is a Joi.object with an object parameter containing the keys of the actual post to be requested (=submitted). The keys are title and body, each one with a Joi object and methods concatenated to it which tell the restrictions. The uppercase() method is a transformator of the title to uppercase - not a requirement. The getPostValidator only needs an ID (with string and uuid).

**Location**

*controllers -> follows -> controller.ts*

```ts
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Follow from "../../models/Follow";

export async function getFollowing(request: Request, response: Response, next: NextFunction) {
    try {

        const { following } = await User.findByPk(request.userId, {
            include: [{
                model: User,
                as: 'following'
            }]
        })

        response.json(following)

    } catch (error) {
        next(error)
    }
}

export async function getFollowers(request: Request, response: Response, next: NextFunction) {
    try {

        const { followers } = await User.findByPk(request.userId, {
            include: [{
                model: User,
                as: 'followers'
            }]
        })

        response.json(followers)
    } catch (error) {
        next(error)
    }
}

export async function follow(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {

        const existing = await Follow.findOne({
            where: {
                followerId: request.userId,
                followeeId: request.params.id
            }
        })

        if (existing) throw new Error('follow already exists')

        const follow = await Follow.create({
            followerId: request.userId,
            followeeId: request.params.id
        })
        response.json(follow)
    } catch (error) {
        if (error.message === 'follow already exists') return next({
            status: 422,
            message: error.message
        })
        next(error)
    }
}

export async function unfollow(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const follow = await Follow.findOne({
            where: {
                followerId: request.userId,
                followeeId: request.params.id
            }
        })
        if (!follow) throw new Error('followee not found')
        await follow.destroy()
        response.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        if (error.message === 'followee not found') return next({
            status: 422,
            message: 'followee not found'
        })
        next(error)
    }
}
```

**Explanation** 

- The getFollowing controller of the follows router elicits the following from the server by finding the primary key of the user ID. Becuase the user can be 'following' as well as 'followee' it is crucial to mention the alias to differentiate between the two. The getFollowers is essentially the same but with a different alias. 
- Middleware controller of follow tries to create new row of Follow table. First, try to catch an error if it the user we want to follow is actually followed. If not, we can create a new row.
- On the contrary process, we implement unfollow controller. We first check if there is not a user we want to unfollow (if it's the case we throw an error). Then we destroy the row of the users, and return a json response of {success:true}.



**Location**

*controllers -> follows -> validator.ts*

```ts
import Joi from "joi";

export const followValidator = Joi.object({
    id: Joi.string().uuid()
})

export const unfollowValidator = followValidator
```


**Explanation** 

- The followValidator and the unfollowValidator needs the same Joi.object of an ID.


**Location**

*controllers -> feed -> controller.ts*

```ts
import { NextFunction, Request, Response } from "express";
import sequelize from "../../db/sequelize";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";
import postIncludes from "../common/post-includes";

export async function getFeed(request: Request, response: Response, next: NextFunction) {
    try {

        const { following } = await User.findByPk(request.userId, {
            include: {
                model: User,
                as: 'following',
                include: [{
                    model: Post,
                    ...postIncludes
                }]
            },
        })

        const feed = following
            .reduce((cumulative: Post[], { posts }) => {
                return [...posts, ...cumulative]
            }, [])
            .sort((a: Post, b: Post) => a.createdAt < b.createdAt ? 1 : -1)

        response.json(feed)

    } catch (error) {
        next(error)
    }


    // how i can query the database WITHOUT sequelize help
    // i.e. i want to code the SQL myself:
    /*
    const feed = await sequelize.query(`
        select 	*
        FROM	follows
        JOIN	users on users.id = follows.followee_id
        JOIN	posts on posts.user_id = users.id
        where	follower_id = '1230ae30-dc4f-4752-bd84-092956f5c633'
        order by posts.created_at DESC
    `, {
        model: Post
    })

    await Promise.all(feed.map(post => post.reload({
        include: [User, {
            model: Comment,
            include: [User]
        }]
    })))

    console.log(feed)
    response.json(feed)
    */
}
```

**Explanation** 

- The getFeed controller of the feed table elicits the 'following' list, with all their posts and collaretrals, by the PrimaryKey of the user. However this listing has to be tweaked by a reduce HOF to return the array of posts alone, then sorting them in a descending order. 
- In the comment an example of retrieving the feed using SQL language (not recommended at all).

**Location**
 
*controllers -> comment -> controller.ts*

```ts
import { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import User from "../../models/User";

export async function newComment(request: Request<{ postId: string }>, response: Response, next: NextFunction) {

    try {

        const { postId } = request.params
        const { userId } = request
        const newComment = await Comment.create({ ...request.body, userId, postId })
        await newComment.reload({
            include: [User]
        })
        response.json(newComment)
    } catch (error) {
        next(error)
    }

}
```

**Explanation** 

- The comment controller deals with the function newComment which requires in its URL a request params of post ID. Awaiting for the comment create function of a database follows, with a parameter of object with the deployed request body, the user ID and the post ID. Then the awaiting of the new comment reload follows which reloads the join connection of the newly created comment, with an inclusion of the user list which is to be filled within time, but needs to be there for that opportunity. Then response of json of the newComment follows.

**Location**

*controllers -> comment -> validator.ts*

```ts
import Joi from "joi";

export const newCommentValidator = Joi.object({
    body: Joi.string().min(20).required()
})
```

**Explanation** 

- Then again, the Joi object of the comment validation follows. It must have a body with the corresponding restrictions.

**Location**

*controllers -> common -> post-includes.ts*

```ts
import User from "../../models/User"
import Comment from "../../models/Comment"

const postIncludes = {
    include: [User, {
        model: Comment,
        include: [User]
    }]
}

export default postIncludes
```

**Explanation** 

- The common controller of post-includes is a generic inclusion to be interpolated in several findByPk or reload functions.


**Location**

*controllers -> auth -> controller.ts*

```ts
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import config from 'config'
import { createHmac } from "crypto";
import { sign } from "jsonwebtoken";

function hashAndSaltPassword(plainTextPassword: string): string {
    const secret = config.get<string>('app.secret')
    return createHmac('sha256', secret).update(plainTextPassword).digest('hex')
}

export async function signup(request: Request, response: Response, next: NextFunction) {
    try {
        const jwtSecret = config.get<string>('app.jwtSecret')
        request.body.password = hashAndSaltPassword(request.body.password)
        const user = await User.create(request.body)
        const plainData = user.get({ plain: true })
        delete plainData.password
        const jwt = sign(plainData, jwtSecret)
        response.json({ jwt })
    } catch (error) {
        next(error)
    }
}

export async function login(request: Request, response: Response, next: NextFunction) {
    try {
        const jwtSecret = config.get<string>('app.jwtSecret')

        const user = await User.findOne({
            where: {
                username: request.body.username,
                password: hashAndSaltPassword(request.body.password)
            }
        })
        if (!user) throw new Error('invalid username and/or password')
        const plainData = user.get({ plain: true })
        delete plainData.password
        const jwt = sign(plainData, jwtSecret)
        response.json({ jwt })
    } catch (error) {
        if (error.message === 'invalid username and/or password') return next({
            status: 401,
            message: 'ya try ta hack us ha? no kidin'
        })
        next(error)
    }
}

```

**Explanation** 

- This is the auth controller, importing express functions, User model to be authorized, config, createHmac from crypto, and sign from jsonwebtoken.
- hashAndSaltPassword function salts a password (implementing a secret thoroughly throughout it). The secret is gotten from the database config section. It returns a creation of hexadecimal password by a sha256 algorithm.
- The signup function applies when a user wants to sign-up. jwtSecret is gotten. request.body.password is salted. User is created accordingly. jwt is signed (=created) using the plainData of the user combined with the jwtSecret. Then the response is of the {jwt} (displaying "jwt" : {the jwt itself})
- The login function applies when an existing user wants to log-in. jwtSecret is gotten. We want to find a user where its username is of the request.body.password and its password corresponds to the salted request.body.password. If doesn't exist an error is thrown. jwt is signed and responsed. 
 

**Location**

*controllers -> auth -> validator.ts*

```ts
import Joi from "joi";

export const loginValidator = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})

export const signupValidator = loginValidator.keys({
    name: Joi.string().min(2)
})
```

**Explanation** 

- The loginValidator requires username, password to be strings, and minimum six characters. The signupValidator is an extention (with keys function) of the loginValidator with a name of minimal two characters.


## 27 profile validator
```ts
import Joi from "joi";

export const newPostValidator = Joi.object({
    title: Joi.string().min(10).max(40).uppercase().required(),
    body: Joi.string().min(20).required()
})

export const newPostImageValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png')
    }).unknown(true).optional()
})

export const updatePostValidator = newPostValidator

export const getPostValidator = Joi.object({
    id: Joi.string().uuid()
})
```


## 29 post controller
```tsx 
import { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";
import { newPostValidator } from "./validator";
import postIncludes from "../common/post-includes";

export async function getProfile(req: Request, res: Response, next: NextFunction) {

    try {
        // const profile = await Post.findAll({ where: { userId } })
        const { posts } = await User.findByPk(req.userId, {
            include: [{
                model: Post,
                ...postIncludes
            }]
        })
        res.json(posts)
    } catch (e) {
        next(e)
    }
}

export async function getPost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(req.params.id, postIncludes)
        res.json(post)
    } catch (e) {
        next(e)
    }
}

export async function deletePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const deletedRows = await Post.destroy({ where: { id } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ success: true })
    } catch (e) {
        next(e)
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {

    try {
        const newPost = await Post.create({ 
            ...req.body, 
            userId: req.userId, 
            imageUrl: req.imageUrl 
        })
        await newPost.reload(postIncludes)
        res.json(newPost)
    } catch (e) {
        next(e)
    }
}

export async function updatePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(req.params.id, postIncludes);
        const { title, body } = req.body
        post.title = title
        post.body = body
        await post.save()
        res.json(post)
    } catch (e) {
        next(e)
    }
}
```


**Location**

*db -> init.sql*

```sql
-- Insert users
INSERT INTO users (id, name, username, password, created_at, updated_at) VALUES ('4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14', 'Alice', 'alice0', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', now(), now());

-- Insert posts
INSERT INTO posts (id, user_id, title, body, image_url, created_at, updated_at) VALUES ('b36cbf8c-b16c-41a2-92eb-e25a09229c48', '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14', 'Understanding Climate Change', 'Positive thinking can change your life. By focusing on the good, you can improve your mental and emotional well-being.', 'https://picsum.photos/400/600', now(), now());

-- Insert comments
INSERT INTO comments (id, post_id, user_id, body, created_at, updated_at) VALUES ('aff9f4b4-20c1-40b1-bb26-8295a8e42058', 'b36cbf8c-b16c-41a2-92eb-e25a09229c48', '034485be-cfd2-48a7-b80d-f54773eab18c', 'Social media has evolved drastically in the past decade, shaping the way we communicate and share information.', now(), now());

-- Insert follows
INSERT INTO follows (follower_id, followee_id, created_at, updated_at) VALUES ('4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14', '034485be-cfd2-48a7-b80d-f54773eab18c', now(), now());
```

**Explanation** 

- The sql material injections to be put in the Docker and fill the corresponding tables. These are mere examples and not the whole material.


**Location**

*db -> Sequelize.ts*

```ts
import { Sequelize } from "sequelize-typescript";
import config from 'config'
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Follow from "../models/Follow";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [User, Post, Comment, Follow],
    logging: console.log
})

export default sequelize
```

**Explanation** 

- The sequlize synchronizes the data of the TypeScript models into the database we created as soon as we exercise the app.
- It imports the relevant functional object to be instantiated once (singleton), the config to get the default database details, and the relevant models.
- The object instantiates with an object parameter containing the deployed database config data, the dialect (mysql), the specific models to be implemented in the database synchronously, and also a logging key to log the synchronization in the console.
- Exported to the app file. 
- As noted in the app, we can force new sync by adding 'sync' to the command in process.argv[2].


**Location**
*routers -> profile.ts*

```ts
import { Router } from "express";
import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import validation from "../middlewares/validation";
import { getPostValidator, newPostValidator, updatePostValidator } from "../controllers/profile/validator";
import paramValidation from "../middlewares/param-validation";

const router = Router()
// DELETE /profile/1
router.get('/', getProfile)
router.get('/:id', paramValidation(getPostValidator), getPost)
router.delete('/:id', deletePost)
router.post('/', validation(newPostValidator), createPost)
router.patch('/:id', validation(updatePostValidator), updatePost)


export default router
```
**Explanation** 

- The profile router imports the router function from express and the middleware functions we created in the controller that are relevant to the route, and also the validation middleware and validators controllers.
- Each route getting has 3 parameters: one of the specific path (the initial route is located in the main app use function), the second is optional and for the validation function with its validator function, and the third is the controller function. 
- After implementing those method functions the router is exported to the main app file, as its specific router (in this case the profile router).


## 26 profile.ts
```ts
import { Router } from "express";
import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import validation from "../middlewares/validation";
import { getPostValidator, newPostImageValidator, newPostValidator, updatePostValidator } from "../controllers/profile/validator";
import paramValidation from "../middlewares/param-validation";
import enforceAuth from "../middlewares/enforce-auth";
import fileUploader from "../middlewares/file-uploader";
import fileValidation from "../middlewares/file-validation";

const router = Router()
// DELETE /profile/1
router.get('/', getProfile)
router.get('/:id', paramValidation(getPostValidator), getPost)
router.delete('/:id', deletePost)
router.post('/', validation(newPostValidator), fileValidation(newPostImageValidator) , fileUploader, createPost)
router.patch('/:id', validation(updatePostValidator), updatePost)


export default router
```


**Location**
*routers -> follows.ts*

```ts
import { Router } from "express";
import { follow, getFollowers, getFollowing, unfollow } from "../controllers/follows/controller";
import paramValidation from "../middlewares/param-validation";
import { followValidator, unfollowValidator } from "../controllers/follows/validator";

const router = Router()

router.get('/following', getFollowing)
router.get('/followers', getFollowers)
router.post('/follow/:id', paramValidation(followValidator), follow)
router.post('/unfollow/:id', paramValidation(unfollowValidator), unfollow)

export default router
```

**Explanation** 

- As in the profile router, we create and export 'follows' router which contains controllers for the following and followers paths.


**Location**
*routers -> feed.ts*

```ts
import { Router } from "express";
import { getFeed } from "../controllers/feed/controller";

const router = Router()

router.get('/', getFeed)

export default router
```

**Explanation** 

- Another router, this time for the feed.

**Location**
*routers -> comments.ts*

```ts
import { Router } from "express";
import { newComment } from "../controllers/comments/controller";
import validation from "../middlewares/validation";
import { newCommentValidator } from "../controllers/comments/validator";

const router = Router()

router.post('/:postId', validation(newCommentValidator), newComment)

export default router
```

**Explanation** 

- Another router, this time for the comments, imposing the new comment section containing the path, validator and controller.

**Location**

*routers -> auth.ts*

```ts
import { Router } from "express";
import { login, signup } from "../controllers/auth/controller";
import validation from "../middlewares/validation";
import { loginValidator, signupValidator } from "../controllers/auth/validator";

const router = Router()

router.post('/signup', validation(signupValidator), signup)
router.post('/login', validation(loginValidator), login)

export default router
```

**Explanation** 

- The authorization router is relevant for the authorization middlewares of the auth controller - signup and login. Also imported the validators. 

**Location** 

*app.ts*

```ts
import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import authRouter from './routers/auth'
import profileRouter from './routers/profile'
import feedRouter from './routers/feed'
import followsRouter from './routers/follows'
import commentsRouter from './routers/comments'
import config from 'config'
import sequelize from './db/sequelize';
import enforceAuth from './middlewares/enforce-auth';
import cors from 'cors'

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())

// post decypher middlewares
app.use(json())

// load routers
app.use('/auth', authRouter)
app.use(enforceAuth)
app.use('/profile', profileRouter)
app.use('/feed', feedRouter)
app.use('/follows', followsRouter)
app.use('/comments', commentsRouter)

// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder)

// synchronize database schema (not data) changes to the database
// i.e syncs our TypeScript models folder into the actual SQL Schema
// sequelize.sync({ force: true })
sequelize.sync({ force: process.argv[2] === 'sync' })

console.log(process.argv)

app.listen(port, () => console.log(`${appName} started on port ${port}`))
```

**Explanation** 

- In the app we import the express module and all the TS files of the middlewares and routers, including the database of sequelize, enforceAuth and cors.
- The app constant is essentially a continuous execution of the express package. 
- We get the config content - port, appName and secret -  by the default config json.
- app.use(cors()) is used to integrate the servers and clients.
- app.use(json()) is a generic express logic executor in json format for unknown results of POST actions.
- Then we have the express train of use functions, starting with the routers, then the notFound, and in the end the error middlewares.
- Sequelize comes next to sync our TypeScript models into the SQL scheme. sequelize.sync({ force: process.argv[2] === 'sync' }) command is to make the deleterious synchronization optional.
- Finally the app listens to the port (now by the data we implemented in the default config json file) and the server is officially created and ready to listen to calls from the client knocking in the relevant port.



## 23 app.ts 

```ts
import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import authRouter from './routers/auth'
import profileRouter from './routers/profile'
import feedRouter from './routers/feed'
import followsRouter from './routers/follows'
import commentsRouter from './routers/comments'
import config from 'config'
import sequelize from './db/sequelize';
import enforceAuth from './middlewares/enforce-auth';
import cors from 'cors'
import { createAppBucketIfNotExists, testUpload } from './aws/aws';
import fileUpload from 'express-fileupload';

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())

// post decypher middlewares
app.use(json())
app.use(fileUpload())

// load routers
app.use('/auth', authRouter)
app.use(enforceAuth)
app.use('/profile', profileRouter)
app.use('/feed', feedRouter)
app.use('/follows', followsRouter)
app.use('/comments', commentsRouter)

// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder)

// synchronize database schema (not data) changes to the database
// i.e syncs our TypeScript models folder into the actual SQL Schema
// sequelize.sync({ force: true })
sequelize.sync({ force: process.argv[2] === 'sync' })

createAppBucketIfNotExists()
// testUpload()

console.log(process.argv)

app.listen(port, () => console.log(`${appName} started on port ${port}`))
```



# Introduction: General React Programing Skeleton:  
**Form**: 
*Src*:
1) assets -> pictures we want to implement

2) components -> 
- app(App.css, App.tsx)  |
- auth: auth(Auth.tsx, AuthContent.ts), login(Login.css, Login.tsx) |
- follows: follow(Follow.css, Follow.tsx), followers(Followers.css, Followers.tsx), following(Following.css, Following.tsx) |
- layout: footer(Footer.css,Footer.tsx), header(Header.css,Header.tsx), layout(Layout.css,Layout.tsx), main(Main.tsx), not-found(NotFound.css,NotFound.tsx), nav-bar(NavBar.css,NavBar.tsx), routing(Routing.tsx) |
- posts: comments: comment(PostComment.css,PostComment.tsx), new(NewComment.css,NewComment.tsx), - post-comments(PostComments.css,PostComments.tsx)/ edit(EditPost.css,EditPost.tsx), feed(Feed.css,Feed.tsx), new(NewPost.css,NewPost.tsx), post(Post.css,Post.tsx), profile(Profile.css, Profile.tsx) |
- pages: home(Home.css, Home.tsx), products(Products.css, Products.tsx) |
- productArea: add-product(AddProduct.css,AddProduct.tsx),edit-product(EditProduct.css,AddProdEditProduct.tsx), product-card(ProductCard.css,ProductCard.tsx) |
shared: search-bar(SearchBar.css,SearchBar.tsx), sort-bar(SortBar.css,SortBar.tsx)

3) hooks -> UseService.ts, UseTitle.ts, UseUserID.ts, UseUserName.ts

4) models -> Login.ts, PostCommentDraft.ts,  PostComment.ts,  PostDraft.ts,  Post.ts,  User.ts, ProductModel.ts, ReviewModel.ts 

5) redux -> FeedSlice.ts, FollowersSlice.ts,  FollowingSlice.ts,  Hooks.ts,  ProfileSlice.ts,  Store.ts, ProductSlice.ts 

6) services -> 
auth-aware: AuthAware.ts, CommentService.ts,  FeedService.ts  FollowersService.ts,  FollowingService.ts,  ProfileService.ts, ProductService.ts  
auth.ts

7) utils -> AppConfig.ts,  UseTitle.ts, 

8) index.css, main,tsx

*Root*:
9) .env.development 

10) .env.production

**Meaning**: 
1) **React**: A JavaScript library and a mediator between the browser and the developer. Usually we develop from the end to the beginning - first the service, then creating components, navigations and applications (e.g. changing states). 
2) **Components**: Functions. Can be a part of a bigger component. It is aware of the information presented inside it, and also responsible for it. There cannot be a change in the page without doing it through a certain component. Every component has a state: when it changes, the component rerenders to reflect that change. The father component acknowledges the child component, but not vice-versa.  There is no way to change a component's state outside of itself. That is why we do not export it but making an interface out of it. useEffect function executes whenever the function(=component) renders and is used whenever outside data is necessary to fetch or DOM needs to be manipulated. If there is [] and it's not the first rendering, it wouldn't execute. If the component gets down from the display - it doesn't exist in React anymore. 
3) **Server**: - A program that runs, principally doesn't do a thing, waits for approaches, and responds to every call that's accepted. Will always run on a certain computer. To talk to a server we need to know that computer's address. URL structure: protocol://address:port/path.
4) **Hooks**: functions that starts with 'use' and interfaces with the React framwork itself. Can be created and/or read only inside another hook or component. We would like to create hooks whenever we need an access to a component's state.
5) **Redux** - A JavaScript library and an inner tool of React, doesn't receive the info from the server. Contains a store with all the slices (its reducers). You need not transmit changes in the states to the father & sons components anymore, but everything goes throughout the Redux within the dispatch function AppDispatcher. The components who subscribe the Redux - using the useAppSelector function render accordingly. The chain of changes: interface -> component -> server -> Redux store (fueled by slices) -> subscribed components. 
6) **Context** - share a state of a component. In an applicative data - that concerns a key and not a user - we do not use Redux but context. Within .ts files (not .tsx). We get access to the context with the useContext(context) function, in the condition it is below the component in the component-tree, not above it.
7) **Authentication** - once the server sends the user's info object (in the address auth/login), it codes it with jwt - JSON Web Token, returns it to the client, and achieves two goals: the client can always identify with this jwt, can send it backwards to the server, and from this point the server can always deduct who is the user that made contact with it. We storage and retrieve the jwt by the localStorage function: by that, when we refresh the page it keeps the jwt and doesn't reset the jwt. We get the jwt by the useContext function.    
8) **Web Sockets**: the server sends a message to the client and updates (though, the first update comes from the client). io(url) function connects to the socket and keeps the line of messaging open.
9) **Models**: Molded interfaces to be exported and implemented in components and other shenanigans.
10) **Services**: class/es that handles all website-related API calls and Redux state updates.
11) **Utils**: class/es that configure the application including base URL.
12) **index.css & main.tsx**: the actual and base application tree of Markup Language and CSS
13) **.env.development & .env.production**:  The actual url websites to run the application in developers' mode and production mode respectively.

# Step #1: Configuration fik

**Form**: 

**.env.development**:

```tsx
VITE_API_URL='https://dummyjson.com/'
```

**utils -> AppConfig.ts**:

```ts
class AppConfig {
	private readonly baseUrl = import.meta.env.VITE_API_URL;
	
	// Normal API calls (fast)
	public readonly productsUrl = this.baseUrl + "products";
	
	// Testing API calls with delay (slow) 
	// public readonly productsUrl = this.baseUrl + "products?delay=2000"; // 2 second delay for testing loader
}

export const appConfig = new AppConfig();
```

**Meaning**: In the env file we implement our base URL, and in the utils folder we create AppConfig exported singleton class that every service we will create will embrace. 


# Step #2: Model Skeletons - Review Model 

**Form**

**models -> ReviewModel.ts**

```ts
export default interface ReviewModel {
    rating: number;
    comment: string;
    date: string; // type Date? 
    reviewerName: string;
    reviewerEmail: string;
}
```
# Step #3: Model Skeletons - Product Model 

**Form**

**models -> ProductModel.ts**

```ts
import type ReviewModel from "./ReviewModel";

// TYPESCRIPT INTERFACE: Defines the structure/shape of a Product object
// WHY: Type safety - ensures all product objects have the required properties with correct types
// BENEFITS: IntelliSense autocomplete, compile-time error checking, better code documentation
export default interface ProductModel {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    reviews: ReviewModel[];
    images: string[];
}
```

**Meaning**: Models are interfaces, which are not instantiated. Assist Postman in order to reveal the elements you want to implement in the application from the interface. 

## 30 PostDraft
```ts
export default interface PostDraft {
    title: string,
    body: string,
    image?: File
// eslint-disable-next-line semi
};
```


# Step #4: Navigation Bar 

**Form**: 

**components -> layout -> nav-bar -> NavBar.tsx**

```tsx
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  
  return (
    <div className='Navbar'>
      <h2 className='logo'>
        <NavLink to="/">
          ShopEase
        </NavLink>
      </h2>
      
      <div className='nav-links'>
        <NavLink to="/home"
        >
          Home
        </NavLink>
        <NavLink to="/products"
        >
          Products
        </NavLink>
      </div>
    </div>
  )
}
```

**Meaning**: 
- The Navigation Bar is a main application in the website.
- It has different NavLinks (thanks to the nav division) to extra piece of URLs.
- With the help of the Navlinks we can press the sections throughout which we want to link our website to(see Routes ahead of manual; they actually sketch the web regarding the link at present).


# Step #5: Search Bar - component implenetation of the Products Page  

**Form**: 

**components -> shared -> search-bar -> SearchBar.tsx**

```tsx
import './SearchBar.css'

// Props interface for SearchBar component, will be custom-used for each father component 
interface SearchBarProps {
    onSearch(searchTerm: string): void    // Callback function called when user types
    placeholder?: string                  // Optional placeholder text for input
}

// Reusable search bar component for filtering/searching products
export default function SearchBar(props: SearchBarProps) {

    const {onSearch,placeholder} = props

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value) 
    } //This whole function reason for existence is to do something in case of stroking a character in the input bar. It is a mediator function between the prop and the father function; based on the value, a father function will occur.

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    onChange={handleInputChange}  // Trigger search on every keystroke
                />
            </div>
        </div>
    )
}


```
**Meaning**: Implementation of a skeletal search bar in the Products Page (a main component which will actually respond to this skeleton and father it) igniting with every change of stroke.


# Step #6: Sort Bar - component implenetation of the Products Page  
**Form**: 
**components -> shared -> sort-bar -> SortBar.tsx**

```tsx
import './SortBar.css'

// Props interface for SortBar component
interface SortBarProps {
    onSort(sortBy: string, order: string): void  // Callback function for when sort option is selected
}

// Reusable sort bar component for sorting products by different criteria
export default function SortBar(props: SortBarProps) {

    const {onSort} = props
    // Handle sort option selection
    function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // Split the selected value (e.g., "price-asc") into sortBy and order
        const [sortBy, order] = event.target.value.split('-')
        // Call parent's callback with the sort parameters
        onSort(sortBy, order)
    }

    return (
        <div className="SortBar">
            <select 
                className="sort-select" 
                onChange={handleSortChange}
                defaultValue=""  // Default to placeholder option
            >
                {/* Placeholder option that cannot be selected */}
                <option value="" disabled>Sort by...</option>
                
                {/* Category sorting options */}
                <option value="category-asc">Category (A-Z)</option>
                <option value="category-desc">Category (Z-A)</option>
                
                {/* Price sorting options */}
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                
                {/* Rating sorting options */}
                <option value="rating-desc">Rating (Highest First)</option>
                <option value="rating-asc">Rating (Lowest First)</option>
            </select>
        </div>
    )
}

```

**Meaning**: Sorting Bar skeleton component that will be used in father's (product page) component utilizing the prop, which is a function connected by a handler, wrapped by onChange in the select division. The options have values which is split into two parameters - the sortBy parameter (which will be a string of 'category', 'price', 'rating'), and a order parameter (a string of 'ascending' or 'descending'). 


# Step #8: Enter Redux with slices 

**Form**:

**redux -> ProductSlice.ts**

```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ProductModel from "../models/ProductModel";

// Initialize entire Products once: 
export default function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    return action.payload;
}

// Add Product to global state: 
export function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Product in global state: 
export function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === action.payload.id); // Locate index.
    if (index === -1) return currentState; // Guard against product not found
    newState[index] = action.payload; // Update - replace old Product with given Product.
    return newState;
}

// Delete Product from global state: 
export function deleteProduct(currentState: ProductModel[], action: PayloadAction<number>): ProductModel[] {
    const newState = [...currentState]; // Duplicate current state.
    const index = newState.findIndex(p => p.id === action.payload); // Locate index.
    if (index === -1) return currentState; // Guard against product not found
    newState.splice(index, 1); // Delete given Product.
    return newState; // Return the new state.
}

export const productSlice = createSlice({
    name: "products",
    initialState: [] as ProductModel[],
    reducers: { initProducts, addProduct, updateProduct, deleteProduct }
});


export const productActions = productSlice.actions;
```

**Meaning**: All the activities of the components are embedded in the Redux slice.
Some general Redux terms:
- **Global State**: the app‑wide data, sometimes typed as **AppState**.
- **Store**: the Redux object that manages access to the state tree.
- **Action**: an object sent to Redux to request a change. It has:
  - **type**: a string describing the operation.
  - **payload**: the data needed for that operation.
- **Dispatch**: the function that sends an action to Redux.
- **Action Creator**: a function that produces an action object.
- **Current State**: the data currently stored in Redux.
- **New State**: the data after a reducer applies a change.
- **Reducer**: a pure function that updates state based on the action.
- **Slice**: a helper that bundles a reducer, its initial state, and autogenerated action creators for a specific feature of your global state.

Slices are the main bundling members of Redux library, which are compressed in the store. 
Here are the reducers who represent the CRUD application to be applied in our app.
Each reducer has by its parameter a currentState and action.payload (the content to be updated/manipulated in the state), each one with corresponding type of state and the function type returned (all three could be different, mainly depends on logic).
The PayloadAction can be of type of single model, array of models, number (if only index is required, as in the delete reducer).
The slice itself is exported to the store as a function with an object parameter containing the name, the initalState of each reducer (heed the special circumventing lingo - we need a value which is a type, so we use the alias), and the reducers themselves.
They are exported to the store. Also, exported individually their actions (the reducers, or changing-state-functions).

# Step #9: Redux Store 

**Form**:

**redux -> Store.ts**

```ts
import { configureStore } from "@reduxjs/toolkit";
import type ProductModel from "../models/ProductModel";
import { productSlice } from "./ProductSlice";

// AppState defines the shape of our entire application state
export type AppState = {
    products: ProductModel[]; // Global products array accessible by all components
};

// STORE CREATION: Combines all reducers into a single store
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer // Links the products slice to the store
    }
});

```

**Meaning**: This is the store of Redux Library. Contains two exports: 
- The AppState type, containing all the slices names and their initial states.
- The store itself, with all its slices' reducers - the CRUD operations - to be updated and conveyed to and from the relevant components using AppSelect and AppDispatch correspondetly.

# Step #10: Product Service  

**Form**: 

**services -> ProductService.ts**

```ts
import axios from "axios";
import { appConfig } from "../utils/AppConfig";
import type ProductModel from "../models/ProductModel";
import { productActions } from "../redux/ProductSlice";
import { store } from "../redux/Store";


class ProductService {
    
    //CRUD Actions dispatched to the store

    public async getProducts(): Promise<ProductModel[]> {
        const response = await axios.get(appConfig.productsUrl);
        const products = response.data.products;

        const action = productActions.initProducts(products);
        store.dispatch(action);

        return products;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const response = await axios.post(`${appConfig.productsUrl}/add`, product);

        const action = productActions.addProduct(response.data);
        store.dispatch(action);

        return response.data;
    }

    public async editProduct(productId: number, product: ProductModel): Promise<ProductModel> {
        const response = await axios.put(`${appConfig.productsUrl}/${productId}`, product);

        const action = productActions.updateProduct(response.data);
        store.dispatch(action);

        return response.data;
    }

    public async deleteProduct(productId: number): Promise<ProductModel> {
        const response = await axios.delete(`${appConfig.productsUrl}/${productId}`);

        const action = productActions.deleteProduct(productId);
        store.dispatch(action);
        
        return response.data;
    }

    ///Skeletal services - editing, searching, and sorting products - are not intertwined with the store but elicit data from the URL
    public async getProductById(productId: number): Promise<ProductModel> {
        const response = await axios.get(`${appConfig.productsUrl}/${productId}`);
        return response.data;
    }

    public async searchProducts(searchTerm: string): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}/search?q=${searchTerm}`);
        return response.data.products;
    }

    public async sortProducts(sortBy: string, order: string): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}?sortBy=${sortBy}&order=${order}`);
        return response.data.products;
    }

}

export const productService = new ProductService();
```

**Meaning**:
The service manages and updates/elicits information from the server asynchronically and returning a servant-peculiar promise (check the Postman for it).
It handles all product-related API calls and Redux state updates throughout fetching the relevant promises from the server using axios functions, and communicating with the store by dispatching the CRUD actions, so the store can activate them with the help of its reducers (slices).
Important note: axios and dispatch are only featured in services to be much more efficient.
The service also includes advanced services concerning other skeletal elements in the product component which do not concern the the store but the server's API. 

Other benefits:
-Separates business logic from UI components - components don't need to know about API details
-Centralized API logic (easy to modify endpoints, add error handling, etc.)
-Automatic Redux state updates (no manual dispatch needed in components)  
-Reusable across components (multiple components can use the same methods)
-Easier testing (mock the service instead of individual API calls)



## S32 profile service

```ts
import type Post from "../../models/post";
import AuthAware from "./AuthAware";
import type PostDraft from "../../models/post-draft";

export default class ProfileService extends AuthAware {

    async getProfile(): Promise<Post[]> {
        const response = await this.axiosInstance.get<Post[]>(`/profile`);
        return response.data;
    }

    async remove(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/profile/${id}`);
        return response.data;
    }

    async newPost(draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.post<Post>(`/profile`, draft, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    async getPost(id: string): Promise<Post> {
        const response = await this.axiosInstance<Post>(`/profile/${id}`);
        return response.data;
    }

    async editPost(id: string, draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.patch<Post>(`/profile/${id}`, draft);
        return response.data;
    }
}
```

# Step #11: Recurrent Component: Product Card 

**Form**:

**components -> product-area -> product-card -> ProductCard.tsx**
```ts
import type ProductModel from '../../../models/ProductModel'
import { productService } from '../../../services/ProductService'
import './ProductCard.css'

interface ProductCardProps {
    productCard: ProductModel
    isDelete?: boolean
    onDelete?(deletedProduct: ProductModel): void
}

const StarRating = ({ rating }: { rating: number }) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="star star-full">★</span>)
    }

    if (hasHalfStar) {
        stars.push(<span key="half" className="star star-half">☆</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="star star-empty">☆</span>)
    }

    return <div className="star-rating">{stars}</div>
}

export default function ProductCard(props: ProductCardProps) {
    const { productCard, isDelete, onDelete } = props

    const handleDelete = async () => {
        try {
            // REDUX INTEGRATION: ProductService.deleteProduct() automatically updates the Redux store
            // WHY: No need to manually update component state - Redux handles global state management
            // FLOW: 1) Call service → 2) Service updates Redux store → 3) All components get updated automatically
            const deletedProduct = await productService.deleteProduct(productCard.id)
            
            // CALLBACK: Still beacon parent component for immediate UI feedback (filtering, etc.)
            // WHY: Parent may need to update local filtered lists before Redux state propagates
            // NOTE: DummyJSON API returns the full deleted product. For APIs that return only { success: true },
            // you would pass the original product instead: onDelete?.(deletedProduct)
            onDelete?.(deletedProduct); 
            console.log('Product deleted:', deletedProduct);

        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    return (
        <article className="product-card">
            <div className="product-image-container">
                <img
                    src={productCard.images[0]}
                    alt={productCard.title}
                    className="product-image"
                    loading="lazy"
                />
                <div className="product-category-badge">
                    {productCard.category}
                </div>
            </div>

            <div className="product-content">
                <div className="product-header">
                    <h3 className="product-title">{productCard.title}</h3>
                    <div className="product-rating">
                        <StarRating rating={productCard.rating} />
                        <span className="rating-value">({productCard.rating})</span>
                    </div>
                </div>

                <p className="product-description">{productCard.description}</p>

                <div className="product-footer">
                    <div className="product-price-container">
                        <span className="product-price">${productCard.price.toFixed(2)}</span>
                        <span className="product-stock">
                            {productCard.stock > 0 ? `${productCard.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    <button className="view-details-button" disabled={productCard.stock === 0} >
                        View Details
                    </button>

                    {isDelete && (
                        <button className="delete-button" onClick={handleDelete} >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

```

**Meaning**:
First of all, in the recurrent component there is an interface with props, including a model/s,boolean/s,& function/s.
There is a special feature of star array construction with special parameter lingo which will be implemented only in the function itself.
The function itself has the aforementioned props, button (in this case delete) handler, and the actual card return containing its relatively elaborate construction.
The manufacturing of the cards will be activated in the main components which would want to utilize it - both the home and products pages.


# Step #12: Hooks - UseTitles 
**Form**:

**hooks -> UseTitle.ts**

```ts
import { useEffect } from "react";

// Custom hook to dynamically set the browser tab title
// Usage: useTitle("Products") - changes browser tab to show "Products"
export default function useTitle(title: string): void {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

```

**Meaning**: Hooks are functions that interact with the React library and concern with the state of components. This hook dynamically changes the title of the web depending of each component is being drawn at the moment.


# Step #13: Component utilizations - Edit Product 
**Form**: 

**components -> product-area -> edit-product -> EditProduct.tsx**

```tsx
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './EditProduct.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/Store';

export default function EditProduct() {
    
    const { register, handleSubmit, reset, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Get products from Redux store using standard useSelector
    const products = useSelector((state: AppState) => state.products);

    useEffect(() => {
        if (id) {
            loadProduct(+id);
        }
    }, [id, products]); // products dependency to reload when Redux state changes

    async function loadProduct(productId: number) {
        try {
            // OPTIMIZATION: First check if product exists in Redux store
            const existingProduct = products.find(p => p.id === productId);
            
            let product: ProductModel;
            
            if (existingProduct) {
                // REDUX ADVANTAGE: Use cached data from global store
                console.log('Loading product from Redux store (cached)');
                product = existingProduct;
            } else {
                // FALLBACK: Load from API if not in store (e.g., direct URL access)
                console.log('Loading product from API (direct access)');
                product = await productService.getProductById(productId);
            }
            
            // FORM POPULATION: Set form values regardless of data source
            setValue('title', product.title);
            setValue('description', product.description);
            setValue('category', product.category);
            setValue('price', product.price);
            setValue('rating', product.rating);
            setValue('stock', product.stock);
        } catch (error) {
            console.error('Error loading product:', error);
        }
    }

    async function onSubmit(data: ProductModel) {
        try {
            console.log('Updating:', data);
            
            if (id) {
                // REDUX INTEGRATION: ProductService.editProduct() automatically updates the Redux store
                const updatedProduct = await productService.editProduct(+id, data);
                console.log('Updated:', updatedProduct);
            }
            
            reset();
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className='EditProduct'>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='edit-product-form'>
                <input type="text" placeholder='Product Title' {...register('title', { required: true })}/>
                <input type="text" placeholder='Product Description' {...register('description', { required: true })}/>
                <input type="text" placeholder='Category' {...register('category', { required: true })}/>
                <input type="number" step="0.01" placeholder='Price' {...register('price', { required: true, valueAsNumber: true })}/>
                <input type="number" step="0.1" min="0" max="5" placeholder='Rating' {...register('rating', { required: true, valueAsNumber: true })}/>
                <input type="number" placeholder='Stock' {...register('stock', { required: true, valueAsNumber: true })}/>
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className='back-btn'>Back</button>
                    <button type="submit" className='edit-product-btn'>Update Product</button>
                </div>
            </form>
        </div>
    )
}
```

**Meaning**:
- In this main component utiliziation, we import hook of form, hook of navigation, hook of effect, model, service, and store selector.
- The form has 4 relevant functions: register (the essential registrar of inputs to the React hook form and the collector of data in the inputs for the form to manage and validate), handleSubmit (the mediating function of the form submission by clicking and the hook form), reset (resetting the form) and setValue (an automated value setter of registered input).
- The hook useNavigate is used when clicked to navigate to the previous (main) page when clicked on the 'Back' button.
- The hook useParams is able to elicit the id from the url address (if exists). 
- useSelector function is here to get the prodcuts from the Redux store.
- useEffect to rerender page whenever there's a change in id or prodcuts, if there is activates the loadProduct function.
- loadProduct function tries to elicit product from the store by id, if not eliciting it from the server by the service, then a collection of setValue follows concerning the useForm hook to automatically fill the inputs.
- onSubmit function which binds and delivers the form content to handleSubmit hook form function to activate when the button is pressed, resets the form and navigates back to the products page.
- The utilization returns the main structure with the form, buttons with type submit (the Update button) or onClick to navigate back to the products page, inputs and registers inside them to collect, validate and manage the values in the inputs correspondingly.    


# Step #14: Component utilizations - Add Product 

**Form**: 

**components -> product-area -> add-product -> AddProduct.tsx**

```tsx
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './AddProduct.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import useTitle from '../../../utils/UseTitle';

export default function AddProduct() {
    const { register, handleSubmit, reset } = useForm<ProductModel>();
    const navigate = useNavigate();
    
    useTitle('Add Product');

    async function onSubmit(data: ProductModel) {
        try {
            console.log('Submitting:', data);
            
            // REDUX INTEGRATION: ProductService.addProduct() automatically updates the Redux store
            // WHY: No manual state management needed - service handles both API call and store update
            // FLOW: 1) Submit form → 2) Service adds to API → 3) Service dispatches addProduct action → 4) Redux store updated
            // BENEFIT: When user navigates back to /products, the new product will already be in the global state
            const newProduct = await productService.addProduct(data);
            console.log('Response:', newProduct);
            
            reset();
            navigate('/products');
        } catch (err) {
            console.error('Error adding product:', err);
            error((err as Error).message || 'Failed to add product');
        }
    }

    return (
        <div className='AddProduct'>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='add-product-form'>
                <input type="text" placeholder='Product Title' {...register('title', { required: true })}/>
                <input type="text" placeholder='Product Description' {...register('description', { required: true })}/>
                <input type="text" placeholder='Category' {...register('category', { required: true })}/>
                <input type="number" step="0.01" placeholder='Price' {...register('price', { required: true, valueAsNumber: true })}/>
                <input type="number" step="0.1" min="0" max="5" placeholder='Rating' {...register('rating', { required: true, valueAsNumber: true })}/>
                <input type="number" placeholder='Stock' {...register('stock', { required: true, valueAsNumber: true })}/>
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className='back-btn'>Back</button>
                    <button type="submit" className='add-product-btn'>Add Product</button>
                </div>
            </form>
        </div>
    )
}
```

**Meaning**:
This is a very similar format of the EditProduct component, and follows almost the same logic. The main differences here are that there are no setValue automated values, there is no need to subscribe to the store to fetch data, and the axios triggers another ProductSlice function.


# Step #15: Main Component - Products page 

**Form**: 

**components -> pages -> products -> Products.tsx**

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type ProductModel from '../../../models/ProductModel';
import './Products.css'
import { productService } from '../../../services/ProductService';
import ProductCard from '../../productArea/ProductCard/ProductCard';
import SearchBar from '../../shared/SearchBar/SearchBar';
import SortBar from '../../shared/SortBar/SortBar';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/Store';
import Loader from '../../shared/loader/Loader';
import useTitle from '../../../utils/UseTitle';

export default function Products() {

    useTitle('Products');
    
    const [loading, setLoading] = useState(false);

    // Local state management - each component manages its own products state
    // const [products, setProducts] = useState<ProductModel[]>([]);

    // WHY: All components can now access the same product data without prop drilling.  When ProductService updates the store, all components automatically get the updates
    const products = useSelector((state: AppState) => state.products); // get products from global store using standard useSelector

    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]); //Filtering logic stays local since it's only used in this component

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                // No need to setProducts() anymore - ProductService updates Redux store directly
                // const fetchedProducts = await productService.getProducts(); 
                // setProducts(fetchedProducts);
                // Just call the service - it will update the Redux store automatically. ProductService.getProducts() already dispatches initProducts action to store
                await productService.getProducts();
                // BENEFIT: Other components can now access products without additional API calls
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []); 

    // Update filtered products when Redux products change. When the global products state changes, we need to update our local filter
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);


    // SERVICE-BASED SEARCH, SORTING & DELETING: Offload filtering and sorting to the service layer
    async function handleSearchService(searchTerm: string) {
    
        try {
            const searchResults = await productService.searchProducts(searchTerm);
            setFilteredProducts(searchResults);
        } catch (error) {
            console.error('Search failed:', error);
            setFilteredProducts([]);
        }
    }


    async function handleSortService(sortBy: string, order: string) {
        try {
            const sortedResults = await productService.sortProducts(sortBy, order);
            setFilteredProducts(sortedResults);
        } catch (error) {
            console.error('Sort failed:', error);
        }
    }

    async function handleDelete(deletedProductID: number) {
        try {
            const resultsMinusDeletedProduct = await productService.deleteProduct(deletedProductID);
            setFilteredProducts(prevFiltered => prevFiltered.filter(product => product.id !== resultsMinusDeletedProduct.id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    // LOCAL SEARCH, SORTING & DELETING: Keeping this code commented out for reference

    // function handleSearch(searchTerm: string) {
    //     const filtered = products.filter(product =>
    //         product.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredProducts(filtered);
    // }



    // function handleSort(sortBy: string, order: string) {
    //     const sorted = [...filteredProducts].sort((a, b) => {
    //         let aValue, bValue;

    //         switch (sortBy) {
    //             case 'category':
    //                 aValue = a.category.toLowerCase();
    //                 bValue = b.category.toLowerCase();
    //                 break;
    //             case 'price':
    //                 aValue = a.price;
    //                 bValue = b.price;
    //                 break;
    //             case 'rating':
    //                 aValue = a.rating;
    //                 bValue = b.rating;
    //                 break;
    //             default:
    //                 return 0;
    //         }

    //         if (order === 'asc') {
    //             return aValue > bValue ? 1 : -1; // If aValue > bValue, return 1 (put a after b) Otherwise return -1 (put a before b) -> Result: smaller values first → A-Z, 1-10, low-high
    //         } else {
    //             return aValue < bValue ? 1 : -1; // If aValue < bValue, return 1 (put a after b) Otherwise return -1 (put a before b) -> Result: larger values first → Z-A, 10-1, high-low
    //         }
    //     });

    //     setFilteredProducts(sorted);
    // }


    // function handleDelete(deletedProduct: ProductModel) {
    //     setFilteredProducts(prevFiltered => prevFiltered.filter(product => product.id !== deletedProduct.id));
    // }


    return (
        <div className='Products'>
            <h1 className='products-title'>All Products</h1>

            <div className="products-filter-container">
                <div className="products-filter-left">
                    <SearchBar onSearch={handleSearchService} />
                    <SortBar onSort={handleSortService} />
                </div>
                <Link to='/products/add' className='add-product-link'>+</Link>
            </div>

            {loading && <Loader />}

            <div className="products-container">
                {filteredProducts && filteredProducts.map(product => (
                    <ProductCard key={product.id} productCard={product} isDelete={true} onDelete={handleDelete} />
                ))}
            </div>

        </div>
    )
}

```

**Meaning**:

- The main component essentially is one of the pair of main pages: this time the products page. Consequentially, many imports are necessary, from react hooks, models, services, recurring components, skeletal components, redux subscribers and store dispatchers, to minor hooks.
- useState are exercised if local only to this component.
- The main useState function is setFilteredProducts, which updates the array of products with every rendering or change due to various functions in the component. useState always has to be interconnected with useEffect function to render the page with the new data within each state change.
- The secondary useState function is of the loading animation, to know when and if it should be drawn (based on conditional rendering in the return structure)
- There is an initial useEffect to render the page with initial products by asynchronically getting the products by the service. It should be noted that each service must promise the precise type of data to the correct function that calls it. In our case to each rendering the promise of the service must be an array of product models.
- Also, another useEffect is here not just for initialization of page but also for every change in the products.
- Then three handle services are here to try and catch asynchronically calls from the service (which probes the server) for each particular end. No need to mention, they wait for product models to update the state of products. If they do not wait for product models array but a single product model, then another action will happen to set product models in the end.
- In comment for reference - local handlers that do not involve calling the server (and therefore do not dispatch material to the Redux store).
- The order of things: interface -> component handler (who tries to call the service asynchronically) -> service (who updates/elicits from the server and dispatches to the store asynchronically ) -> store -> local useEffects in subscribed components that change whenever the AppState (mediated by useSelector subscription) or useState's state function are changed.
- The first attempt of calling the server in the handler is enveloped with a try & catch mechanism to catch errors if there are (e.g. the server has fallen temporarily). Why are they not in the services as well? Because the main components are the first link of the chain; if they will catch an error then we are all good (there need not be checks in later links of the chain).
- Finally in the return section is the actual structure of the products page component with all its applications, integrations, function handling and conditional rendering.  



## 31 new-post
```tsx
import { useForm } from 'react-hook-form';
import type PostDraft from '../../../models/post-draft';
import './NewPost.css';
import { useState } from 'react';
import { useAppDispatcher } from '../../../redux/hooks';
import { newPost } from '../../../redux/profile-slice';
import useService from '../../../hooks/use-service';
import ProfileService from '../../../services/auth-aware/ProfileService';

export default function NewPost() {

    const { register, handleSubmit, reset, formState } = useForm<PostDraft>();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useAppDispatcher();

    const profileService = useService(ProfileService);

    async function submit(draft: PostDraft) {
        draft.image = (draft.image as unknown as FileList)[0];
        try {
            setIsSubmitting(true);
            const post = await profileService.newPost(draft);
            reset();
            dispatch(newPost(post));
        } catch (e) {
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="add title" {...register('title', {
                    required: {
                        value: true,
                        message: 'Title is required'
                    },
                    minLength: {
                        value: 10,
                        message: 'Title must be at least 10 characters long'
                    }
                })} />
                <div className='formError'>{formState.errors.title?.message}</div>
                <textarea placeholder='add content' {...register('body', {
                    required: {
                        value: true,
                        message: 'Post content is required'
                    },
                    minLength: {
                        value: 20,
                        message: 'Post content must be at least 20 characters long'
                    }
                })}></textarea>
                <div className='formError'>{formState.errors.body?.message}</div>
                <input type='file' {...register('image')}/>
            </form>
        </div>
    );
}
```


# Step #16: Main Component - Home page 

**Form**: 

**components -> pages -> home -> Home.tsx**

```tsx
import { useEffect, useState } from 'react';
import './Home.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import ProductCard from '../../productArea/ProductCard/ProductCard';

export default function Home() {
    const [randomProduct, setRandomProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRandomProduct();
    }, [])

    async function fetchRandomProduct() {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedProducts = await productService.getProducts();
            if (fetchedProducts.length > 0) {
                const randomIndex = Math.floor(Math.random() * fetchedProducts.length);
                const randomProduct = fetchedProducts[randomIndex];
                setRandomProduct(randomProduct);
            } else {
                setError('No products available');
            }
        } catch (err) {
            setError('Failed to load products');
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="home">
            <div className="content">
                <div className="left">
                    <h1 className="title">Welcome to our store</h1>
                    <p className="subtitle">Discover amazing products</p>
                    <div className="buttons">
                        <button className="shop-btn">Shop Now</button>
                        <button 
                            className="refresh-btn"
                            onClick={fetchRandomProduct}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'New Product'}
                        </button>
                    </div>
                </div>
                
                <div className="right">
                    {error ? (
                        <div className="error">
                            <p>{error}</p>
                            <button onClick={fetchRandomProduct}>Try Again</button>
                        </div>
                    ) : isLoading ? (
                        <div className="loading">Loading...</div>
                    ) : randomProduct ? (
                        <ProductCard productCard={randomProduct} />
                    ) : null}
                </div>
            </div>
        </main>
    )
}
```

**Meaning**:

- The homepage is one of the two main component, and likewise is similar to the products page but with less functionality.
- Contains imports of certain models and services, including the fundamental functions of React: useEffect and useState.
- Three useState functions are applied: for randomal product which is shown, loading state applied on the button and on the product card, and error message if nothing is shown.
- fetchRandomProduct function is straightforward, setting the above mentioned states, fetching products with the service, and using math functions for randomizing.
- The structure contains a button with functionality (show newly randomized product and conditional rendering of its writing), and a nice chained ternary for the randomized card; if the checks are allowed, the product card will finally be shown. 


# Step #17: Routing 

**Form**: 

**components -> layout -> routing -> Routing.tsx**

```tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Products from "../../pages/products/Products";
import AddProduct from "../../productArea/AddProduct/AddProduct";
import EditProduct from "../../productArea/EditProduct/EditProduct";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
    )
}
```

**Meaning**:

- Routes has a routing function: embedding a Route in Routes envelope. Each Route has a path(extra piece of URLs) and elements(where I should navigate to or which component I will sketch in the main division in regard to the path chosen).
- Main Difference between Navigation and Routing: Routing sketches the component based on the URL path we are currently in, navigation simply changes (=linking) the URL path (e.g. by clicking a button). 


# Step #18: Layout 

**Form**: 

**components -> layout -> layout -> Layout.tsx**

```tsx
import Navbar from '../navbar/Navbar'
import Routing from '../routing/Routing'
import './Layout.css'


export default function Layout() {
  return (
    <div className='Layout'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routing />
      </main>
    </div>
  )
}
```

**Meaning**:

- The layout is the core envelope of our application, wherein we have Navigation Bar in the nav division and Routing section in the main division (or any other logical arrangement).


# Step #19: Main 

**Form**: 

**main.tsx**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/layout/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/Store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
            {/* This makes the Redux store available to all components via useSelector/useDispatch */}
            <Provider store={store}>
                <Layout />
            </Provider>
        </BrowserRouter>
  </StrictMode>,
)
```

**Meaning**: Finally the main tsx file in the root src file. This is the actual HTML drawing and the only place in which getElementById exists. This is the place where all the commands, connections, functions, layout, router and store slouce their information. It does that by enveloping with hierarchy the Mark-Up tree. The layout is embedded in the store, which in turn is hugged by the BrowserRouter (to know we are dealing with computer apps and not mobole apps). Finally StrictMode wraps the enchilada up to make rules strict and without glitches.

-----------------------------------------------------------------------------------------


# Step X# : Advanced Structure: Authentication, jwt, hooks, and context

## S1 login interface
```ts
export default interface Login {
    username: string,
    password: string
}
```

## S2 interface Authentication context
```ts
import { createContext } from "react"

interface AuthContextInterface {
    jwt: string,
    newJwt(jwt: string): void
}

const AuthContext = createContext<AuthContextInterface | null>(null)
export default AuthContext

```

## S3 Auth function
```tsx
import { useState, type PropsWithChildren } from "react";
import AuthContext from "./AuthContext";

export default function Auth(props: PropsWithChildren) {

    const [jwt, setJwt] = useState<string>(localStorage.getItem('jwt') || '')

    const { children } = props

    function newJwt(jwt: string) {
        setJwt(jwt)
        localStorage.setItem('jwt', jwt)
    }

    return (
        <AuthContext.Provider value={{ jwt, newJwt }}>
            {children}
        </AuthContext.Provider>
    )
}
```


## S4 AuthAware class
```ts
import type { AxiosInstance } from "axios";
import axios from "axios";

export default abstract class AuthAware {
    axiosInstance: AxiosInstance

    constructor(jwt: string, clientId: string) {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_REST_SERVER_URL,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'x-client-id': `${clientId}`
            }
        })
    }
}
```

## S5 Auth Service
```ts
import axios from "axios"
import type Login from "../models/login"

class AuthService {
    async login(login: Login): Promise<{ jwt: string }> {
        const { data } = await axios.post<{ jwt: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, login)
        return data
    }
}

const authService = new AuthService()
export default authService
```

## S6 Login function
```tsx
import { useContext, useState } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import type LoginModel from '../../../models/login'
import authService from '../../../services/auth'
import AuthContext from '../auth/AuthContext'

export default function Login() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, handleSubmit } = useForm<LoginModel>()

    const authContext = useContext(AuthContext)

    async function submit(login: LoginModel) {
        try {
            setIsSubmitting(true)
            const { jwt } = await authService.login(login)
            authContext?.newJwt(jwt)
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='username' {...register('username')} />
                <input placeholder='password' type="password" {...register('password')} />
            </form>
        </div>
    )
}
```

## S8 useUserId hook
```ts 
import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"

export default function useUserId() {
    const authContext = useContext(AuthContext)

    const id = useMemo(() => {
        if (authContext?.jwt) {
            const { id } = jwtDecode<{ id: string }>(authContext.jwt)
            return id
        }
    }, [authContext])

    return id

}
```

## S9 useUsername hook
```ts
import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"

export default function useUsername() {
    const authContext = useContext(AuthContext)

    const name = useMemo(() => {
        const { name } = jwtDecode<{ name: string }>(authContext!.jwt)
        return name
    }, [authContext])

    return name

}
```

## S10 useTitle hook
```ts
import { useEffect } from "react"

export default function useTitle(title: string) {
    useEffect(() => {
        document.title = title
    }, [title])
}
```

## S11 useService hook
```ts
import { useContext } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import type AuthAware from "../services/auth-aware/AuthAware"

export default function useService<T extends AuthAware>(Service: { new(jwt: string, clientId: string): T }): T {
    const authContext = useContext(AuthContext)

    const service = new Service(authContext!.jwt)

    return service
}
```

## S13 Followers Service
```ts
import type User from "../../models/user"
import AuthAware from "./AuthAware"

export default class FollowersService extends AuthAware {
    async getFollowers(): Promise<User[]> {
        const { data } = await this.axiosInstance<User[]>(`/follows/followers`)
        return data
    }
}

```
## S14 FollowingService
```ts
import AuthAware from "./AuthAware"
import type User from "../../models/user"

export default class FollowingService extends AuthAware {
    async getFollowing(): Promise<User[]> {
        const { data } = await this.axiosInstance<User[]>(`/follows/following`)
        return data
    }

    async unfollow(userId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/follows/unfollow/${userId}`)
        return data
    }

    async follow(userId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/follows/follow/${userId}`)
        return data
    }

}
```

## S15 ProfileService
```ts
import type Post from "../../models/post"
import AuthAware from "./AuthAware"
import type PostDraft from "../../models/post-draft"

export default class ProfileService extends AuthAware {

    async getProfile(): Promise<Post[]> {
        const response = await this.axiosInstance.get<Post[]>(`/profile`)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/profile/${id}`)
        return response.data
    }

    async newPost(draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.post<Post>(`/profile`, draft)
        return response.data
    }

    async getPost(id: string): Promise<Post> {
        const response = await this.axiosInstance<Post>(`/profile/${id}`)
        return response.data
    }

    async editPost(id: string, draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.patch<Post>(`/profile/${id}`, draft)
        return response.data
    }
}
```

## S16 FeedService
```ts
import type Post from "../../models/post"
import AuthAware from "./AuthAware"

export default class FeedService extends AuthAware {
    async getFeed(): Promise<Post[]> {
        const { data } = await this.axiosInstance<Post[]>(`/feed`)
        return data
    }


}
```

## S17 CommentsService
```ts
import type PostCommentDraft from "../../models/post-comment-draft"
import type PostComment from "../../models/post-comment"
import AuthAware from "./AuthAware"

export default class CommentsService extends AuthAware {
    async newComment(postId: string, draft: PostCommentDraft): Promise<PostComment> {
        const { data } = await this.axiosInstance.post<PostComment>(`/comments/${postId}`, draft)
        return data
    }
}

```


## S18 NewComment component
```tsx
import { useForm } from 'react-hook-form'
import type PostCommentDraft from '../../../../models/post-comment-draft'
import './NewComment.css'
import { useState } from 'react'
import { useAppDispatcher } from '../../../../redux/hooks'
import { newComment } from '../../../../redux/profile-slice'
import useService from '../../../../hooks/use-service'
import CommentsService from '../../../../services/auth-aware/CommentsService'

interface NewCommentProps {
    postId: string
}
export default function NewComment(props: NewCommentProps) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { postId } = props

    const { register, handleSubmit, reset, formState } = useForm<PostCommentDraft>()

    const dispatch = useAppDispatcher()

    const commentsService = useService(CommentsService)

    async function submit(draft: PostCommentDraft) {
        try {
            setIsSubmitting(true)
            const comment = await commentsService.newComment(postId, draft)
            reset()
            dispatch(newComment(comment))
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <div className='NewComment'>
            <form onSubmit={handleSubmit(submit)}>
                <textarea {...register('body', {
                    required: {
                        value: true,
                        message: 'Body is required'
                    },
                    minLength: {
                        value: 20,
                        message: 'short comments are not for us'
                    }
                })}></textarea>
                <div className="formError">{formState.errors.body?.message}</div>
            </form>
        </div>
    )
}
```

## S19 EditPost component
```tsx
import { useNavigate, useParams } from 'react-router-dom'
import './EditPost.css'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type PostDraft from '../../../models/post-draft'
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/profile-slice'
import useService from '../../../hooks/use-service'
import ProfileService from '../../../services/auth-aware/ProfileService'

export default function EditPost() {

    const profileService = useService(ProfileService)

    const { id } = useParams<'id'>()

    const { register, handleSubmit, reset, formState } = useForm<PostDraft>()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const post = useAppSelector(state => state.profileSlice.posts.find(p => p.id === id))
    const dispatch = useAppDispatcher()

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            // const post = await profileService.getPost(id!)
            if (!post) {
                const profileFromServer = await profileService.getProfile()
                dispatch(init(profileFromServer))
            } else {
                const { title, body } = post
                const draft = { title, body }
                reset(draft)
            }
        })()

    }, [dispatch, id, post, reset])

    async function submit(draft: PostDraft) {
        try {
            setIsSubmitting(true)
            await profileService.editPost(id!, draft)
            navigate('/profile')
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='EditPost'>
                <form onSubmit={handleSubmit(submit)}>
                    <input placeholder="add title" {...register('title', {
                        required: {
                            value: true,
                            message: 'Title is required'
                        },
                        minLength: {
                            value: 10,
                            message: 'Title must be at least 10 characters long'
                        }
                    })} />
                    <div className='formError'>{formState.errors.title?.message}</div>
                    <textarea placeholder='add content' {...register('body', {
                        required: {
                            value: true,
                            message: 'Post content is required'
                        },
                        minLength: {
                            value: 20,
                            message: 'Post content must be at least 20 characters long'
                        }
                    })}></textarea>
                    <div className='formError'>{formState.errors.body?.message}</div>
                    <input></input>
                </form>
            }
        </div>
    )
}
```

## S20 App function
```tsx
import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import './App.css'
import store from '../../redux/store'
import { Provider as Redux } from 'react-redux'
import Auth from '../auth/auth/Auth'

function App() {

    return (
        <BrowserRouter>
            <Auth>
                <Redux store={store}>
                        <Layout />
                </Redux>
            </Auth>
        </BrowserRouter>
    )
}

export default App
```

## 21 Layout function

```tsx
import { useContext } from 'react'
import Followers from '../../follows/followers/Followers'
import Following from '../../follows/following/Following'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'
import Login from '../../auth/login/Login'
import AuthContext from '../../auth/auth/AuthContext'

export default function Layout() {

    const authContext = useContext(AuthContext)

    const isLoggedIn = !!authContext?.jwt

    return (
        <div className='Layout'>

            {isLoggedIn && <>
                <header>
                    <Header />
                </header>
                <aside>
                    <Following />
                </aside>
                <aside>
                    <Followers />
                </aside>
                <main>
                    <Main />
                </main>
            </>}

            {!isLoggedIn && <Login />}
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
```

## 22 default.json
```json
{
    "app": {
        "port": 3000,
        "name": "weezer dev",
        "secret": "MySecret",
        "jwtSecret": "JwtSecret"
    },
    "db": {
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "weezer"
    },
    "s3": {
        "bucket": "images.weezer.com",
        "connection": {
            "endpoint": "http://localhost:4566",
            "region": "us-east-1",
            "credentials": {
                "accessKeyId": "test",
                "secretAccessKey": "test"
            },
            "forcePathStyle": true
        }
    }
}
```

## 24 file-uploader.ts
```ts
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import config from 'config'
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";

declare global {
    namespace Express {
        interface Request {
            imageUrl: string
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files) next()
    if (!req.files.image) next()

    console.log(req.files)    

    const { mimetype , data, name} = req.files.image as UploadedFile

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: config.get<string>('s3.bucket'),
            Key: `${randomUUID()}${extname(name)}`,
            ContentType: mimetype,
            Body: data
        }
    })

    const result = await upload.done()
    req.imageUrl = result.Location
    next()
}
```

## 25 aws.ts
```ts
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import config from 'config'

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')))

const s3Client = new S3Client(s3Connection)

export async function createAppBucketIfNotExists() {
    try {
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: config.get<string>('s3.bucket')
            })
        )
        console.log(result)
    } catch (e) {
        console.log('bucket creation failed. silenting exception, bucket probably already exists', e)        
    }
}

export async function testUpload() {
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: 'test.txt',
                ContentType: 'text/plain',
                Body: 'hello world, localstack seems to work'
            }
        })

        const result = await upload.done()
        console.log('upload result:', result)
    } catch (e) {
        console.log('exception in test upload: ', e)
    }
}

export default s3Client
```

## 34 docker-compose.yaml 

```yaml
version: '3.8'

# services - here i am going to list containers that i want to build
# each service, actually describes a docker run command
services:
  # docker run --name weezer-db -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=weezer -e MYSQL_TCP_PORT=3306 -p 3308:3306 shaharsol/weezer-db:1.0.0
  database:
    container_name: weezer-db-compose
    environment:
      - MYSQL_ALLOW_EMPTY_PASSWORD=1
      - MYSQL_DATABASE=weezer
      - MYSQL_TCP_PORT=3306
    ports:
      - "3309:3306"
    #image: shaharsol/weezer-db:1.0.0
    build: ./database
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1"]
      interval: 1m30s
      timeout: 30s
      retries: 5
      start_period: 30s
  
  # docker run --name weezer-backend -d -e NODE_ENV=docker  -p 3010:3000 shaharsol/weezer-backend:3.0.0
  backend:
    container_name: weezer-backend-compose
    environment:
      - NODE_ENV=compose
    ports:
      - "3020:3000"
    build: ./backend
    depends_on:
      database:
        condition: service_healthy
        
# docker run --name weezer-frontend -d -p 3011:5173 shaharsol/weezer-frontend:1.0.1
  frontend:
    container_name: weezer-frontend-compose
    ports: 
      - 3012:80
    build:
      context: ./frontend
      dockerfile: Dockerfile.compose

  localstack:
    container_name: weezer-localstack
    ports:
      - 4566:4566
      - 4510-4599:4510-4599
    image: localstack/localstack
```
