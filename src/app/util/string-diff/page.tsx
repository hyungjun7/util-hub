import type { Metadata } from "next";
import { StringDiffTool } from "@/components/util/string-diff-tool";

export const metadata: Metadata = {
  title: "String Diff",
  description: "문자열 diff 비교 도구",
};

export default function StringDiffPage() {
  return <StringDiffTool />;
}
