var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

client.set('framework', 'nodejs');

client.set('version', '1.0.0', function(err, reply){
    if(err)
        console.log(err);
    else console.log(reply);
});

client.get('framework', function(err, reply){
    if(err)
        console.log(err);
    else console.log(reply);
});

//storing hashes(objects)
client.hmset('frameworks', 'script','nodejs', 'css', 'bootstrap', 'node', 'express');

//retrieving hashes
client.hgetall('frameworks', function(err, result){
    if(err) console.log(err);
    else console.log(result);
});

//storing hashes in simplified form
client.hmset('person', {
    'name':'brijesh kumar',
    'age':27,
    'gender':'male'
});
client.hgetall('person', function(err, result){
    if(err) console.log(err);
    else console.log(result);
});

//storing lists
client.lpush(['frameworks_arr', 'angularjs', 'reactjs', 'nodejs'], function(err, reply) {
    console.log(reply); //prints 2
});
client.lrange('frameworks_arr', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});

//storing sets
client.sadd(['tags', 'angularjs', 'reactjs', 'nodejs'], function(err, reply) {
    console.log(reply); // 3
});
client.smembers('tags', function(err, reply) {
    console.log(reply);
});

//checking the existence of keys
client.exists('tags', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

//deleting keys
client.del('frameworks_arr', function(err, reply) {
    console.log(reply);
});

//checking existence after deletion
client.exists('frameworks_arr', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

//setting expiration time for particular key
//client.set('key1', 'val1');
//client.expire('key1', 30);

//checking existence after expiration
client.exists('key1', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});