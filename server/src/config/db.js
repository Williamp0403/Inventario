import { createClient } from '@libsql/client'

export const db = createClient({
  url: 'libsql://inventario-database-williamp0403.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDM3MTA4NTMsImlkIjoiZDBkMWIwZTEtNGZhMi00ZDFiLTg1YjAtYWQ3ODgyMmE0MzgzIn0._HOdJBG86Lk0EhC1OF2TulobfPl2N8Ep1HhSxjfHy6Ww8okgONFhvykeza2bF3CL40SrNXPUwv4vZy2bBl9WAA'
})