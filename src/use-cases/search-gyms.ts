import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymsRequest {
  query: string
  page: number
}

interface SearchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
