var contentful = require('contentful');
var config = require('./config');
var contentMap = require('./content_type_mapping');

var client = contentful.createClient(config);

function get(contentType, slug) {
  contentTypeId = contentMap[contentType];
  var doc = client.getEntries({
    content_type: contentTypeId, 
    "fields.slug": slug, 
    include: 10
  }).catch(function (err) {
    console.log(err);
  });
  return doc;
}

var ids = {
  'hero': [
    'home-page',
    'series-minidocs'
  ],
  'external': [
    'home-page-external-links'
  ],
  'collections': [
    'emotions-landing-module-energetic-runway'
  ]
};

// Hero pages
get('hero', 'home-page').then(function(stuff) {
  console.log(stuff.items[0]);
});
