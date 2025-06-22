"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/cellular-automata/game-of-life");
  }, [router]);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
