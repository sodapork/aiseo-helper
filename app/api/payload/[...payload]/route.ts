import { createPayloadClient } from '@payloadcms/next-payload'
import { nextHandler } from '@payloadcms/next-payload'
import config from '../../../payload.config'

const { initPayload } = createPayloadClient({ config })

export async function GET(
  req: Request,
  { params }: { params: { payload: string[] } }
) {
  const { searchParams } = new URL(req.url)
  const payload = await initPayload({
    secret: process.env.PAYLOAD_SECRET,
  })
  return nextHandler({
    req,
    params,
    payload,
  })
}

export async function POST(
  req: Request,
  { params }: { params: { payload: string[] } }
) {
  const { searchParams } = new URL(req.url)
  const payload = await initPayload({
    secret: process.env.PAYLOAD_SECRET,
  })
  return nextHandler({
    req,
    params,
    payload,
  })
}

export async function PATCH(
  req: Request,
  { params }: { params: { payload: string[] } }
) {
  const { searchParams } = new URL(req.url)
  const payload = await initPayload({
    secret: process.env.PAYLOAD_SECRET,
  })
  return nextHandler({
    req,
    params,
    payload,
  })
}

export async function DELETE(
  req: Request,
  { params }: { params: { payload: string[] } }
) {
  const { searchParams } = new URL(req.url)
  const payload = await initPayload({
    secret: process.env.PAYLOAD_SECRET,
  })
  return nextHandler({
    req,
    params,
    payload,
  })
} 