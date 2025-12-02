'use client';

import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapInlinePlaceholder from '.';
import { deserialize, serialize } from './utils';

export default function Demo() {
  const editor = useEditor({
    immediatelyRender: false,
    content: deserialize('我是{{宫本武藏}},我的爱好是{{爱好:吃饭#睡觉#打豆豆}}。'),
    extensions: [StarterKit, TipTapInlinePlaceholder],
  });
  const handelSave = async (editor: Editor) => {
    const value = serialize(editor.getJSON());
    alert(value);
  };

  return (
    <>
      <EditorContent editor={editor} className="w-full h-full" />
      <div
        onClick={async () => {
          handelSave(editor!);
        }}
      >
        Send
      </div>
    </>
  );
}
