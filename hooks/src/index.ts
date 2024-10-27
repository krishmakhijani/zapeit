import express from "express"
import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    try{
        await prisma.$transaction(async tx => {
            const run = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            });;
    
            await tx.zapRunOutbox.create({
                data: {
                    zapRunId: run.id
                }
            })
    
            console.log("Zap created for user:",userId,"on zap",zapId)
        })
        res.json({
            message: "Webhook received"
        })
    }catch(err){
        console.log(err)
    }
    
})

app.listen(3002);