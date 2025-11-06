import { type FC, type InputHTMLAttributes, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
export type TFieldJSONSchema = {
  component?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  type?: string;
  [key: string]: any;
};

export type INativeInputProps<T> = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'disabled' | 'required' | 'className'
> & {
  onChange?: (value: T) => void;
  onValidate?: (name: string, value: T) => Promise<boolean>;
  readonly value?: T;
  error?: string;
  label?: string;
  name: string;
  description?: string;
  options?: T[];
  isRequired?: boolean;
  fieldJsonSchema?: any;
};

export type NativeComponent<T> = React.ComponentType<INativeInputProps<T>>;
// ============ 默认组件 ============

export const NativeInput: FC<INativeInputProps<string | number>> = ({
  value,
  onChange,
  name,
  fieldJsonSchema,
  onValidate,
  isRequired,
  error,
}) => {
  const isNumberInput = useMemo(() => fieldJsonSchema.type === 'number', [fieldJsonSchema.type]);

  const label: string = fieldJsonSchema.label || name;

  return (
    <div>
      <label htmlFor={name}>
        {label}: {isRequired && <span>*</span>}
      </label>
      <Input
        type={isNumberInput ? 'number' : 'text'}
        name={name}
        value={value ?? ''}
        onChange={(e) => {
          const newValue = isNumberInput ? Number(e.target.value) : e.target.value;
          onChange?.(newValue);
          onValidate?.(name, newValue);
        }}
        className="native-input"
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export type TComponentType = 'string' | 'checkbox' | 'radio' | 'select';

export type TComponentMap<T = any> = Record<string, NativeComponent<T>> &
  Partial<Record<TComponentType, NativeComponent<T>>>;

export function defineComponents<T extends TComponentMap>(components: T) {
  return components as T;
}

export const defaultComponents = defineComponents({
  // 类型级别的映射
  string: NativeInput,
  number: NativeInput,
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
