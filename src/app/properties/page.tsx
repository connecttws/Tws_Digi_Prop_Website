"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertiesPage } from "@/views/PropertiesPage";
import { useModal } from "@/context/ModalContext";

function PropertiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openQuick3D } = useModal();

  const lifestyleParam = searchParams.get("lifestyle");
  const statusParam = searchParams.get("status");

  return (
    <PropertiesPage
      onSelectProperty={(slug) => router.push(`/properties/${slug}`)}
      onQuickView3D={(property) => openQuick3D(property)}
      initialLifestyle={lifestyleParam}
      initialStatus={statusParam === "for-sale" || statusParam === "for-rent" ? statusParam : "all"}
    />
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-24 text-center">
          <div className="w-8 h-8 mx-auto border-2 border-[#B79A69]/30 border-t-[#B79A69] rounded-full animate-spin" />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
