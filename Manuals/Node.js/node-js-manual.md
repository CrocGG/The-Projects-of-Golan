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