import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
export function InstallCommand(props: { pkgName: string }) {
  const { pkgName } = props;
  const installCommand = `shadcn@latest add "https://marvin-season.github.io/registry-template/r/${pkgName}.json"`;
  const withPNPMCommand = `pnpm dlx ${installCommand}`;
  const withYarnCommand = `yarn add ${installCommand}`;
  const withNPMCommand = `npm install ${installCommand}`;

  return (
    <Tabs items={["pnpm", "yarn", "npm"]}>
      <Tab>
        <DynamicCodeBlock lang="bash" code={withPNPMCommand} />
      </Tab>
      <Tab>
        <DynamicCodeBlock lang="bash" code={withYarnCommand} />
      </Tab>
      <Tab>
        <DynamicCodeBlock lang="bash" code={withNPMCommand} />
      </Tab>
    </Tabs>
  );
}
