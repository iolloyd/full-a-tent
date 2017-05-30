var contentful = require('contentful');
var config = require('./config');
var contentMap = require('./content_type_mapping');

var client = contentful.createClient(config);

async function get(contentType, slug) {
  contentTypeId = contentMap[contentType];
  try {
    var doc = await client.getEntries({ content_type: contentTypeId, "fields.slug": slug, include: 10 });
    return doc;
  } catch(err) { 
    console.log('oops: ' + contentType + ' > ' + slug);
  };
}

var pages = {
  'hero': 'home-page',
  'hero': 'series-minidocs',
  'feed': 'emotions-energetic-films',
  'feed': 'episodes-module-minidocs'
};

const startTimer = () => {
  return new Date().getTime();
};

const logTimer = (startTime) => {
  return (new Date().getTime() - startTime);
};

Object.keys(pages).forEach((x) => {
  const start = startTimer();
  get(x, pages[x]).then(result => {
    console.log();
    console.log(x + '> ' + pages[x], result);
  });
  console.log(logTimer(start));
});

