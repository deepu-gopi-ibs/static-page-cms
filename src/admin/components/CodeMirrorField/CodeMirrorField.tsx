import { useEffect, useMemo, useRef } from "react";
import { Field } from "@strapi/design-system";
import { EditorView, basicSetup } from "codemirror";
import { Compartment, EditorState } from "@codemirror/state";
import { css as cssLanguage } from "@codemirror/lang-css";
import { html as htmlLanguage } from "@codemirror/lang-html";
import { javascript as javascriptLanguage } from "@codemirror/lang-javascript";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import type { MessageDescriptor } from "react-intl";

type CodeLanguage = "html" | "css" | "javascript";

type CodeMirrorFieldProps = {
  name: string;
  disabled?: boolean;
  labelAction?: React.ReactNode;
  hint?: React.ReactNode;
  description?: MessageDescriptor;
  error?: string;
  intlLabel?: MessageDescriptor;
  language: CodeLanguage;
};

function getLanguageExtension(language: CodeLanguage) {
  if (language === "html") {
    return htmlLanguage();
  }

  if (language === "css") {
    return cssLanguage();
  }

  return javascriptLanguage();
}

const codeHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#ff7ab8" },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName], color: "#9cdcfe" },
  { tag: [tags.function(tags.variableName), tags.labelName], color: "#dcdcaa" },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: "#4fc1ff" },
  { tag: [tags.definition(tags.name), tags.separator], color: "#c586c0" },
  { tag: [tags.className], color: "#4ec9b0" },
  { tag: [tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace], color: "#b5cea8" },
  { tag: [tags.typeName], color: "#4ec9b0" },
  { tag: [tags.operator, tags.operatorKeyword], color: "#d4d4d4" },
  { tag: [tags.url, tags.escape, tags.regexp, tags.link], color: "#d16969" },
  { tag: [tags.meta, tags.comment], color: "#6a9955" },
  { tag: tags.strong, fontWeight: "700" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.heading, fontWeight: "700", color: "#4fc1ff" },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: "#569cd6" },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: "#ce9178" },
  { tag: tags.invalid, color: "#ffffff", backgroundColor: "#f44747" },
]);

const editorTheme = EditorView.theme(
  {
    "&": {
      width: "100%",
      minHeight: "400px",
      height: "100%",
      color: "#d4d4d4",
      backgroundColor: "#0f1724",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      fontSize: "14px",
      lineHeight: "1.6",
    },
    ".cm-scroller": {
      width: "100%",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      padding: "16px 0",
    },
    ".cm-gutters": {
      backgroundColor: "#0b1220",
      color: "#7f8ea3",
      border: "none",
      paddingRight: "10px",
    },
    ".cm-gutterElement": {
      padding: "0 14px 0 12px",
    },
    ".cm-content": {
      width: "100%",
      padding: "0 16px",
      caretColor: "#f8f8f2",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#f8f8f2",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(148, 163, 184, 0.12)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(148, 163, 184, 0.16)",
      color: "#d4d4d4",
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(99, 102, 241, 0.32)",
    },
    "&.cm-focused": {
      outline: "none",
    },
  },
  { dark: true }
);

export default function CodeMirrorField({
  name,
  disabled,
  labelAction,
  hint,
  description,
  error,
  intlLabel,
  language,
}: CodeMirrorFieldProps) {
  const { formatMessage } = useIntl();
  const { onChange, value } = useField<string>(name);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const languageCompartment = useMemo(() => new Compartment(), []);
  const editableCompartment = useMemo(() => new Compartment(), []);

  const label = intlLabel ? formatMessage(intlLabel) : name;

  const resolvedHint =
    typeof hint === "string"
      ? hint
      : description
        ? formatMessage(description)
        : hint;

  useEffect(() => {
    if (!mountRef.current || viewRef.current) {
      return;
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: value ?? "",
        extensions: [
          basicSetup,
          syntaxHighlighting(codeHighlightStyle),
          editorTheme,
          EditorView.lineWrapping,
          languageCompartment.of(getLanguageExtension(language)),
          editableCompartment.of(EditorView.editable.of(!disabled)),
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) {
              return;
            }

            const nextValue = update.state.doc.toString();
            onChange(name, nextValue);
          }),
        ],
      }),
      parent: mountRef.current,
    });

    view.dom.style.width = "100%";
    view.scrollDOM.style.width = "100%";

    const observer = new ResizeObserver(() => {
      view.requestMeasure();
    });
    observer.observe(mountRef.current);

    viewRef.current = view;

    return () => {
      observer.disconnect();
      view.destroy();
      viewRef.current = null;
    };
  }, [
    disabled,
    editableCompartment,
    language,
    languageCompartment,
    name,
    onChange,
    value,
  ]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }

    view.dispatch({
      effects: editableCompartment.reconfigure(
        EditorView.editable.of(!disabled)
      ),
    });
  }, [disabled, editableCompartment]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }

    const currentValue = view.state.doc.toString();
    const nextValue = value ?? "";

    if (currentValue === nextValue) {
      return;
    }

    view.dispatch({
      changes: {
        from: 0,
        to: currentValue.length,
        insert: nextValue,
      },
    });
  }, [value]);

  return (
    <Field.Root name={name} id={name} hint={resolvedHint} error={error}>
      <Field.Label action={labelAction}>
        {label}
      </Field.Label>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          minHeight: "400px",
          border: "1px solid #2a3548",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#0f1724",
          boxShadow: "0 6px 18px rgba(15, 23, 36, 0.18)",
        }}
      />
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
}
