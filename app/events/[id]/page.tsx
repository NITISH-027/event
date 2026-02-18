'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/utils/auth'
import type { Event, Comment, Profile } from '@/types/database'

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [event, setEvent] = useState<Event | null>(null)
  const [comments, setComments] = useState<(Comment & { profile: Profile })[]>([])
  const [creator, setCreator] = useState<Profile | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    loadEventData()
  }, [eventId])

  const loadEventData = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)

      // Load event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single()

      if (eventError) throw eventError
      setEvent(eventData as Event)

      // Load creator profile
      const { data: creatorData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', (eventData as Event).created_by)
        .single()

      setCreator(creatorData)

      // Load comments with profiles
      const { data: commentsData } = await supabase
        .from('comments')
        .select(`
          *,
          profile:profiles!comments_user_id_fkey(*)
        `)
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })

      setComments(commentsData as any || [])
    } catch (error) {
      console.error('Error loading event:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !commentText.trim()) return

    setSubmittingComment(true)
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          event_id: eventId,
          user_id: user.id,
          content: commentText,
        }] as any)

      if (error) throw error

      setCommentText('')
      loadEventData()
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)

      if (error) throw error

      router.push('/events')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading event...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Event not found</p>
          <Link href="/events" className="text-blue-600 hover:text-blue-700">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = user?.id === event.created_by

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              College Event Bridge
            </Link>
            <Link
              href="/events"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  {event.category}
                </span>
                <span className="text-gray-600">{event.institution}</span>
              </div>
              {isOwner && (
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete Event
                </button>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

            <div className="flex items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(event.event_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.event_time}
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>

            {creator && (
              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 mb-2">Organized by</p>
                <p className="text-gray-900 font-semibold">{creator.full_name}</p>
                <p className="text-gray-600">{creator.institution}</p>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              />
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2">Sign in to comment</p>
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {comment.profile?.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {comment.profile?.full_name || 'Unknown User'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
