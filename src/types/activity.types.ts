// representasi 1 item activity dari API
export interface Activity {
  out_no: string
  out_date: string 
  cust_id: string
  cust_name: string
  total_price: string
  discount_total: string
  ppn: string
  grand_total: string
  is_pending: '0' | '1'
  status: string
}

// response dari endpoint /activity
export interface ActivityResponse {
  success: boolean
  data: Activity[]
}
