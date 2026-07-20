export default async function sitemap() {
  // Aquí puedes hacer fetch de tu base de datos o API si tienes URLs dinámicas
  // const posts = await getPosts(); 
  
  return [
    {
      url: 'https://comerce-electronic-app.vercel.app/',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/electronic-group/maintenance',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/rent',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/sell',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/replacement',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/electronic-board',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/fotovoltaic-system',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://comerce-electronic-app.vercel.app/electromovil',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}