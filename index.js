const express = require("express")
const path = require('path')
const SpotifyWebApi = require("spotify-web-api-node")
require("dotenv").config()
var fetch = require('node-fetch')
const { urlencoded } = require("express")
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
        var url = spotifyApi.createAuthorizeURL(["user-modify-playback-state", "user-read-playback-state"], '')
        res.redirect(url)
    })
    .get('/request_token', (req, res) => {
        var code = req.query.code
        spotifyApi.authorizationCodeGrant(code).then(
            function(data) {
                console.log(data)
                res.send(data)
            },
            function(err) {
                res.send(err)
            }
        )
    })
    .get('/refresh', (request, response) => {
        var myRefresh = request.query.refresh_token
        var b64creds = 
              'Basic ' +
              Buffer.from(
                client_id + ':' + client_secret
              ).toString('base64')

        console.log(b64creds)
        fetch('https://accounts.spotify.com/api/token/?grant_type=refresh_token&refresh_token=' + myRefresh, { method: 'POST', headers: {'Authorization': b64creds, 'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => res.json())
        .then(json => response.send(json))
    })
    .listen(PORT, () => console.log(`listening on ${ PORT }`))