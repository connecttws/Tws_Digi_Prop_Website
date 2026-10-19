"use client";

import { useRouter } from "next/navigation";
import { RentPage } from "@/views/RentPage";
import { useModal } from "@/context/ModalContext";

export default function Page() {
  const router = useRouter();
  const { openViewing, openQuick3D } = useModal();

  return (
    <RentPage
      onSelectProperty={(slug) => router.push(`/properties/${slug}`)}
      onOpenViewing={(property) => openViewing(property)}
      onOpenConsultation={() => openViewing()}
      onQuickView3D={(property) => openQuick3D(property)}
    />
  );
}
