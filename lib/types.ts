
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      organizationId?: string
      organizationName?: string
      hiredAt?: string
      departmentId?: string
      departmentName?: string
      positionId?: string
      positionTitle?: string
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    organizationId?: string
    organizationName?: string
    hiredAt?: string
    departmentId?: string
    positionId?: string
    positionTitle?: string
    departmentName?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    organizationId?: string
    organizationName?: string
  }
}

export interface Organization {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface SurveyResponse {
  id: string
  userId: string
  organizationId: string
  responses: any
  completedAt: Date
  satisfactionScore?: number
  workLifeBalance?: number
  careerDevelopment?: number
  managementQuality?: number
  compensationSatisfaction?: number
  workEnvironment?: number
  department?: string
  yearsInCompany?: number
  ageRange?: string
  position?: string
  turnoverRisk?: string
  recommendCompany?: boolean
}
