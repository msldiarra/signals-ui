import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import DB from './data/database';
import jwt from 'jsonwebtoken';
import {Schema} from './data/schema';
import bodyParser from 'body-parser';
import crypto from 'crypto';

const APP_PORT = 3000;
const API_PORT = 3001;
const GRAPHQL_PORT = 8080;

var isProduction = process.env.NODE_ENV === 'production';
var applicationPort = isProduction ? process.env.APP_PORT : APP_PORT;
var apiPort = isProduction ? process.env.API_PORT : API_PORT;
var graphqlPort = isProduction ? process.env.GRAPHQL_PORT : GRAPHQL_PORT;

// Expose a GraphQL endpoint
var graphQLServer = express();

graphQLServer.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
}));

graphQLServer.listen(graphqlPort, () => console.log(
    `GraphQL Server is now running on http://localhost:${graphqlPort}`
));


var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + apiPort + '/api');
});

app.post('/api/authenticate', (request, response) => {

    DB.models.user
        .findOne({where: {login: request.body.login}})
        .then((user) => {

            var password = crypto.createHash("sha256").update(request.body.password).digest("base64");

            if (user.password != password) {
                response.json({
                    success: false,
                    message: 'Bad authentication'
                });
            } else {
                let decoded = jwt.sign(user.dataValues, 'secret', {
                    expiresIn: 600
                });

                response.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: decoded
                });
            }

        })
        .catch((error) => {
            console.log(error);
            response.json({
                success: false,
                message: 'Unhandled error'
            });
        });
});

app.listen(apiPort);

if(!isProduction) {

	// Serve the Relay app
	var compiler = webpack({
	    entry: path.resolve(__dirname, 'js', 'app.js'),
	    module: {
		loaders: [
		    {
		        exclude: /node_modules/,
		        loader: 'babel',
		        test: /\.js$/,
		    }
		]
	    },
	    output: {filename: 'app.js', path: '/'}
	});

	var app = new WebpackDevServer(compiler, {
	    contentBase: '/public/',
	    proxy: {'/graphql': `http://localhost:${graphqlPort}`},
	    publicPath: '/js/',
	    stats: {colors: true}
	});

} else {
	var app = express();
}

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(applicationPort, () => {
    console.log(`App is now running on http://localhost:${applicationPort}`);
});



