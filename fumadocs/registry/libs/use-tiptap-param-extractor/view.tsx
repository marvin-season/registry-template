import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';

const caculteWidth = (value: string) => {
  // 如果是英文的话，一个字符占用 0.5rem，中文占用 1rem
  // 英文的个数
  const englishCount = value.replace(/[\u4e00-\u9fa5@#]/g, '').length;
  // 中文的个数
  const chineseCount = value.length - englishCount;
  return englishCount * 0.5 + chineseCount * 1.0;
};

let timer: number | null = null;
const View = ({ node, updateAttributes }: NodeViewProps) => {
  const { type, value, options, placeholder } = node.attrs;

  // 当输入变化时更新 value 属性
  const handleInput = (e: React.FormEvent) => {
    const inputElement = e.target as HTMLInputElement;
    const newValue = inputElement.value || '';
    timer && clearTimeout(timer);
    timer = window.setTimeout(() => {
      updateAttributes({ value: newValue });
    }, 50);
  };

  const count = caculteWidth(value ? value : placeholder);

  return (
    <NodeViewWrapper as="span">
      {type === 'input' && (
        <input
          style={{ width: `${count}rem` }}
          className={`inline-block outline-none border-b border-blue-500 mx-2 box-border text-gray-500 transition-all`}
          contentEditable={false}
          onInput={handleInput}
          placeholder={placeholder}
          defaultValue={value}
        />
      )}
      {type === 'select' && (
        <select
          defaultValue={value}
          onInput={handleInput}
          className="inline-block outline-none border-b border-blue-500 mx-2 box-border text-gray-500"
        >
          {options.map((option: string, index: number) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      )}
    </NodeViewWrapper>
  );
};

export default View;
