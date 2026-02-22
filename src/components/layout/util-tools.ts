export type UtilTool = {
  id: string;
  href: string;
  labelKey: string;
  summaryKey: string;
  tagKey: string;
};

export const utilTools: UtilTool[] = [
  {
    id: "string-diff",
    href: "/util/string-diff",
    labelKey: "tool.stringDiff.label",
    summaryKey: "tool.stringDiff.summary",
    tagKey: "tool.tag.text",
  },
  {
    id: "json-formatter",
    href: "/util/json-formatter",
    labelKey: "tool.jsonFormatter.label",
    summaryKey: "tool.jsonFormatter.summary",
    tagKey: "tool.tag.json",
  },
  {
    id: "query-decoder",
    href: "/util/query-decoder",
    labelKey: "tool.queryDecoder.label",
    summaryKey: "tool.queryDecoder.summary",
    tagKey: "tool.tag.url",
  },
];
