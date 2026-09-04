import CodeMirrorField from "./CodeMirrorField";

type CssCodeFieldProps = Omit<
  React.ComponentProps<typeof CodeMirrorField>,
  "language"
>;

export default function CssCodeField(props: CssCodeFieldProps) {
  return <CodeMirrorField {...props} language="css" />;
}
