import { FeedGateway } from "../src/business/gateway/feedGateway"
import { FeedUC } from "../src/business/usecases/recipe/feed"

describe("Test feed usecase", () => {

  test('Should call DB function correctly', async () => {
    const feedGateway: FeedGateway = {
      getFeed: jest.fn()
    }

    const useCase = new FeedUC(feedGateway)

    const input = "1"

    await useCase.execute(input)
    expect(feedGateway.getFeed).toHaveBeenCalledTimes(1)
  })

})