import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "User email not found" }, { status: 400 });
  }

  try {
    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

    if (existingUsers.length === 0) {
      const inserted = await db
        .insert(usersTable)
        .values({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          credits: 10,
        })
        .returning();

      return NextResponse.json(inserted[0]);
    }

    return NextResponse.json(existingUsers[0]);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
