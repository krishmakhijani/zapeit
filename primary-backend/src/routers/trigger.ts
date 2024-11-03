import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/available", async (req, res) => {
    const availableTriggers = await prisma.availableTrigger.findMany({});
    res.json({
        availableTriggers
    })
});

export const triggerRouter = router;