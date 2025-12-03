'use client';

import { z } from 'zod';
import { ZodFormFooter, ZodFormReset, ZodFormSubmit } from './default-components';
import { ZodForm } from './zod-form';

const schema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  email: z.email('请输入有效的邮箱地址').meta({
    type: 'string', // 类型级别的映射
  }),
  gender: z.enum(['male', 'female']).meta({
    type: 'radio',
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
