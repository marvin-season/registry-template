'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { useEffect, useState } from 'react';

const isProduction = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';

const baseURL = isProduction ? '/registry-template' : '';
export function InstallCommand(props: { pkgName: string }) {
  const { pkgName } = props;
  const [domain, setDomain] = useState<string>('');
  const installCommand = `shadcn@latest add "${domain}${baseURL}/r/${pkgName}.json"`;
  const withPNPMCommand = `pnpm dlx ${installCommand}`;
  const withYarnCommand = `yarn ${installCommand}`;
  const withNPMCommand = `npx ${installCommand}`;
  // 安全地获取域名
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.origin);
    }
  }, []);

  if (!domain) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs items={['pnpm', 'yarn', 'npm']}>
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
