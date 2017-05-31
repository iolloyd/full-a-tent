var contentful = require('contentful');
var config = require('./config');
var contentMap = require('./content_type_mapping');

var client = contentful.createClient(config);

const get = async (contentType, slug) => {
  contentTypeId = contentMap[contentType];
  try {
    var doc = await client.getEntries({ content_type: contentTypeId, "fields.slug": slug, include: 10 });
    return doc;
  } catch(err) { 
    // console.log('oops: ' + contentType + ' > ' + slug);
  };
}

const startTimer = () => {
  return new Date().getTime();
};

const logTimer = (startTime) => {
  return (new Date().getTime() - startTime);
};

const showResult = async ({type, slug}) => {
  const start = startTimer();
  const result = await get(type, slug);
  const timed = logTimer(start);
  console.log(type + ' > ' + slug, timed);
};

const pages = [
  {'type': 'feed', 'slug': 'emotions-energetic-films'},
  {'type': 'feed', 'slug': 'episodes-module-minidocs'},
  {'type': 'feed', 'slug': 'fashion-week'},
  {'type': 'hero', 'slug': 'home-page'},
  {'type': 'hero', 'slug': 'series-minidocs'}
];

pages.map(showResult);

