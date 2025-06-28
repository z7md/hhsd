import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vsmlhvzwivnouvawmcsn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbWxodnp3aXZub3V2YXdtY3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwOTIzMTAsImV4cCI6MjA2NjY2ODMxMH0.QS52GopaugZv2XwZURRojKjVQ6c5g-blFtpf98ElJSc' // لا تستخدم service_role!
export const supabase = createClient(supabaseUrl, supabaseKey)