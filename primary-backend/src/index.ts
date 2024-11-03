import express from 'express';
import cors from 'cors'
import { userRouter } from './routers/user';
import { zapRouter } from './routers/zap';
import { triggerRouter } from './routers/trigger';
import { actionRouter } from './routers/action';

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/zap",zapRouter)
app.use("/api/v1/trigger",triggerRouter)
app.use("/api/v1/action",actionRouter)


app.listen(3000,() => {
    console.log("Primary backend server running on port 3000")
})