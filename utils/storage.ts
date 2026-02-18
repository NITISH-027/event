import { supabase } from '@/lib/supabase'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function uploadEventImage(file: File, userId: string): Promise<string | null> {
  // Validate file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only images (JPEG, PNG, WebP, GIF) are allowed.')
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size too large. Maximum size is 5MB.')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${crypto.randomUUID()}.${fileExt}`
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
