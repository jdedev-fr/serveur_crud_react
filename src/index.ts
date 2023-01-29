import Express from 'express'
import { errorHandler, notFound } from './middleware/error'
import { userRouter } from './router/user'


const port = 3000



const app = Express()

app.use(Express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/users', userRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Serveur API lancé sur http://127.0.0.1:${port}`)
})