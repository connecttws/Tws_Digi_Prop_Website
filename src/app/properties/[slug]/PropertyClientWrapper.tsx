"use client";

import { useRouter } from "next/navigation";
import { PropertyDetailPage } from "@/views/PropertyDetailPage";
import { useModal } from "@/context/ModalContext";

export default function PropertyClientWrapper({ slug }: { slug: string }) {
  const router = useRouter();
  const { openViewing } = useModal();

  return (
    <PropertyDetailPage
      slug={slug}
      onNavigate={(route) => router.push(route)}
      onOpenViewing={(property) => openViewing(property)}
      onSelectProperty={(s) => router.push(`/properties/${s}`)}
    />
  );
}
