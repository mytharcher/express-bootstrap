Express Bootstrap
=================

Bootstrap for Node.js express web applications.

## Know before start ##

Before you begin to develop, make sure you have known something about these:

0. JavaScript
0. [node API](http://nodejs.org/api/)
0. [Express][]: node.js web application framework
0. [Sequelize][]: node.js database ORM middleware
0. MySQL
0. [mustache](http://mustache.github.com/) ([Hogan](https://github.com/twitter/hogan.js), [Handlebars](http://handlebarsjs.com/)): logic-less template engine

## Local deployment ##

You need run these steps just once.

0.  First, you need to use `npm install` to download all depended pacakges.

		$ npm install

0.  Copy `.env.sample` to `.env`, and configure your database URL in it, also set local HTTP port you like. The `db_protocol` could be `mysql` or `postgres` or any other your are using.

0.  Use this command to initilize database tables (make sure you've installed MySQL or Postgresql):

		$ npm run init-databases

0.  Start app by this command:

		$ npm run dev

	The `nodemon` will be used to watch any modifications.

## Architecture ##

### Folder structure ###

	.
	|-- assets/           # Static files, including JS, CSS, images
	|-- controllers/      # All HTTP API routers, same path as folder
	|-- filters/          # Interceptor filters before routers
	|-- lib/              # Local library for application
	|-- store/            # Database definition
	|  |-- db/
	|  |  |-- migrations/ # Sequelize migration files
	|  |  |-- models/     # Sequelize database table definition
	|  `-- ...            # Other database driver definition
	|-- .env.sample       # Local environment config sample
	|-- app.js            # Application main file, which will be exported as a module
	`-- server.js         # Npm default start script

### Back end MVC ###

#### Model ####

All models are about database tables, and use [Sequelize][] ORM framework to manage them in `store/<db driver>/` folder.

Every file in `store/<db driver>/` folder defined a database table, use **camel case** table name, excluding a special file `index.js` which maintains all tables associations (1 to 1, 1 to many, many to many) in it.

#### Controller(action) ####

Just like `Action` layer in Java SSH, or controller in PHP CI, here controllers' responsibility as routing and catching HTTP request from client.

All files under `controllers/` folder would have same path when client request. For example, `controllers/index.js` would catch request from `http://yourhost/`, `controllers/account/login.js` would catch request from `http://yourhost/account/login`.

In order to do some pre-treatment before real action process, there designed a filter layer just like interceptors in Java SSH. And it is easy to maintain in `middlewares/` folder, each file in it is an [Express][] middleware.

If a controller need to be intercepted by some filters, it should be define like this:

	// real controller process
	exports.GET = [
		authoriticate,
		function (req, res, next) {
			// ...
			res.send(200, 'OK');
		}
	];

All controllers routing had been move to a single npm. See more about [Rainbow](https://github.com/mytharcher/rainbow).

All these configuration could be changed in `app.js`.

### RESTful HTTP Response ###

Here is some HTTP status code used for certain meaning of response from server. And the methods in this list have been implemented in response object.

*	**200** `data`

	Everything is OK, and responese contains some data from server.

*	**201**(\*) `created`

	Create done, and response new created resources.

	May use for creating new data record.

*	**204** `ok`

	A certain operation has been done successfully, and no extra data need to response.

	Used for updating or deleting some data.

*	**205**(\*) `done`

	Almost same as `204`, but need to update view.

	May use in login/logout, etc.

*	**400** `badrequest`

	Syntax error.

	Query parameters less than required or data type not match.

*	**403** `forbidden`

	Forbidden. Just indicates that the request need authorization.

*	**404** `notfound`

	Not found. Wrong path or resouces not exist (may be private).

*	**409** `conflict`

	Confict. Repeat record.

*	**422**(\*) `wrongcontent`

	Semantics error.

	Something like `400`, additionally indicates query parameters contains wrong content.

*	**500** `servererror`

	Server error. There is something wrong in server.

	Mostly indicates that server exceptions have not been caught.

These all could be used in both filters and controllers.

*Notice*: \* means it is just in design.

For more infomation [wiki:HTTP status codes](http://en.wikipedia.org/wiki/HTTP_status_code).

-EOF-

[Express]: http://expressjs.com/
[Sequelize]: http://www.sequelizejs.com/

