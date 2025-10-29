import { defaultComponents, type TComponentMap } from "./default-components";
import type { INativeInputProps, TFieldJSONSchema } from "./default-components";

export type ZodFieldProps<T = string> = INativeInputProps<T> & {
  components: TComponentMap;
  isRequired?: boolean;
  name: string;
  updateField: (name: string, value: T) => void;
  className?: string;
  onValidate: (name: string, value: T) => void;
};

export function ZodField({
  name,
  fieldJsonSchema,
  components,
  isRequired,
  value,
  error,
  updateField,
  onValidate,
}: ZodFieldProps) {
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
      onValidate={onValidate}
      onChange={(newValue) => {
        updateField(name, newValue);
      }}
      fieldJsonSchema={fieldJsonSchema}
    />
  );
}

interface ExtractComponentParams<T> {
  (params: { fieldJsonSchema: TFieldJSONSchema; components: T }): {
    component: T[keyof T];
  };
}

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
