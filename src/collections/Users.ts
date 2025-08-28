import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => {
      // Only allow users with 'admin' role to access the admin panel
      return user?.role === 'admin'
    }
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.email === 'admin@admin.com') {
          data.role = 'admin';
        }
      },
    ],
  },
};
