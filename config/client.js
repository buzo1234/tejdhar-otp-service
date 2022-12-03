import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '6iye0z74',
  dataset: 'production',
  apiVersion: '2022-06-29',
  useCdn: true,
  token:
    'sk6rpwyByKhh7KIulgsRf5UAi8NIq0TppjWQT1VL4XhKPvwdftjBJQBO14lR9sHiV1VZixoa3P7hqqlmMNtHdiIidxfG0jxMAtl5eD8cBkuzBZCKl1dixOeoXAs2yAIDsWaxjoapcy603bALhssJwS34OO6ZTf5FTNHVZ6CtjZKwvc9HLkH0',
});
