import { useSandpack } from "@codesandbox/sandpack-react";
export function TestSandpack() {
  const { sandpack } = useSandpack();
  console.log("Sandpack keys:", Object.keys(sandpack));
  return null;
}
