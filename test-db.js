const { MongoClient, ServerApiVersion } = require('mongodb');

// Updated URI with your credentials and new database name
const uri = "mongodb://9891992544:Mohan%4093777@cluster0-shard-00-00.zkxiqer.mongodb.net:27017,cluster0-shard-00-01.zkxiqer.mongodb.net:27017,cluster0-shard-00-02.zkxiqer.mongodb.net:27017/99acersproperty?ssl=true&replicaSet=atlas-zkxiqe-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Switch to your specific database
    const db = client.db("99acersproperty");
    
    // Send a ping to confirm a successful connection
    await db.command({ ping: 1 });
    console.log("Successfully connected to 99acersproperty database!");

    // Optional: List collections to verify it's working
    const collections = await db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));

  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

run().catch(console.dir);