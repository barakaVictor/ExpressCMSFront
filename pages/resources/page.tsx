"use client";

import { useSession } from "next-auth/react";

export default function Resources() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      console.log("Not Logged in!");
    },
  });
}
