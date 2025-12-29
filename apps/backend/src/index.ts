import express, { Express } from 'express'
import { DATABASE_URL, PORT } from './secrets'
import { errorHandler } from './middleware/errorHandler'
import rootRouter from './routes'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const app: Express = express()

app.use(errorHandler)
app.use(express.json())
app.use('/', rootRouter)

const connectionString = `${DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
export const prismaClient = new PrismaClient({ adapter })

app.listen(PORT, () => { console.log(`App Working on port ${PORT}!`) })