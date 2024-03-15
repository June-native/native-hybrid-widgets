export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,

  BSC = 56,

  POLYGON = 137,

  ARBITRUM_ONE = 42161,

  AURORA = 1313161554,

  OKCHAIN = 66,

  OPTIMISM = 10,

  AVALANCHE = 43114,

  CONFLUX = 1030,

  BASE = 8453,

  LINEA = 59144,

  SCROLL = 534352,

  MANTA = 169,

  MANTLE = 5000,
}

const contractMap: {
  [key in ChainId]: {
    MULTI_CALL: string;
    DODO_APPROVE: string;
    ERC20_HELPER: string;
    ROUTE_V1_DATA_FETCH: string;
  };
} = {
  [ChainId.MAINNET]: {
    MULTI_CALL: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    DODO_APPROVE: '0xCB859eA579b28e02B87A1FDE08d087ab9dbE5149',
    ERC20_HELPER: '0xD9ef2d1583e8Aa196123e773BE38B539a4d149df',
    ROUTE_V1_DATA_FETCH: '0x6373ceB657C83C91088d328622573FB766064Ac4',
  },
  [ChainId.GOERLI]: {
    MULTI_CALL: '0x696E25A5e2AEd1C55E6d6Cfa0532Bbda9020165d',
    DODO_APPROVE: '0xC9143e54021f4a6d33b9b89DBB9F458AaEdd56FB',
    ERC20_HELPER: '0x24549FC74B3076A962624A26370ed556c467F74C',
    ROUTE_V1_DATA_FETCH: '0xAC716E87b0853C0712674e8E3a8435a489F276b4',
  },
  [ChainId.BSC]: {
    MULTI_CALL: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
    DODO_APPROVE: '0xa128Ba44B2738A558A1fdC06d6303d52D3Cef8c1',
    ERC20_HELPER: '0x566651Ad34f6306872FaC5fB95bbF4C9beE8D8F2',
    ROUTE_V1_DATA_FETCH: '0x2BBD66fC4898242BDBD2583BBe1d76E8b8f71445',
  },
  [ChainId.POLYGON]: {
    MULTI_CALL: '0xc9eD9B18e447e600238fe50e944B9062B664DEa4',
    DODO_APPROVE: '0x6D310348d5c12009854DFCf72e0DF9027e8cb4f4',
    ERC20_HELPER: '0xfd24312Ec7871A6D1a31e454D5AbB16c6c25a9b3',
    ROUTE_V1_DATA_FETCH: '0x18DFdE99F578A0735410797e949E8D3e2AFCB9D2',
  },
  [ChainId.ARBITRUM_ONE]: {
    MULTI_CALL: '0xF718F2bd590E5621e53f7b89398e52f7Acced8ca',
    DODO_APPROVE: '0xA867241cDC8d3b0C07C85cC06F25a0cD3b5474d8',
    ERC20_HELPER: '0x7C062B9C584fA6eC2504270790D38240A2c5fE72',
    ROUTE_V1_DATA_FETCH: '0x4EE6398898F7FC3e648b3f6bA458310ac29cD352',
  },
  [ChainId.AURORA]: {
    MULTI_CALL: '0x989DcAA95801C527C5B73AA65d3962dF9aCe1b0C',
    DODO_APPROVE: '0x335aC99bb3E51BDbF22025f092Ebc1Cf2c5cC619',
    ERC20_HELPER: '0xE8C9A78725D0451FA19878D5f8A3dC0D55FECF25',
    ROUTE_V1_DATA_FETCH: '0xbAb9F4ff4A19a0e8EEBC56b06750253228ffAc6E',
  },
  [ChainId.OKCHAIN]: {
    MULTI_CALL: '0x5e84190a270333aCe5B9202a3F4ceBf11b81bB01',
    DODO_APPROVE: '0x7737fd30535c69545deeEa54AB8Dd590ccaEBD3c',
    ERC20_HELPER: '0x4775b1858f1e417C9609D455C3Ad8751ec01daC4',
    ROUTE_V1_DATA_FETCH: '0xDfaf9584F5d229A9DBE5978523317820A8897C5A',
  },
  [ChainId.OPTIMISM]: {
    MULTI_CALL: '0xb98Ac2fEFc8b73aeAE33D02BB00c26E12afCa9Df',
    DODO_APPROVE: '0xa492d6eABcdc3E204676f15B950bBdD448080364',
    ERC20_HELPER: '0x42E456ea0dd7538ea103fBb1d0388D14C97bB5b2',
    ROUTE_V1_DATA_FETCH: '0x6281E0628eb2B37fE9943279EA39725D5f0E0dBe',
  },
  [ChainId.AVALANCHE]: {
    MULTI_CALL: '0x97f0153E7F5749640aDF3Ff9CFC518b79D6Fe53b',
    DODO_APPROVE: '0xCFea63e3DE31De53D68780Dd65675F169439e470',
    ERC20_HELPER: '0xC3528D128CC227fd60793007b5e3FdF7c2945282',
    ROUTE_V1_DATA_FETCH: '0x790B4A80Fb1094589A3c0eFC8740aA9b0C1733fB',
  },
  [ChainId.CONFLUX]: {
    MULTI_CALL: '0x696e25a5e2aed1c55e6d6cfa0532bbda9020165d',
    DODO_APPROVE: '0x5BaF16d57620Cb361F622232F3cb4090e35F3da2',
    ERC20_HELPER: '0x24549FC74B3076A962624A26370ed556c467F74C',
    ROUTE_V1_DATA_FETCH: '0xAC716E87b0853C0712674e8E3a8435a489F276b4',
  },
  [ChainId.BASE]: {
    MULTI_CALL: '0xf5Ec1a19e1570bDf0A3AaA6585274f27027270b1',
    DODO_APPROVE: '0x89872650fA1A391f58B4E144222bB02e44db7e3B',
    ERC20_HELPER: '0xB5c7BA1EAde74800cD6cf5F56b1c4562De373780',
    ROUTE_V1_DATA_FETCH: '0x17644d3B366273faC75A07996E2F90A99A2946a7',
  },
  [ChainId.LINEA]: {
    MULTI_CALL: '0xa7b9C3a116b20bEDDdBE4d90ff97157f67F0bD97',
    DODO_APPROVE: '0x6de4d882a84A98f4CCD5D33ea6b3C99A07BAbeB1',
    ERC20_HELPER: '0xbcd2FDC3B884Cf0dfD932f55Ec2Fe1fB7e8c62Da',
    ROUTE_V1_DATA_FETCH: '0xa5fc92Ca57a21C87AA0477b1c8fE8B9Bbf69d6C2',
  },
  [ChainId.SCROLL]: {
    MULTI_CALL: '0xf5Ec1a19e1570bDf0A3AaA6585274f27027270b1',
    DODO_APPROVE: '0x20E77aD760eC9E922Fd2dA8847ABFbB2471B92CD',
    ERC20_HELPER: '0xB5c7BA1EAde74800cD6cf5F56b1c4562De373780',
    ROUTE_V1_DATA_FETCH: '0x17644d3B366273faC75A07996E2F90A99A2946a7',
  },
  [ChainId.MANTA]: {
    MULTI_CALL: '0xf5Ec1a19e1570bDf0A3AaA6585274f27027270b1',
    DODO_APPROVE: '0x0226fCE8c969604C3A0AD19c37d1FAFac73e13c2',
    ERC20_HELPER: '0xB5c7BA1EAde74800cD6cf5F56b1c4562De373780',
    ROUTE_V1_DATA_FETCH: '0x17644d3B366273faC75A07996E2F90A99A2946a7',
  },
  [ChainId.MANTLE]: {
    MULTI_CALL: '0xf5Ec1a19e1570bDf0A3AaA6585274f27027270b1',
    DODO_APPROVE: '0xa71415675F68f29259ddD63215E5518d2735bf0a',
    ERC20_HELPER: '0xB5c7BA1EAde74800cD6cf5F56b1c4562De373780',
    ROUTE_V1_DATA_FETCH: '0xa1609A1fa7DC16c025feA194c02b2822441b8c10',
  },
};

export default contractMap;
