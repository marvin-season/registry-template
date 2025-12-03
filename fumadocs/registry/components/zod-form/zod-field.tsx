import { memo } from 'react';
import type { IFieldProps } from './default-components';
import { defaultComponents } from './default-components';

function ZodField(props: IFieldProps) {
  const { name, type, label, description, ...restProps } = props;
  // 根据类型渲染对应的组件
  const FieldComponent = defaultComponents[type];
  if (!FieldComponent) return <p className="text-red-500">{type} not found</p>;
  return <FieldComponent name={name} type={type} label={label || name} description={description} {...restProps} />;
}

export default memo(ZodField, (prevProps, nextProps) => {
  return prevProps.error === nextProps.error && prevProps.value === nextProps.value;
});
