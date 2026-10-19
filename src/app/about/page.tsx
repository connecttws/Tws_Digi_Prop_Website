"use client";

import { useRouter } from "next/navigation";
import { AboutPage } from "@/views/AboutPage";
import { useModal } from "@/context/ModalContext";

export default function Page() {
  const router = useRouter();
  const { openViewing } = useModal();

  return (
    <AboutPage
      onNavigate={(route) => router.push(route)}
      onOpenConsultation={() => openViewing()}
    />
  );
}
