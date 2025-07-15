import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "Unauthorized or missing email address" },
      { status: 401 }
    );
  }

  const email = user.primaryEmailAddress.emailAddress;

  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name: user.fullName ?? "",
          email: email,
          credits: 10,
        })
        .returning();

      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}


