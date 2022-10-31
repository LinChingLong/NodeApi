const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'learn';

/*
const filter = {
  '_id': '5ce7fe8a2b7234bdb1a4322b8e257b1b'
};
*/
const filter = {};
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('100');
  const db = client.db(dbName);
  console.log('200');
  const collection = db.collection('test');
  console.log('300');
  const cursor = collection.find(filter);
  console.log('400');
  
  const result = await cursor.toArray();
  console.log(result);
  console.log('500');
  
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
