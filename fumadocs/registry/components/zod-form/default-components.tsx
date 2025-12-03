import type { FC, InputHTMLAttributes } from 'react';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface IFieldJSONSchema extends z.core.JSONSchema.BaseSchema {
  component?: string;
  label?: string;
}

export type IFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  type: string; // 不同于 input 的 type，用于组件映射
  error?: string;
  label?: string;
  name: string;
  description?: string;
  options?: string[];
};

export type NativeComponent = React.ComponentType<IFieldProps>;
// ============ 默认组件 ============

export const NativeInput: FC<IFieldProps> = (props) => {
  const { label, required, name, error, value, type: _, ...restProps } = props;

  return (
    <div>
      <label htmlFor={name}>
        {label}: {required && <span>*</span>}
      </label>
      <Input type="text" name={name} value={value ?? ''} {...restProps} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export const NativeRadio: FC<IFieldProps> = (props) => {
  const { label, required, name, error, value, options = [], type: _, ...restProps } = props;
  return (
    <div>
      <label htmlFor={name}>
        {label}: {required && <span>*</span>}
      </label>
      <div className="flex items-center gap-4">
        {options?.map((option) => (
          <div key={option} className="flex items-center gap-1">
            <input
              type="radio"
              id={`${name}_${option}`}
              name={name}
              value={option}
              checked={value === option}
              {...restProps}
            />
            <label htmlFor={`${name}_${option}`}>{option}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export type TComponentType = 'string' | 'checkbox' | 'radio' | 'select';

export type TComponentMap = Record<string, NativeComponent> & Partial<Record<TComponentType, NativeComponent>>;

export function defineComponents(components: TComponentMap) {
  return components;
}

export const defaultComponents = defineComponents({
  // 类型级别的映射
  string: NativeInput,
  radio: NativeRadio,
});

export type ButtonProps = React.ComponentProps<typeof Button>;
export function ZodFormSubmit(props: ButtonProps) {
  return <Button type="submit" {...props} />;
}

export function ZodFormReset(props: ButtonProps) {
  return <Button type="reset" {...props} />;
}

export function ZodFormFooter(props: { className?: string; children: React.ReactNode }) {
  const { className, children } = props;
  return <div className={cn('flex justify-end gap-2', className)}>{children}</div>;
}
