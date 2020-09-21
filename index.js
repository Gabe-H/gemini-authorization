const express = require("express")
const path = require('path')
const SpotifyWebApi = require("spotify-web-api-node")
require("dotenv").config()
const PORT = process.env.PORT || 5000

var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://localhost:8080/callback'
})


express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('home'))
    .get('/auth', (req, res) => {
        var url = spotifyApi.createAuthorizeURL(["user-modify-playback-state", "user-read-playback-state"], '', true)
        res.redirect(url)
    })
    .listen(PORT, () => console.log(`listening on ${ PORT }`))