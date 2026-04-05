import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const runtime = 'edge'; // Add this to the top of your API files
// Cache responses for 60 seconds to reduce repeated Atlas round-trips
export const revalidate = 60;

// --- 1. GET ALL PROPERTIES ---
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("99acersproperty");
    const collection = db.collection("listings");

    let properties = await collection.find({}).sort({ postedAt: -1 }).toArray();

    if (properties.length === 0) {
      const seedData: any = {
        title: "Sample Property - Sector 13 Rohini",
        price: "12500000",
        location: "Sector 13, Rohini",
        propertyType: "Flat",
        postedAt: new Date().toISOString(),
        propertyId: "PRP-1001",
        description: "Freshly renovated flat near metro station."
      };
      await collection.insertOne(seedData);
      properties = await collection.find({}).toArray();
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
    
    // In App Router, we just await the json. 
    // If it's too large, it might throw an error here.
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: "No data received" }, { status: 400 });
    }

    // Clean and Format Data
    const formattedData = {
      ...body,
      price: body.price ? String(body.price).replace(/,/g, '') : "0",
      postedAt: body.postedAt || new Date().toISOString(),
    };

    const result = await db.collection("listings").insertOne(formattedData);
    
    console.log("✅ Property successfully saved:", result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: "Property Posted Successfully" 
    });
  } catch (e: any) {
    console.error("❌ POST ERROR DETAILS:", e.message);
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
    
    let deleteQuery;
    try {
      // Try deleting by MongoDB ID
      deleteQuery = { _id: new ObjectId(id) };
    } catch {
      // If the ID isn't a valid ObjectId, delete by your custom PRP-XXXX string
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