"use client";

import { useRouter } from "next/navigation";
import { BuyPage } from "@/views/BuyPage";
import { useModal } from "@/context/ModalContext";

export default function Page() {
  const router = useRouter();
  const { openViewing, openQuick3D } = useModal();

  return (
    <BuyPage
      onSelectProperty={(slug) => router.push(`/properties/${slug}`)}
      onOpenViewing={(property) => openViewing(property)}
      onOpenConsultation={() => openViewing()}
      onQuickView3D={(property) => openQuick3D(property)}
    />
  );
}
