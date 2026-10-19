import { PROPERTIES } from "@/data/properties";
import PropertyClientWrapper from "./PropertyClientWrapper";

export function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PropertyClientWrapper slug={slug} />;
}
