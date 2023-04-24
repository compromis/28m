import contentful from 'contentful';

export default defineNuxtPlugin(() => {
  const { contentfulSpaceId, contentfulAccessToken } = useRuntimeConfig()

  return {
    provide: {
      contentful: contentful.createClient({
        space: contentfulSpaceId,
        accessToken: contentfulAccessToken,
      })
    }
  }
})
