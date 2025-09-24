'use server'
import { getTokenAuth } from "@/utilities/getTokenAuth"
export async function updateCount({ productId , count}: { productId: string, count: number }) {
const token = await getTokenAuth()
if(!token) 
  throw new Error('User not authenticated')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart/${productId}`, {
    cache: 'no-store',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify({ count })
  })
  const payload = await res.json()
  return payload
}