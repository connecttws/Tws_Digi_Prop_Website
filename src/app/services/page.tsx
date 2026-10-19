"use client";

import { useRouter } from "next/navigation";
import { ServicesPage } from "@/views/ServicesPage";
import { useModal } from "@/context/ModalContext";

export default function Page() {
  const router = useRouter();
  const { openViewing } = useModal();

  return (
    <ServicesPage
      onNavigate={(route) => router.push(route)}
      onOpenConsultation={() => openViewing()}
    />
  );
}
