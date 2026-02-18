import { supabase } from '@/lib/supabase'

export async function uploadEventImage(file: File, userId: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `events/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('event-images')
    .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from('event-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
