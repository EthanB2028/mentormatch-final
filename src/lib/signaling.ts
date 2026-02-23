// WebRTC Signaling and Matching - In-memory implementation for Node.js / Vercel

export interface WebRTCMessage {
  type: 'offer' | 'answer' | 'ice-candidate' | 'join-room' | 'leave-room' | 'user-joined' | 'user-left' | 'chat-message'
  roomId: string
  userId: string
  userName: string
  userRole: 'student' | 'ceo'
  data?: any
  message?: string
}

interface QueueEntry {
  userId: string
  userName: string
  preferences: any
  joinedAt: number
}

// In-memory matching queue (works in serverless with caveat that state doesn't persist across cold starts)
export class MatchingQueue {
  private studentQueue: QueueEntry[] = []
  private ceoQueue: QueueEntry[] = []

  async join(userId: string, userName: string, role: 'student' | 'ceo', preferences: any) {
    const entry: QueueEntry = {
      userId,
      userName,
      preferences: preferences || {},
      joinedAt: Date.now()
    }

    if (role === 'student') {
      if (this.ceoQueue.length > 0) {
        const ceo = this.ceoQueue.shift()!
        return this.createMatch(entry, ceo)
      }
      this.studentQueue.push(entry)
      return {
        status: 'queued',
        position: this.studentQueue.length,
        queueType: 'student'
      }
    } else {
      if (this.studentQueue.length > 0) {
        const student = this.studentQueue.shift()!
        return this.createMatch(student, entry)
      }
      this.ceoQueue.push(entry)
      return {
        status: 'queued',
        position: this.ceoQueue.length,
        queueType: 'ceo'
      }
    }
  }

  async leave(userId: string) {
    this.studentQueue = this.studentQueue.filter(u => u.userId !== userId)
    this.ceoQueue = this.ceoQueue.filter(u => u.userId !== userId)
    return { status: 'left' }
  }

  getStatus() {
    return {
      studentsInQueue: this.studentQueue.length,
      ceosInQueue: this.ceoQueue.length
    }
  }

  private createMatch(student: QueueEntry, ceo: QueueEntry) {
    const roomId = crypto.randomUUID()
    return {
      status: 'matched',
      match: {
        roomId,
        matchType: 'student-ceo',
        student: { userId: student.userId, userName: student.userName },
        ceo: { userId: ceo.userId, userName: ceo.userName },
        createdAt: new Date().toISOString()
      }
    }
  }
}

// Singleton instances
export const matchingQueue = new MatchingQueue()
