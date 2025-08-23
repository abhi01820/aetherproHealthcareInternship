import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user || !user.primaryEmailAddress || !user.fullName) {
    return NextResponse.json({ error: "User not authenticated or missing data" }, { status: 401 });
  }

  const email = user.primaryEmailAddress.emailAddress;
  const name = user.fullName;

  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name,
          email,
          credits: 10,
        })
        .returning();

      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error", details: e }, { status: 500 });
  }
}
