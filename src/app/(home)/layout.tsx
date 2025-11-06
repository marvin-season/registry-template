import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'main',
          on: 'nav',
          text: 'Docs',
          url: '/docs',
        },
        {
          type: 'main',
          on: 'nav',
          text: 'Blog',
          url: '/blog',
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
