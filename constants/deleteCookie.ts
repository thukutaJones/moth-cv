'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteCookie() {
  (await cookies()).set('moth-cv-token', '', { maxAge: 0 })
}