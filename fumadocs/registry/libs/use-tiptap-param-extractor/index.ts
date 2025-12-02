import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { EXTENSION_NAME } from './utils';
import View from './view';

declare module '@tiptap/core' {
  interface Commands {
    inlinePlaceholder: any;
  }
}

interface InlinePlaceholderAttributes {
  placeholder: string;
  value: string;
  type: 'input' | 'select';

  options?: string[];
  HTMLAttributes?: Record<string, any>;
}

const TipTapInlinePlaceholder = Node.create<InlinePlaceholderAttributes>({
  name: EXTENSION_NAME,

  group: 'inline',

  inline: true,

  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {
        class: EXTENSION_NAME,
      },
      placeholder: '请输入内容',
      type: 'input',
      value: '',
    };
  },

  addAttributes() {
    return {
      placeholder: {
        default: '',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-placeholder') || '',
        renderHTML: (attributes: InlinePlaceholderAttributes) => {
          return {
            'data-placeholder': attributes.placeholder,
          };
        },
      },
      type: {},
      options: {
        rendered: false,
      },
      value: {
        default: '',
        rendered: false,
        // 从 html 中解析 为 prosemirror 中的 state
        parseHTML: (element: HTMLElement) => element.getAttribute('data-value') || '',
        renderHTML: (attributes: InlinePlaceholderAttributes) => {
          return {
            'data-value': attributes.value,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type=${this.name}]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes, node: _ }) {
    const attrs = mergeAttributes(this.options.HTMLAttributes || {}, HTMLAttributes);
    return ['span', attrs];
  },
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});

export default TipTapInlinePlaceholder;
