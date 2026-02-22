import type { Metadata } from "next";
import { UtilIndex } from "@/components/util/util-index";

export const metadata: Metadata = {
  title: "Util",
  description: "유틸리티 도구 모음",
};

export default function UtilPage() {
  return <UtilIndex />;
}
