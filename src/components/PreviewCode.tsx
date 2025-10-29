import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { globSync } from "glob";
import { readFileSync } from "node:fs";
import { useMemo } from "react";
export function PreviewCode(props: {
  pkgName: string;
  children: React.ReactNode;
}) {
  const { pkgName, children } = props;

  const files = globSync(
    `${process.cwd()}/registry/{hooks,new-york,components,utils}/**/${pkgName}/*.{ts,tsx}`,
  );

  const codes = useMemo(() => {
    return files.map((file) => {
      const code = readFileSync(file, "utf-8");
      return {
        title: file.split("/").pop()!,
        ext: file.split(".").pop() || "tsx",
        code,
      };
    });
  }, [files]);

  const codeTitles = useMemo(() => {
    return codes.map((code) => code.title);
  }, [codes]);

  const sourceCodeTabs = useMemo(() => {
    if (codes.length === 0) {
      return <div>No source code found</div>;
    }
    return (
      <Tabs items={codeTitles}>
        {codes.map((code) => {
          return (
            <Tab key={code.title}>
              <DynamicCodeBlock lang="tsx" code={code.code} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }, [codes, codeTitles]);

  return (
    <Tabs items={["Preview", "Source Code"]}>
      <Tab>{children}</Tab>
      <Tab className="p-0">{sourceCodeTabs}</Tab>
    </Tabs>
  );
}
