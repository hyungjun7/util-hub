import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/util/json-formatter-tool";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "JSON 문자열 포맷팅 도구",
};

export default function JsonFormatterPage() {
  return <JsonFormatterTool />;
}
