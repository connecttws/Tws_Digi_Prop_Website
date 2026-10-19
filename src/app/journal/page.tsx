"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { JournalPage } from "@/views/JournalPage";

function JournalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleParam = searchParams.get("article");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(articleParam);

  useEffect(() => {
    setSelectedArticle(articleParam);
  }, [articleParam]);

  const handleSelectArticle = (slug: string | null) => {
    setSelectedArticle(slug);
    if (slug) {
      router.push(`/journal?article=${slug}`);
    } else {
      router.push(`/journal`);
    }
  };

  return (
    <JournalPage
      selectedArticleSlug={selectedArticle}
      onSelectArticle={handleSelectArticle}
      onNavigate={(route) => router.push(route)}
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
      <JournalContent />
    </Suspense>
  );
}
