"use client";

import * as runtime from "react/jsx-runtime";

// Velite가 컴파일한 MDX 코드를 평가하여 컴포넌트로 반환
function useMDXComponent(code: string) {
  const fn = new Function(code);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fn({ ...runtime }).default as React.ComponentType<any>;
}

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component />;
}
