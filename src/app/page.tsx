"use client";

import { useRouter } from "next/navigation";
import { HomePage } from "@/views/HomePage";
import { useModal } from "@/context/ModalContext";

export default function Page() {
  const router = useRouter();
  const { openViewing } = useModal();

  return (
    <HomePage
      onNavigate={(route) => router.push(route)}
      onOpenViewing={(property) => openViewing(property)}
      onSelectProperty={(slug) => router.push(`/properties/${slug}`)}
    />
  );
}
