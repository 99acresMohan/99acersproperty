import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// NEXT.JS CONFIG: This allows larger property photos (up to 10MB)
// If this is not set, Next.js will block your POST request if you attach a photo.
export const dynamic = 'force-dynamic';

// --- 1. GET ALL PROPERTIES ---
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("99acersproperty");
    const collection = db.collection("listings");

    // Fetch and sort by newest first
    let properties = await collection.find({}).sort({ postedAt: -1 }).toArray();

    // Safety Seed: If DB is empty, create one entry so the home page isn't blank
    if (properties.length === 0) {
      const seedData = {
        title: "Sample Property - Sector 13 Rohini",
        price: "12500000",
        location: "Sector 13, Rohini",
        propertyType: "Flat",
        postedAt: new Date().toISOString(),
        propertyId: "PRP-1001",
        description: "Freshly renovated flat near metro station."
      };
      const insertResult = await collection.insertOne(seedData);
      properties = [{ _id: insertResult.insertedId, ...seedData }] as any;
    }

    return NextResponse.json(properties);
  } catch (e: any) {
    console.error("GET ERROR:", e.message);
    return NextResponse.json({ error: 'Fetch failed', details: e.message }, { status: 500 });
  }
}

// --- 2. POST NEW PROPERTY ---
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("99acersproperty");
    
    // Read the incoming form data
    const body = await request.json();

    // Clean and Format Data
    const formattedData = {
      ...body,
      // Convert price/area to numbers for better searching later
      price: body.price ? String(body.price).replace(/,/g, '') : "0",
      postedAt: body.postedAt || new Date().toISOString(),
    };

    const result = await db.collection("listings").insertOne(formattedData);
    
    console.log("Property successfully saved to MongoDB:", result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: "Property Posted Successfully" 
    });
  } catch (e: any) {
    // This will show exactly why it failed in your VS Code Terminal
    console.error("POST ERROR DETAILS:", e.message);
    return NextResponse.json({ 
      error: 'Post failed', 
      details: e.message 
    }, { status: 500 });
  }
}

// --- 3. DELETE PROPERTY ---
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("99acersproperty");
    
    // Safety check: Try to delete by MongoDB _id first, then by your custom propertyId
    let deleteQuery;
    try {
      deleteQuery = { _id: new ObjectId(id) };
    } catch {
      deleteQuery = { propertyId: id };
    }

    const result = await db.collection("listings").deleteOne(deleteQuery);

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
  } catch (e: any) {
    console.error("DELETE ERROR:", e.message);
    return NextResponse.json({ error: 'Delete failed', details: e.message }, { status: 500 });
  }
}