"use client";

import type { ReactElement } from "react";
import * as runtime from "react/jsx-runtime";

type MDXModule = {
  default: () => ReactElement;
};

function getMDXComponent(code: string) {
  const evaluate = new Function(code) as (jsxRuntime: typeof runtime) => MDXModule;
  return evaluate({ ...runtime }).default;
}

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const render = getMDXComponent(code);
  return render();
}
