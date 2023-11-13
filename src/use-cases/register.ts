import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWhitSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (userWhitSameEmail) {
    throw new Error('E-mail already exists!')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
