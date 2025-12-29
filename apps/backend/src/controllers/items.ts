import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { prismaClient } from '..'

export const getItems = asyncHandler(async(req: Request, res: Response) => {
    const items = await prismaClient.item.findMany()
    res.status(200).json({ items })
})

export const getItemsByID = asyncHandler(async(req: Request, res: Response) => {
    res.status(200).json({ message: 'Retrieved Item by ID' })
})

export const createItem = asyncHandler(async(req: Request, res: Response) => {
    const { sku, name, uom, low_stock_threshold, } = req.body

    const existingItem  = await prismaClient.item.findUnique({where: { sku }})
    if (existingItem) {
        throw new Error("Item with this SKU already exists")
    }

    const item = await prismaClient.item.create({
        data: {
            sku,
            name,
            uom,
            low_stock_threshold    
        },
    })

    res.status(201).json({ item })
})

export const updateItem = asyncHandler(async(req: Request, res: Response) => {
   const { sku, name, uom, low_stock_threshold, } = req.body

    const item = await prismaClient.item.upsert({
        where: {
            sku
        },
        update: {
            sku,
            name,
            uom,
            low_stock_threshold    
        },
        create: {
            sku,
            name,
            uom,
            low_stock_threshold
        },
    })

    res.status(201).json({ item })
})

export const deleteItem = asyncHandler(async(req: Request, res: Response) => {
    const { sku } = req.params

    const item = await prismaClient.item.delete({ where: { sku }})

    res.status(200).json({ item })
})