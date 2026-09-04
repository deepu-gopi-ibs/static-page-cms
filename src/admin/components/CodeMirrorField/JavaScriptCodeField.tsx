import CodeMirrorField from "./CodeMirrorField";

type JavaScriptCodeFieldProps = Omit<
  React.ComponentProps<typeof CodeMirrorField>,
  "language"
>;

export default function JavaScriptCodeField(
  props: JavaScriptCodeFieldProps
) {
  return <CodeMirrorField {...props} language="javascript" />;
}
