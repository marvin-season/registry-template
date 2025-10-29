export interface ChildrenProps<T> {
  children?:
    | React.ReactNode
    | ((props: Omit<T, "children">) => React.ReactNode);
}

export function Children<T extends Record<string, any>>(
  props: ChildrenProps<T> & T,
) {
  const { children, ...restProps } = props;
  if (typeof children === "function") {
    return children(restProps);
  }
  return children;
}
