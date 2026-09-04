import type { StrapiApp } from "@strapi/strapi/admin";
import type { ComponentType } from "react";
import HtmlCodeField from "./components/CodeMirrorField/HtmlCodeField";
import CssCodeField from "./components/CodeMirrorField/CssCodeField";
import JavaScriptCodeField from "./components/CodeMirrorField/JavaScriptCodeField";

type AdminAppConfig = {
  config?: {
    locales?: string[];
  };
  register?: (app: StrapiApp) => void;
  bootstrap?: (app: StrapiApp) => void;
};

const MUTATE_EDIT_VIEW_LAYOUT_HOOK =
  "Admin/CM/pages/EditView/mutate-edit-view-layout";

const CODE_FIELD_TYPES = {
  html: "codemirror-html",
  css: "codemirror-css",
  javascript: "codemirror-javascript",
} as const;

type EditableField = {
  name?: string;
  type?: string;
  size?: number;
  [key: string]: unknown;
};

type ComponentLayout = {
  layout?: EditableField[][];
  [key: string]: unknown;
};

type EditViewLayout = {
  components?: Record<string, ComponentLayout>;
  [key: string]: unknown;
};

type EditViewHookPayload = {
  layout: EditViewLayout;
  query?: unknown;
};

type FieldOverride = {
  componentUid: string;
  fieldName: string;
  fieldType: string;
};

const FIELD_OVERRIDES: FieldOverride[] = [
  {
    componentUid: "html.raw-html",
    fieldName: "htmlCode",
    fieldType: CODE_FIELD_TYPES.html,
  },
  {
    componentUid: "html.css",
    fieldName: "cssCode",
    fieldType: CODE_FIELD_TYPES.css,
  },
  {
    componentUid: "html.java-script",
    fieldName: "jsCode",
    fieldType: CODE_FIELD_TYPES.javascript,
  },
];

function withFieldType(
  rows: EditableField[][] | undefined,
  fieldName: string,
  fieldType: string
) {
  if (!Array.isArray(rows)) {
    return rows;
  }

  return rows.map((row) =>
    row.map((field) => {
      if (field.name !== fieldName) {
        return field;
      }

      return {
        ...field,
        type: fieldType,
        size: 12,
      };
    })
  );
}

function applyCodeFieldOverrides(
  payload: EditViewHookPayload
): EditViewHookPayload {
  const components = payload.layout.components;
  if (!components) {
    return payload;
  }

  const nextComponents: Record<string, ComponentLayout> = {
    ...components,
  };

  FIELD_OVERRIDES.forEach(({ componentUid, fieldName, fieldType }) => {
    const componentLayout = nextComponents[componentUid];
    if (!componentLayout) {
      return;
    }

    nextComponents[componentUid] = {
      ...componentLayout,
      layout: withFieldType(componentLayout.layout, fieldName, fieldType),
    };
  });

  return {
    ...payload,
    layout: {
      ...payload.layout,
      components: nextComponents,
    },
  };
}

export default {
  config: {
    locales: ["en", "ko"],
  },
  register(app: StrapiApp) {
    app.addFields([
      {
        type: CODE_FIELD_TYPES.html,
        Component: HtmlCodeField as ComponentType,
      },
      {
        type: CODE_FIELD_TYPES.css,
        Component: CssCodeField as ComponentType,
      },
      {
        type: CODE_FIELD_TYPES.javascript,
        Component: JavaScriptCodeField as ComponentType,
      },
    ]);

    app.registerHook(MUTATE_EDIT_VIEW_LAYOUT_HOOK, applyCodeFieldOverrides);
  },
} satisfies AdminAppConfig;
