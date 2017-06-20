var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'iWCMSi6lJ5rBxiUzqOhZvx4hg',
  consumer_secret: 'yrXANhvN5Ib9cpjahJFv1keS2mnjnGsp4XQTte3LUxS43hRbpu',
  access_token_key: '345181416-akNmbv2RhpqaBWU6QJZFkEHhoBJ8gZSmSC0lUMyU',
  access_token_secret: '4rJc5SvTI0C9zRC3HUThVvwTlMO6MUdcwZ49UQaY6ePrB'
});
 





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/result', function(req, res, next) {
  res.render('result');
});

router.post('/', function(req, res, next) {
var scr = req.param('userid');
var params = {screen_name: scr};
var one_way_followers = [];
var users_to_display = [];

client.get('followers/ids', params, function(error, followers_results, response) {
  if (error)
  	throw error;
  
  var followers = followers_results.ids;
  client.get('friends/ids', params, function(error, following_results, response) {
    
  var following = following_results.ids;

  following.forEach(function(person){
    if(followers.indexOf(person)==-1){
    	one_way_followers.push(person);
    }
  }); 

 

  one_way_followers = one_way_followers.slice(0,99);
  var one_way_followers_string = one_way_followers.join();

  client.get('users/lookup', {user_id: one_way_followers_string}, function(error, users_results, response) {
    users_results.forEach(function(user){
    	var userObject = {
    		name: user.name,
    		screen_name: user.screen_name,
    		avatar: user.profile_image_url,
    		flwcnt:  user.followers_count,
    		location: user.location,
    		fav: user.favourites_count
    	};
    	users_to_display.push(userObject);
    }); 
    res.render('result', { users: users_to_display });

   });
});
});
  
});

module.exports = router;
