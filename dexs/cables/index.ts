import { FetchOptions, SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

interface IVolumeall {
  volumeusd: string;
  date: number;
}

const address: any = {
  [CHAIN.ARBITRUM]: "0xD7961aa9ad7b6a61F2a8958C44DbF4b17DB57EBB",
  [CHAIN.AVAX]: "0xD7961aa9ad7b6a61F2a8958C44DbF4b17DB57EBB"
}

const event = "event SwapExecuted(uint256 indexed nonceAndMeta,address taker,address destTrader,uint256 destChainId,address srcAsset,address destAsset,uint256 srcAmount,uint256 destAmount)"

const fetch = async (options: FetchOptions) => {
  const dailyVolume = options.createBalances();
  const logs = await options.getLogs({
    target: address[options.chain],
    eventAbi: event
  })
  logs.forEach(log => {
    dailyVolume.add(log.destAsset, log.destAmount)
  })
  return { dailyVolume }
};


const adapter: SimpleAdapter = {
  version: 2,
  adapter: {
    [CHAIN.AVAX]: {
      fetch: fetch,
      start: 0,
    },
    [CHAIN.ARBITRUM]: {
      fetch: fetch,
      start: 0,
    },
  },
};

export default adapter;