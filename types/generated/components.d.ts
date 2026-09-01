import type { Schema, Struct } from '@strapi/strapi';

export interface ContentAccordion extends Struct.ComponentSchema {
  collectionName: 'components_content_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'server';
  };
  attributes: {
    items: Schema.Attribute.Component<'content.accordion-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_content_accordion_items';
  info: {
    displayName: 'Accordion Item';
  };
  attributes: {
    content: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ContentActionBar extends Struct.ComponentSchema {
  collectionName: 'components_content_action_bars';
  info: {
    displayName: 'Action Bar';
    icon: 'cursor';
  };
  attributes: {
    actions: Schema.Attribute.Component<'content.button', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ContentButton extends Struct.ComponentSchema {
  collectionName: 'components_content_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
  };
}

export interface ContentCard extends Struct.ComponentSchema {
  collectionName: 'components_content_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContentCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_content_card_grids';
  info: {
    displayName: 'Card Grid';
  };
  attributes: {
    Card: Schema.Attribute.Component<'content.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentCkEditorContent extends Struct.ComponentSchema {
  collectionName: 'components_content_ck_editor_contents';
  info: {
    displayName: 'CKEditor Content';
  };
  attributes: {
    CKEditorContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODgzMDcxOTksImp0aSI6IjA4ZGMxMDI0LWMyYWEtNGM4NC1hZmY0LWI3MmI1YTFlNzFlMCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjY4YTRlN2E3In0.2U4UHlQPvY78CmQf7r1Kf30cZwjS9mRCvGLR--nSEU020BFOIuz76OAh0MVRjdCf1camNYto6uOsa_SOLBcaDg';
          output: 'HTML';
          preset: 'standard';
        }
      >;
  };
}

export interface ContentColumn extends Struct.ComponentSchema {
  collectionName: 'components_content_columns';
  info: {
    displayName: 'Column';
  };
  attributes: {
    Cell: Schema.Attribute.String;
  };
}

export interface ContentContentTable extends Struct.ComponentSchema {
  collectionName: 'components_content_content_tables';
  info: {
    displayName: 'Content Table';
  };
  attributes: {
    columns: Schema.Attribute.Component<'content.column', true>;
    rows: Schema.Attribute.Component<'content.row', true>;
  };
}

export interface ContentHeroImage extends Struct.ComponentSchema {
  collectionName: 'components_content_hero_images';
  info: {
    displayName: 'Hero Image';
    icon: 'landscape';
  };
  attributes: {
    button: Schema.Attribute.Component<'content.button', false>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subHeading: Schema.Attribute.Text;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    altText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface ContentRichText extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_texts';
  info: {
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface ContentRow extends Struct.ComponentSchema {
  collectionName: 'components_content_rows';
  info: {
    displayName: 'Row';
  };
  attributes: {
    TableCell: Schema.Attribute.Component<'content.table-cell', true>;
  };
}

export interface ContentTableCell extends Struct.ComponentSchema {
  collectionName: 'components_content_table_cells';
  info: {
    displayName: 'Table Cell';
  };
  attributes: {
    cellContent: Schema.Attribute.String;
  };
}

export interface ContentTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_text_blocks';
  info: {
    displayName: 'Text Block';
    icon: 'pencil';
  };
  attributes: {
    heading: Schema.Attribute.String;
    paragraph: Schema.Attribute.Text;
    subHeading: Schema.Attribute.String;
  };
}

export interface PagePageHeader extends Struct.ComponentSchema {
  collectionName: 'components_page_page_headers';
  info: {
    displayName: 'Page Header';
  };
  attributes: {
    subHeading: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'content.accordion': ContentAccordion;
      'content.accordion-item': ContentAccordionItem;
      'content.action-bar': ContentActionBar;
      'content.button': ContentButton;
      'content.card': ContentCard;
      'content.card-grid': ContentCardGrid;
      'content.ck-editor-content': ContentCkEditorContent;
      'content.column': ContentColumn;
      'content.content-table': ContentContentTable;
      'content.hero-image': ContentHeroImage;
      'content.image': ContentImage;
      'content.rich-text': ContentRichText;
      'content.row': ContentRow;
      'content.table-cell': ContentTableCell;
      'content.text-block': ContentTextBlock;
      'page.page-header': PagePageHeader;
    }
  }
}
