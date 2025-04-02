import httpInstance from '@/utils/http'
import type { orderQuery } from "@/types"

export const getUserOrderAPI = (params:orderQuery) => {
  return httpInstance({
    url: '/member/order',
    method: 'GET',
    params
  })
}