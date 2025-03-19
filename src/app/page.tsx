'use client';
import { Basic } from "@components";
import { useCommonStore } from "@store";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isOpen = useCommonStore((s) => s.isOpen)
  return (
    <>
      <Basic />
    </>
  );
}
