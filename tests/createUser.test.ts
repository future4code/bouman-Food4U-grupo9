import { UserGateway } from "../src/business/gateway/userGateway"
import { User } from "../src/business/entities/user"
import { CreateUserUC } from "../src/business/usecases/user/createUser"

describe("Test create user usecase", () => {
  test('Should not throw an error', async () => {
    const userGateway: UserGateway = {
      async createUser(user: User): Promise<void> {},
      async login(email: string): Promise<User | undefined> {
        return undefined
      },
      async getEmailById(id: string): Promise<string> {
        return 'email'
      }
    }

    const useCase = new CreateUserUC(userGateway)

    const input = {
      email: 'email@email.com',
      password: '123456',
    }

    await expect(useCase.execute(input)).resolves.not.toThrowError()
  })

  test('Should call DB function correctly', async () => {
    const userGateway: UserGateway = {
      createUser: jest.fn(),
      login: jest.fn(),
      getEmailById: jest.fn()
    }

    const useCase = new CreateUserUC(userGateway)

    const input = {
      email: 'email@email.com',
      password: '123456',
    }

    await useCase.execute(input)
    expect(userGateway.createUser).toHaveBeenCalledTimes(1)
  })

})