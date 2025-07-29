import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // your mongodb connection string
const options = {
  family: 4,
  connectTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
  maxIdleTimeMS: 60000,
};

let client: MongoClient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clientPromise: Promise<MongoClient>;

let attempt = 1;
const retries = 2;

declare global {
  var _mongoClientPromise2: Promise<MongoClient>;
}
 
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// Initialize clientPromise with a default value
client = new MongoClient(uri, options);
clientPromise = client.connect();

try {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise2) {
      global._mongoClientPromise2 = clientPromise;
    }
    clientPromise = global._mongoClientPromise2;
  } else {
    // In production mode, it's best to not use a global variable.
    // clientPromise is already set above
  }
} catch (error) {
  console.log(`connection error\n`, error);
  console.log(`Trying again...`);

  if (attempt < retries) {
    attempt += 1;
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log(`Successfully connected after ${attempt} ${attempt > 1 ? 'attempts' : 'attempt'}`);
  }
}


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;