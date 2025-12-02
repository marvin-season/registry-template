import type { INativeInputProps, TFieldJSONSchema } from './default-components';
import { defaultComponents, type TComponentMap } from './default-components';

export type ZodFieldProps<T = string> = INativeInputProps<T> & {
  components: TComponentMap;
  isRequired?: boolean;
  name: string;
  onChange: (value: T) => void;
  className?: string;
};

export function ZodField({ name, fieldJsonSchema, components, isRequired, value, error, onChange }: ZodFieldProps) {
  // 根据类型渲染对应的组件
  const { component: FieldComponent } = extractComponent({
    fieldJsonSchema,
    components,
  });

  if (!FieldComponent) return null;

  const { label, description } = fieldJsonSchema;

  return (
    <FieldComponent
      name={name}
      label={label || name}
      description={description}
      value={value}
      error={error}
      isRequired={isRequired}
      onChange={onChange}
      fieldJsonSchema={fieldJsonSchema}
    />
  );
}

type ExtractComponentParams<T> = (params: { fieldJsonSchema: TFieldJSONSchema; components: T }) => {
  component: T[keyof T];
};

const extractComponent: ExtractComponentParams<TComponentMap> = (params) => {
  const { fieldJsonSchema } = params;

  const components = Object.assign(defaultComponents, params.components);

  const component = fieldJsonSchema.component || fieldJsonSchema.type;

  if (component && components[component]) {
    return { component: components[component] };
  }

  return {
    component: () => (
      <div>
        <mark>
          Unsupported type: <strong>{component}</strong>, Please use
          <strong> defineComponents</strong> to define a custom component.
        </mark>
      </div>
    ),
  };
};
