import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = "https://fceyngstazufwdqnakmm.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZXluZ3N0YXp1ZndkcW5ha21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDM4NDcsImV4cCI6MTk4MzY3OTg0N30.C-e1Y1Ol7sbL5YVL3XpTbCgttrtnQDYx-Po8hm6elJc"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
        }
    }
}