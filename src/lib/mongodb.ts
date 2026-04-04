import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

// IMPORTANT: These options are the "Secret Sauce" for Rohini/Delhi Internet
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // If the internet is slow, this gives it 10 seconds to find the server
  connectTimeoutMS: 10000, 
  // Keeps the "pipe" open for 45 seconds
  socketTimeoutMS: 45000,
  // FORCES the connection to use IPv4 (fixes 90% of ENOTFOUND errors)
  family: 4 
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent 
  // creating too many connections during "Hot Reload"
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then((connectedClient) => {
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        return connectedClient;
      })
      .catch((err) => {
        console.error("❌ MONGODB CONNECTION ERROR:", err.message);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production mode
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;