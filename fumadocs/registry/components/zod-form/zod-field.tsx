import { memo } from 'react';
import type { INativeInputProps } from './default-components';
import { defaultComponents } from './default-components';

export type ZodFieldProps = INativeInputProps & {
  component: string;
};
function ZodField(props: ZodFieldProps) {
  const { name, component, label, description, ...restProps } = props;
  // 根据类型渲染对应的组件
  const FieldComponent = defaultComponents[component];
  return <FieldComponent name={name} label={label || name} description={description} {...restProps} />;
}

export default memo(ZodField, (prevProps, nextProps) => {
  return prevProps.error === nextProps.error && prevProps.value === nextProps.value;
});
