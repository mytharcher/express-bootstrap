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
0. [Heroku](http://www.heroku.com/): this sample is held on Heroku PaaS
0. [mustache](http://mustache.github.com/) ([Hogan](https://github.com/twitter/hogan.js)): logic-less template engine

## Local deployment ##

You need run these steps just once.

0.  First, you need to use `npm install` to download all depended pacakges.
	
		$ npm install
		$ sudo npm install -g nodemon   # nodemon is only for development
	
0.  Copy `.env.sample` to `.env`, and configure your database URL in it, also set local HTTP port you like.
	
0.	Local service need Ruby gem `foreman` to start. So you need install Ruby and gem `foreman`.
	
		$ sudo gem install foreman
	
0.  Use this command to initilize MySQL database tables (make sure you've installed MySQL):
	
		$ foreman run node install

0.  Start app by this command:
	
		$ foreman run nodemon app

## Architecture ##

### Folder structure ###

	.
	|-- assets/           # Static files, including JS, CSS, images
	|-- controllers/      # All HTTP API routers, same path as folder
	|-- filters/          # Interceptor filters before routers
	|-- lib/              # Local library for application
	|-- models/           # Sequelize MySQL table definition
	|-- views/            # Templates
	|-- .env.sample       # Local environment config
	|-- .gitignore        # 
	|-- app.js            # Application main file
	|-- config.json       # Application config
	|-- package.json      # Node package config
	|-- Procfile          # Heroku startup command file
	`-- README.md         # 

### Back end MVC ###

#### Model ####

All models are about database tables, and use [Sequelize][] ORM framework to manage them in `models/` folder.

Every file in `models/` folder defined a database table, use **camel case** table name, excluding a special file `.associations` which maintains all tables associations (1 to 1, 1 to many, many to many) in it.

#### Controller(action) ####

Just like `Action` layer in Java SSH, or controller in PHP CI, here controllers' responsibility as routing and catching HTTP request from client.

All files under `controllers/` folder would have same path when client request. For example, `controllers/index.js` would catch request from `http://yourhost/`, `controllers/account/login.js` would catch request from `http://yourhost/account/login`.

In order to do some pre-treatment before real action process, there designed a filter layer just like interceptors in Java SSH. And it is easy to maintain in `filters/` folder. Every filter is a [Express][] request handling router, which can be use as real routers but not. Filter should exports a `function`, with parameters `request`, `response` and `next`.

If a controller need to be intercepted by some filters, it should be define like this:

	module.get = {
		// filters which have same name in `filters/` folder
		// if defined, must be an Array
		filters: ['authorization'],
		
		// real function process
		process: function (req, res, next) {
			// ...
			res.send(200, 'OK');
		}
	};

And if an action don't need filters, the controller definition just exports a process function is also ok.

All controllers routing had been move to a single npm. See more about [Rainbow](https://github.com/mytharcher/rainbow).

### RESTful HTTP design ###

Here is some HTTP status code used for certain meaning of response from server.

*	**200** `ondata`
	
	Everything is OK, and responese contains some data from server.
	
*	**201**(\*) `oncreated`
	
	Create done, and response new created resources.
	
	May use for creating new data record.
	
*	**204** `onok`
	
	A certain operation has been done successfully, and no extra data need to response.
	
	Used for updating or deleting some data.
	
*	**205**(\*) `ondone`
	
	Almost same as `204`, but need to update view.
	
	May use in login/logout, etc.
	
*	**400** `onbadrequest`
	
	Syntax error.
	
	Query parameters less than required or data type not match.
	
*	**403** `onforbidden`
	
	Forbidden. Just indicates that the request need authorization.
	
*	**404** `onnotfound`
	
	Not found. Wrong path or resouces not exist (may be private).
	
*	**409** `onconflict`
	
	 Confict. Repeat record.
	
*	**422**(\*) `onwrongcontent`
	
	Semantics error.
	
	Something like `400`, additionally indicates query parameters contains wrong content.
	
*	**500** `onservererror`
	
	Server error. There is something wrong in server.
	
	Mostly indicates that server exceptions have not been caught.

These all could be used in both filters and controllers.

*Notice*: \* means it is just in design.

For more infomation [wiki:HTTP status codes](http://en.wikipedia.org/wiki/HTTP_status_code).

-EOF-

[Express]: http://expressjs.com/
[Sequelize]: http://www.sequelizejs.com/
