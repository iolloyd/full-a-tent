import {createClient} from 'contentful';
import config from './config/config';
import contentMap from './config/content_type_mapping';
const client = createClient(config);

const get = async (contentType, slug) => {
  const contentTypeId = contentMap[contentType];
  try {
    const doc = await client.getEntries({content_type: contentTypeId, "fields.slug": slug, include: 10});
    return doc;
  } catch(err) { 
    console.log('oops: ' + contentType + ' > ' + slug);
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
  console.log(Object.keys(result).keys());
  console.log(result.items);
};

const pages = [
  {'type': 'page', 'slug': 'test'},
  {'type': 'feed', 'slug': 'emotions-energetic-films'},
  {'type': 'feed', 'slug': 'episodes-module-minidocs'},
  {'type': 'feed', 'slug': 'fashion-week'},
  {'type': 'feed', 'slug': 'home-feed'},
  {'type': 'hero', 'slug': 'home-page'},
  {'type': 'hero', 'slug': 'series-minidocs'}
];

pages.map(showResult);

