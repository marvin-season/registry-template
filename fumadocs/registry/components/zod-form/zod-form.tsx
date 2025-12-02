'use client';

import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import type { TComponentMap } from './default-components';
import { ZodField, type ZodFieldProps } from './zod-field';

type ZodSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;

interface ZodFormProps<T extends ZodSchema> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  components?: TComponentMap;
  className?: string;
  fieldClassName?: string;
  children?: React.ReactNode;

  renderFields?: (props: ZodFieldProps) => React.ReactNode;
}

export function ZodForm<T extends ZodSchema>(props: ZodFormProps<T>) {
  const {
    schema,
    onSubmit,
    defaultValues = {},
    className = '',
    components = {},
    fieldClassName = '',
    renderFields,
    children,
  } = props;

  // 使用 Zod v4 内置的 JSON Schema 转换
  const jsonSchema = useMemo(() => z.toJSONSchema(schema), [schema]);
  // 初始化表单数据
  const initialFormData = useMemo(() => {
    const schemaDefaults = extractDefaultValues(jsonSchema);
    return { ...schemaDefaults, ...defaultValues };
  }, [jsonSchema, defaultValues]);

  const [formData, setFormData] = useState<any>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 更新字段值
  const updateField = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const errorHandler = useCallback(
    (args: {
      error: NonNullable<z.ZodSafeParseResult<unknown>['error']>;
      name?: string;
      bypassCallback?: (data: any) => void;
    }) => {
      const { name, error } = args;
      setErrors((prev) => {
        const newErrors = { ...prev };
        console.log('newErrors', newErrors);
        error.issues.forEach((issue) => {
          const path = name || issue.path.join('.');
          newErrors[path] = issue.message;
        });
        console.log('newErrors', newErrors);
        return newErrors;
      });
    },
    [],
  );

  const validateField = async (name: string, value: any) => {
    const fieldSchema = schema.shape[name as keyof typeof schema.shape];
    if (!fieldSchema) {
      return true;
    }

    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } else {
      errorHandler({ error: result.error, name });
    }
    return result.success;
  };

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (result.success) {
      setErrors({});
      onSubmit(result.data);
    } else {
      errorHandler({
        error: result.error,
      });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const fields = useMemo(() => {
    return Object.entries(jsonSchema.properties || {});
  }, [jsonSchema]);
  return (
    <form onReset={handleReset} onSubmit={handleSubmit} className={`${className}`}>
      {fields.map(([name, fieldJsonSchema]) => {
        const props = {
          name,
          fieldJsonSchema,
          components,
          value: formData[name],
          error: errors[name],
          onChange: (value) => updateField(name, value),
          isRequired: jsonSchema.required?.includes(name),
          className: fieldClassName,
        };
        return renderFields ? renderFields(props) : <ZodField key={name} {...props} />;
      })}
      {children}
    </form>
  );
}

function extractDefaultValues(jsonSchema: any): Record<string, any> {
  const defaults: Record<string, any> = {};

  if (jsonSchema.properties) {
    for (const [key, field] of Object.entries<any>(jsonSchema.properties)) {
      if (field.default !== undefined) {
        defaults[key] = field.default;
      }
    }
  }
  return defaults;
}
