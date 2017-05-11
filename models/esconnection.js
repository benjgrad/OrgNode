var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
    hosts: [
        'localhost:9200',
    ]
});

module.exports = client;