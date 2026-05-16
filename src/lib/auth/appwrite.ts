import { Client, TablesDB, Query, ID } from "node-appwrite";
import { AuthUserRecord } from "@/types/auth";

function getAppwriteClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    throw new Error(
      "Appwrite credentials not configured. NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID are required."
    );
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  if (process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
  }

  return client;
}

function getTablesDB() {
  return new TablesDB(getAppwriteClient());
}

const dbId = process.env.APPWRITE_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || process.env.APPWRITE_COLLECTION_ID || "rca_users";

function mapAppwriteUserToAuthRecord(appwriteUser: any): AuthUserRecord {
  return {
    id: appwriteUser.$id,
    fullName: appwriteUser.full_name,
    email: appwriteUser.email,
    series: appwriteUser.series,
    department: appwriteUser.department,
    phoneNumber: appwriteUser.phone_number,
    bloodGroup: appwriteUser.blood_group,
    membershipType: appwriteUser.membership_type,
    profilePictureUrl: appwriteUser.profile_picture_url,
    socialLinks: typeof appwriteUser.social_links === 'string' ? JSON.parse(appwriteUser.social_links) : (appwriteUser.social_links || []),
    rollNumber: appwriteUser.roll_number,
    yearOfGraduation: appwriteUser.year_of_graduation,
    currentlyWorkingAt: appwriteUser.currently_working_at,
    designation: appwriteUser.designation,
    status: appwriteUser.status || "pending",
    role: appwriteUser.role || "user",
    passwordHash: appwriteUser.password_hash,
    createdAt: appwriteUser.created_at || appwriteUser.$createdAt,
    updatedAt: appwriteUser.updated_at || appwriteUser.$updatedAt,
  };
}

export async function verifyDatabaseConnection() {
  try {
    const db = getTablesDB();
    await db.listRows({
        databaseId: dbId,
        tableId: collectionId,
        queries: [Query.limit(1)]
    });
    return true;
  } catch (error) {
    console.error("❌ Appwrite health check failed:", error);
    throw error;
  }
}

export async function upsertUser(user: AuthUserRecord) {
  const db = getTablesDB();
  
  let exists = false;
  try {
    await db.getRow({
        databaseId: dbId,
        tableId: collectionId,
        rowId: user.id
    });
    exists = true;
  } catch (e: any) {
    // 404 means it doesn't exist
    if (e.code !== 404) {
      throw e;
    }
  }

  const data = {
    full_name: user.fullName,
    email: user.email,
    series: user.series,
    department: user.department,
    phone_number: user.phoneNumber,
    blood_group: user.bloodGroup,
    membership_type: user.membershipType,
    profile_picture_url: user.profilePictureUrl,
    social_links: JSON.stringify(user.socialLinks || []),
    roll_number: user.rollNumber,
    year_of_graduation: user.yearOfGraduation,
    currently_working_at: user.currentlyWorkingAt,
    designation: user.designation,
    status: user.status,
    role: user.role,
    password_hash: user.passwordHash,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };

  if (exists) {
    await db.updateRow({
        databaseId: dbId,
        tableId: collectionId,
        rowId: user.id,
        data
    });
  } else {
    // we use ID.custom(user.id) but in TablesDB params we just pass string
    await db.createRow({
        databaseId: dbId,
        tableId: collectionId,
        rowId: user.id,
        data
    });
  }
}

export async function getUserById(userId: string): Promise<AuthUserRecord | null> {
  const db = getTablesDB();
  try {
    const data = await db.getRow({ databaseId: dbId, tableId: collectionId, rowId: userId });
    return mapAppwriteUserToAuthRecord(data);
  } catch (error: any) {
    if (error.code === 404) return null;
    throw new Error(`Failed to fetch user from Appwrite: ${error.message}`);
  }
}

export async function getUserByEmail(email: string): Promise<AuthUserRecord | null> {
  const db = getTablesDB();
  const results = await db.listRows({
      databaseId: dbId,
      tableId: collectionId,
      queries: [Query.equal("email", email.toLowerCase()), Query.limit(1)]
  });

  if (results.rows.length === 0) return null;
  return mapAppwriteUserToAuthRecord(results.rows[0]);
}

export async function getUserByPhone(phone: string): Promise<AuthUserRecord | null> {
  const db = getTablesDB();
  const results = await db.listRows({
      databaseId: dbId,
      tableId: collectionId,
      queries: [Query.equal("phone_number", phone), Query.limit(1)]
  });

  if (results.rows.length === 0) return null;
  return mapAppwriteUserToAuthRecord(results.rows[0]);
}

export async function getAllUsers(): Promise<AuthUserRecord[]> {
  const db = getTablesDB();
  const results = await db.listRows({
      databaseId: dbId,
      tableId: collectionId
  });
  return results.rows.map(mapAppwriteUserToAuthRecord);
}

export async function deleteUser(userId: string): Promise<void> {
  const db = getTablesDB();
  await db.deleteRow({
    databaseId: dbId,
    tableId: collectionId,
    rowId: userId
  });
}
