import type { Metadata } from "next";
import { QueryStringDecoderTool } from "@/components/util/query-string-decoder-tool";

export const metadata: Metadata = {
  title: "Query Decoder",
  description: "쿼리스트링 디코더",
};

export default function QueryDecoderPage() {
  return <QueryStringDecoderTool />;
}
