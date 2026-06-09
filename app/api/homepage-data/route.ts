import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "homepage.json");

// Helper to check passcode
function verifyPasscode(req: Request) {
  const authHeader = req.headers.get("authorization");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "admin123";
  
  if (!authHeader) return false;
  
  // Format can be "Bearer passcode" or just "passcode"
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  return token === expectedPasscode;
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error reading homepage data:", error);
    // If file does not exist, return a generic error or attempt to load defaults
    return NextResponse.json(
      { error: "Failed to read homepage data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyPasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Simple verification that we got valid data structure
    if (!body.hero || !body.roles || !body.projects || !body.logos || !body.footer) {
      return NextResponse.json(
        { error: "Invalid data structure" },
        { status: 400 }
      );
    }

    // Write file back to disk
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Data saved successfully" });
  } catch (error: any) {
    console.error("Error saving homepage data:", error);
    return NextResponse.json(
      { error: "Failed to save homepage data: " + error.message },
      { status: 500 }
    );
  }
}
