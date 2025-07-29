import clientPromise from "../lib/mymongo";

const MAINDB:string = process.env.MAINDB as string;

// Returns all colleges from the "colleges" collection
export async function getAllColleges() {
  try {
    console.log("Getting all colleges from database: ", MAINDB);
    const client = await clientPromise;
    const db = client.db(MAINDB); // use default db from connection string
    const colleges = await db.collection("colleges").find({}).toArray();
    
    // Convert MongoDB objects to plain JavaScript objects to avoid serialization issues
    const plainColleges = colleges.map(college => ({
      ...college,
      _id: college._id.toString() // Convert ObjectId to string
    }));
    
    return plainColleges;
  } catch (error) {
    console.error('Database connection error:', error);
    // Return empty array if database is not available (e.g., during build)
    return [];
  }
}

// Returns a single college by its ID from the "colleges" collection
export async function getCollegeByID(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(MAINDB);
    // Convert string id to ObjectId
    const { ObjectId } = await import("mongodb");
    const college = await db.collection("colleges").findOne({ _id: new ObjectId(id) });
    if (!college) return null;
    return {
      ...college,
      _id: college._id.toString()
    };
  } catch (error) {
    console.error('Error fetching college by ID:', error);
    return null;
  }
}

