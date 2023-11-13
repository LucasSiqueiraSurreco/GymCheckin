import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWhitSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userWhitSameEmail) {
      throw new Error('E-mail already exists!')
    }

    await this.usersRepository.create({ name, email, password_hash })
  }
}
