/*jshint esversion: 8*/

const jwt = require('jsonwebtoken');
const querystring = require('query-string');
const url = require('url');

//create middleware function
//this function can be used in any route to verfiy user access
module.exports = function auth (req, res, next){
    // const token = req.['authToken'];

    //const authHeader = req.headers.authToken;
    //const token = req.get('authToken');
    //const token = authHeader && authHeader.split(' ')[1];

    let reqUrl = req.url;
    const parsedUrl = url.parse(reqUrl);
    const queryUrl = querystring.parse(parsedUrl.query);

    const token = queryUrl.token;

    console.log('In verifyToken .... *********************');
    //console.log("toekn = " + token);
    //console.log(`req.header = ${req.headers.authToken}`);
    console.log(`token = ${token}`);
    if(!token)
        return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('Sending token back to the requetor ******');
        //verified will contain the _id
        req.user = verified;
        next();
        console.log(verified);

    } catch (err) {
        res.status(400).json({"msg": 'Invalid Token'});
    }
};