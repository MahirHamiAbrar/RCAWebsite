import { Client, Databases, DatabasesIndexType } from "node-appwrite";
import "dotenv/config";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const apiKey = process.env.APPWRITE_API_KEY!;
const databaseId = process.env.APPWRITE_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || process.env.APPWRITE_COLLECTION_ID || "rca_users";

if (!endpoint || !projectId || !apiKey || !databaseId) {
  console.error("Missing APPWRITE_API_KEY. Please create one with Database permissions from the Appwrite Console and add it to your .env file.");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const db = new Databases(client);

async function setup() {
  console.log(`Setting up Appwrite database for collection: ${collectionId}`);
  
  try {
    try {
      await db.getCollection(databaseId, collectionId);
      console.log("Collection already exists.");
    } catch (e: any) {
      if (e.code === 404) {
        console.log("Creating collection...");
        await db.createCollection(databaseId, collectionId, "RCA Users");
      } else {
        throw e;
      }
    }

    const attributes = [
      () => db.createStringAttribute(databaseId, collectionId, "full_name", 255, true),
      () => db.createStringAttribute(databaseId, collectionId, "email", 255, true),
      () => db.createIntegerAttribute(databaseId, collectionId, "series", true),
      () => db.createStringAttribute(databaseId, collectionId, "department", 255, true),
      () => db.createStringAttribute(databaseId, collectionId, "phone_number", 20, true),
      () => db.createStringAttribute(databaseId, collectionId, "blood_group", 10, false),
      () => db.createStringAttribute(databaseId, collectionId, "membership_type", 50, true),
      () => db.createStringAttribute(databaseId, collectionId, "profile_picture_url", 2000, false),
      () => db.createStringAttribute(databaseId, collectionId, "social_links", 100000, false),
      () => db.createStringAttribute(databaseId, collectionId, "roll_number", 50, false),
      () => db.createIntegerAttribute(databaseId, collectionId, "year_of_graduation", false),
      () => db.createStringAttribute(databaseId, collectionId, "currently_working_at", 255, false),
      () => db.createStringAttribute(databaseId, collectionId, "designation", 255, false),
      () => db.createStringAttribute(databaseId, collectionId, "password_hash", 255, true),
      () => db.createStringAttribute(databaseId, collectionId, "status", 50, false, "pending"),
      () => db.createStringAttribute(databaseId, collectionId, "role", 50, false, "user"),
      () => db.createStringAttribute(databaseId, collectionId, "created_at", 100, false),
      () => db.createStringAttribute(databaseId, collectionId, "updated_at", 100, false),
    ];

    for (const attr of attributes) {
      try {
        await attr();
        console.log("Attribute created successfully");
      } catch (e: any) {
        if (e.code !== 409) console.error("Error creating attribute:", e.message);
      }
    }
    
    console.log("Waiting 3 seconds for attributes to be available...");
    await new Promise(r => setTimeout(r, 3000));

    // 3. Create Indexes
    const indexes = [
      () => db.createIndex(databaseId, collectionId, "idx_email", DatabasesIndexType.Unique, ["email"]),
      () => db.createIndex(databaseId, collectionId, "idx_phone", DatabasesIndexType.Unique, ["phone_number"]),
    ];

    for (const idx of indexes) {
      try {
        await idx();
        console.log("Index created successfully");
      } catch (e: any) {
        if (e.code !== 409) console.error("Error creating index:", e.message);
      }
    }

    console.log("✅ Appwrite setup complete!");
  } catch (error) {
    console.error("Setup failed:", error);
  }
}

setup();
