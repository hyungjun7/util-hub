import type { Metadata } from "next";
import { DiarySpace } from "@/components/diary/diary-space";

export const metadata: Metadata = {
  title: "Diary",
  description: "나만의 일기 공간",
};

export default function DiaryPage() {
  return <DiarySpace />;
}
