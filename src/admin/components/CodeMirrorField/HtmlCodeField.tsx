import CodeMirrorField from "./CodeMirrorField";

type HtmlCodeFieldProps = Omit<
  React.ComponentProps<typeof CodeMirrorField>,
  "language"
>;

export default function HtmlCodeField(props: HtmlCodeFieldProps) {
  return <CodeMirrorField {...props} language="html" />;
}
