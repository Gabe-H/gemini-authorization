const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
require('dotenv').config()
var app = express()

console.log(process.env.TEST)

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8080/callback'
})
app.listen(8080)

app.get('/auth', (req, res) => {
    var myUrl = spotifyApi.createAuthorizeURL(['user-read-email'], '', true)
    res.redirect(myUrl)
})
app.get('/callback', (req, res) => {
    res.send(req.query)
})