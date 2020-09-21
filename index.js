const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
var app = express()

var spotifyApi = new SpotifyWebApi({
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    redirectUri: 'http://localhost:8080/callback'
})
app.listen(8080)

app.get('/auth', (req, res) => {
    var myUrl = spotifyApi.createAuthorizeURL(['user-read-email'], '', true)
    res.redirect(myUrl)
})
app.get('/callback', (req, res) => {
    
})