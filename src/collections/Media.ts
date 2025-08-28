import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true, // 👈 allow anyone to read media
  },
  upload: {
    disableLocalStorage: true, // <-- important for S3
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      admin: {
        description: 'Alternative text for the image',
      },
    },
  ],
};
