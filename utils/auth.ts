import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

export async function signUp(email: string, password: string, fullName: string, institution: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        institution,
      },
    },
  })

  if (error) throw error

  // Create profile record
  if (data.user) {
    const profileData: ProfileInsert = {
      id: data.user.id,
      email: data.user.email!,
      full_name: fullName,
      institution,
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([profileData] as any)

    if (profileError) throw profileError
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
