import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInValidateUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new CheckInValidateUseCase(checkInRepository)

  return validateCheckInUseCase
}
