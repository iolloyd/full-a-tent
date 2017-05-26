var contentful = require('contentful');
var config = require('./config');
var contentMap = require('./content_type_mapping');

var client = contentful.createClient(config);

function get(contentType, slug) {
  contentTypeId = contentMap[contentType];
  var doc = client.getEntries({"content_type": contentTypeId, "fields.slug": slug, include: 0});
  return doc;
}

var ids = {
  'hero': [
    'home-page',
    'series-minidocs'
  ]
};

// Hero pages

Object.keys(ids.hero).forEach(function(x) {
  var home = get(x, ids[x]).then(function(stuff) {
    console.log(stuff.items[0].fields);
  }).catch((err) => {
    console.log(err);
  });
})
