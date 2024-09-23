import { Environment } from 'vitest'

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    console.log('Setup')
    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
  transformMode: 'ssr', // Ou 'web', dependendo do seu contexto
}

export default prismaEnvironment
