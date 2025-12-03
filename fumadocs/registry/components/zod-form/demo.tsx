'use client';

import dynamic from 'next/dynamic';
import { z } from 'zod';
import { ZodFormFooter, ZodFormReset, ZodFormSubmit } from './default-components';

const ZodForm = dynamic(() => import('./zod-form').then((mod) => mod.ZodForm), {
  ssr: false,
  loading: () => <div>Loading ZodForm...</div>,
});

const schema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  email: z.email('请输入有效的邮箱地址'),
  gender: z.enum(['male', 'female']).meta({
    type: 'radio', // 类型级别的映射
  }),
});
export default function Demo() {
  return (
    <ZodForm
      schema={schema}
      defaultValues={{ name: 'John Doe', email: 'john.doe@example.com', gender: 'male' }}
      onSubmit={(data) => console.log('data', data)}
    >
      <ZodFormFooter>
        <ZodFormSubmit>Submit</ZodFormSubmit>
        <ZodFormReset variant={'destructive'}>Reset</ZodFormReset>
      </ZodFormFooter>
    </ZodForm>
  );
}
