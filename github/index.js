var Promise = require("bluebird"),
    GitHubApi = require("github"),
    moment = require("moment"),
    
    config = require("../config"),
    mapper = require("./mapper"),
    sorter = require("./sorter"),
    cache = require("../cache");

var API_LOCATION = "https://api.github.com/",
    CACHE_KEY = "github";

module.exports = function(token) {
    if (!token)
        throw new Error("An oauth token is required.");
    
    this._token = token;
    
    this.repos = function() {
        return new Promise(function(resolve, reject) {
            var github = new GitHubApi({
                version: "3.0.0"
            });
            github.authenticate({
                type: "oauth",
                token: config.githubApiKey
            })
            github.repos.getAll({
                type: "public",
                sort: "pushed",
                direction: "desc"
            }, function(err, repos) {
                if (err) reject(err);
                else resolve(repos);
            });
        });
    };
};