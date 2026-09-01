import type { Core } from '@strapi/strapi';

const getPreviewPathname = (
  uid: string,
  document: { slug?: string } | null
): string | null => {
  if (!document?.slug) {
    return null;
  }

  switch (uid) {
    case 'api::page.page':
      return `/${document.slug}`;

    default:
      return null;
  }
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')!,
  },

  apiToken: {
    salt: env('API_TOKEN_SALT')!,
  },

  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')!,
    },
  },

  secrets: {
    encryptionKey: env('ENCRYPTION_KEY')!,
  },

  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },

  preview: {
    enabled: true,

    config: {
      allowedOrigins: [env('CLIENT_URL')!],

      async handler(uid, { documentId, locale, status }) {
        const strapi = (global as any).strapi;

        if (!strapi) {
          throw new Error('Strapi instance is not available');
        }

        const document = await strapi.documents(uid as any).findOne({
          documentId,
          locale,
        });

        const pathname = getPreviewPathname(uid, document);

        if (!pathname) {
          return null;
        }

        const previewSecret = env('PREVIEW_SECRET');

        if (!previewSecret) {
          throw new Error('PREVIEW_SECRET is not configured');
        }

        const searchParams = new URLSearchParams({
          secret: previewSecret,
          url: pathname,
          status: status ?? 'draft',
          documentId,
          ...(locale ? { locale } : {}),
        });

        return `${env('CLIENT_URL')}/api/preview?${searchParams.toString()}`;
      },
    },
  },
});

export default config;