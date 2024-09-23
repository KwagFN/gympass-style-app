import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { beforeEach, describe, expect, it } from 'vitest'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Typescript Gym - ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym - 21' }),
      expect.objectContaining({ title: 'Typescript Gym - 22' }),
    ])
  })
})
