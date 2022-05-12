/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1155PresetMinterPauser,
  ERC1155PresetMinterPauserInterface,
} from "../ERC1155PresetMinterPauser";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002ff838038062002ff883398101604081905262000034916200030c565b806200004081620000c6565b506005805460ff191690556200006160006200005b620000df565b620000e3565b620000907f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66200005b620000df565b620000bf7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200005b620000df565b506200042e565b8051620000db90600490602084019062000266565b5050565b3390565b620000db82826200010082826200012c60201b620009c71760201c565b60008281526001602090815260409091206200012791839062000a4c620001b6821b17901c565b505050565b620001388282620001d6565b620000db576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916600117905562000172620000df565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620001cd836001600160a01b038416620001ff565b90505b92915050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60006200020d83836200024e565b6200024557508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620001d0565b506000620001d0565b60009081526001919091016020526040902054151590565b8280546200027490620003db565b90600052602060002090601f016020900481019282620002985760008555620002e3565b82601f10620002b357805160ff1916838001178555620002e3565b82800160010185558215620002e3579182015b82811115620002e3578251825591602001919060010190620002c6565b50620002f1929150620002f5565b5090565b5b80821115620002f15760008155600101620002f6565b600060208083850312156200031f578182fd5b82516001600160401b038082111562000336578384fd5b818501915085601f8301126200034a578384fd5b8151818111156200035f576200035f62000418565b604051601f8201601f191681018501838111828210171562000385576200038562000418565b60405281815283820185018810156200039c578586fd5b8592505b81831015620003bf5783830185015181840186015291840191620003a0565b81831115620003d057858583830101525b979650505050505050565b600281046001821680620003f057607f821691505b602082108114156200041257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b612bba806200043e6000396000f3fe608060405234801561001057600080fd5b50600436106101725760003560e01c8063731133e9116100de578063ca15c87311610097578063e63ab1e911610071578063e63ab1e91461031b578063e985e9c514610323578063f242432a14610336578063f5298aca1461034957610172565b8063ca15c873146102ed578063d539139314610300578063d547741f1461030857610172565b8063731133e9146102845780638456cb59146102975780639010d07c1461029f57806391d14854146102bf578063a217fddf146102d2578063a22cb465146102da57610172565b80632f2ff15d116101305780632f2ff15d1461021b57806336568abe1461022e5780633f4ba83a146102415780634e1273f4146102495780635c975abb146102695780636b20c4541461027157610172565b8062fdd58e1461017757806301ffc9a7146101a05780630e89341c146101c05780631f7fdffa146101e0578063248a9ca3146101f55780632eb2c2d614610208575b600080fd5b61018a610185366004611f66565b61035c565b6040516101979190612343565b60405180910390f35b6101b36101ae36600461212d565b6103b8565b6040516101979190612338565b6101d36101ce3660046120d2565b6103cb565b604051610197919061234c565b6101f36101ee366004611e97565b61045f565b005b61018a6102033660046120d2565b6104b9565b6101f3610216366004611d1d565b6104ce565b6101f36102293660046120ea565b61052c565b6101f361023c3660046120ea565b610555565b6101f361059b565b61025c610257366004612014565b6105ed565b60405161019791906122f7565b6101b361070d565b6101f361027f366004611e26565b610717565b6101f3610292366004611fc1565b61076c565b6101f36107c0565b6102b26102ad36600461210c565b610810565b6040516101979190612240565b6101b36102cd3660046120ea565b61082f565b61018a610858565b6101f36102e8366004611f2c565b61085d565b61018a6102fb3660046120d2565b61086f565b61018a610886565b6101f36103163660046120ea565b6108aa565b61018a6108c9565b6101b3610331366004611ceb565b6108ed565b6101f3610344366004611dc3565b61091b565b6101f3610357366004611f8f565b610972565b60006001600160a01b03831661038d5760405162461bcd60e51b81526004016103849061245e565b60405180910390fd5b5060008181526002602090815260408083206001600160a01b03861684529091529020545b92915050565b60006103c382610a61565b90505b919050565b6060600480546103da90612a3e565b80601f016020809104026020016040519081016040528092919081815260200182805461040690612a3e565b80156104535780601f1061042857610100808354040283529160200191610453565b820191906000526020600020905b81548152906001019060200180831161043657829003601f168201915b50505050509050919050565b61048b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66102cd610aa1565b6104a75760405162461bcd60e51b815260040161038490612686565b6104b384848484610aa5565b50505050565b60009081526020819052604090206001015490565b6104d6610aa1565b6001600160a01b0316856001600160a01b031614806104fc57506104fc85610331610aa1565b6105185760405162461bcd60e51b8152600401610384906125f1565b6105258585858585610c27565b5050505050565b610535826104b9565b61054681610541610aa1565b610dfb565b6105508383610e5f565b505050565b61055d610aa1565b6001600160a01b0316816001600160a01b03161461058d5760405162461bcd60e51b815260040161038490612902565b6105978282610e81565b5050565b6105c77f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6102cd610aa1565b6105e35760405162461bcd60e51b81526004016103849061272d565b6105eb610ea3565b565b606081518351146106105760405162461bcd60e51b815260040161038490612830565b6000835167ffffffffffffffff81111561063a57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610663578160200160208202803683370190505b50905060005b8451811015610705576106ca85828151811061069557634e487b7160e01b600052603260045260246000fd5b60200260200101518583815181106106bd57634e487b7160e01b600052603260045260246000fd5b602002602001015161035c565b8282815181106106ea57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526106fe81612a79565b9050610669565b509392505050565b60055460ff165b90565b61071f610aa1565b6001600160a01b0316836001600160a01b03161480610745575061074583610331610aa1565b6107615760405162461bcd60e51b815260040161038490612539565b610550838383610f11565b6107987f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66102cd610aa1565b6107b45760405162461bcd60e51b815260040161038490612686565b6104b3848484846110c5565b6107ec7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6102cd610aa1565b6108085760405162461bcd60e51b81526004016103849061278a565b6105eb6111b6565b60008281526001602052604081206108289083611211565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b600081565b610597610868610aa1565b838361121d565b60008181526001602052604081206103c3906112c0565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6108b3826104b9565b6108bf81610541610aa1565b6105508383610e81565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205460ff1690565b610923610aa1565b6001600160a01b0316856001600160a01b03161480610949575061094985610331610aa1565b6109655760405162461bcd60e51b815260040161038490612539565b61052585858585856112cb565b61097a610aa1565b6001600160a01b0316836001600160a01b031614806109a057506109a083610331610aa1565b6109bc5760405162461bcd60e51b815260040161038490612539565b610550838383611403565b6109d1828261082f565b610597576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610a08610aa1565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610828836001600160a01b038416611516565b60006001600160e01b03198216636cdb3d1360e11b1480610a9257506001600160e01b031982166303a24d0760e21b145b806103c357506103c382611560565b3390565b6001600160a01b038416610acb5760405162461bcd60e51b8152600401610384906128c1565b8151835114610aec5760405162461bcd60e51b815260040161038490612879565b6000610af6610aa1565b9050610b0781600087878787611585565b60005b8451811015610bbf57838181518110610b3357634e487b7160e01b600052603260045260246000fd5b602002602001015160026000878481518110610b5f57634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b031681526020019081526020016000206000828254610ba791906129ad565b90915550819050610bb781612a79565b915050610b0a565b50846001600160a01b031660006001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610c1092919061230a565b60405180910390a461052581600087878787611593565b8151835114610c485760405162461bcd60e51b815260040161038490612879565b6001600160a01b038416610c6e5760405162461bcd60e51b8152600401610384906125ac565b6000610c78610aa1565b9050610c88818787878787611585565b60005b8451811015610d8d576000858281518110610cb657634e487b7160e01b600052603260045260246000fd5b602002602001015190506000858381518110610ce257634e487b7160e01b600052603260045260246000fd5b60209081029190910181015160008481526002835260408082206001600160a01b038e168352909352919091205490915081811015610d335760405162461bcd60e51b8152600401610384906126e3565b60008381526002602090815260408083206001600160a01b038e8116855292528083208585039055908b16825281208054849290610d729084906129ad565b9250508190555050505080610d8690612a79565b9050610c8b565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610ddd92919061230a565b60405180910390a4610df3818787878787611593565b505050505050565b610e05828261082f565b61059757610e1d816001600160a01b031660146116a1565b610e288360206116a1565b604051602001610e399291906121cb565b60408051601f198184030181529082905262461bcd60e51b82526103849160040161234c565b610e6982826109c7565b60008281526001602052604090206105509082610a4c565b610e8b8282611853565b600082815260016020526040902061055090826118d6565b610eab61070d565b610ec75760405162461bcd60e51b815260040161038490612430565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610efa610aa1565b604051610f079190612240565b60405180910390a1565b6001600160a01b038316610f375760405162461bcd60e51b815260040161038490612643565b8051825114610f585760405162461bcd60e51b815260040161038490612879565b6000610f62610aa1565b9050610f8281856000868660405180602001604052806000815250611585565b60005b8351811015611066576000848281518110610fb057634e487b7160e01b600052603260045260246000fd5b602002602001015190506000848381518110610fdc57634e487b7160e01b600052603260045260246000fd5b60209081029190910181015160008481526002835260408082206001600160a01b038c16835290935291909120549091508181101561102d5760405162461bcd60e51b8152600401610384906124a9565b60009283526002602090815260408085206001600160a01b038b168652909152909220910390558061105e81612a79565b915050610f85565b5060006001600160a01b0316846001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb86866040516110b792919061230a565b60405180910390a450505050565b6001600160a01b0384166110eb5760405162461bcd60e51b8152600401610384906128c1565b60006110f5610aa1565b905061111681600087611107886118eb565b611110886118eb565b87611585565b60008481526002602090815260408083206001600160a01b0389168452909152812080548592906111489084906129ad565b92505081905550846001600160a01b031660006001600160a01b0316826001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62878760405161119f929190612951565b60405180910390a461052581600087878787611944565b6111be61070d565b156111db5760405162461bcd60e51b815260040161038490612582565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610efa610aa1565b60006108288383611a15565b816001600160a01b0316836001600160a01b0316141561124f5760405162461bcd60e51b8152600401610384906127e7565b6001600160a01b0383811660008181526003602090815260408083209487168084529490915290819020805460ff1916851515179055517f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31906112b3908590612338565b60405180910390a3505050565b60006103c382611a4d565b6001600160a01b0384166112f15760405162461bcd60e51b8152600401610384906125ac565b60006112fb610aa1565b905061130c818787611107886118eb565b60008481526002602090815260408083206001600160a01b038a1684529091529020548381101561134f5760405162461bcd60e51b8152600401610384906126e3565b60008581526002602090815260408083206001600160a01b038b811685529252808320878503905590881682528120805486929061138e9084906129ad565b92505081905550856001600160a01b0316876001600160a01b0316836001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6288886040516113e4929190612951565b60405180910390a46113fa828888888888611944565b50505050505050565b6001600160a01b0383166114295760405162461bcd60e51b815260040161038490612643565b6000611433610aa1565b905061146381856000611445876118eb565b61144e876118eb565b60405180602001604052806000815250611585565b60008381526002602090815260408083206001600160a01b0388168452909152902054828110156114a65760405162461bcd60e51b8152600401610384906124a9565b60008481526002602090815260408083206001600160a01b03808a16808652919093528184208786039055905190918516907fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62906115079089908990612951565b60405180910390a45050505050565b60006115228383611a51565b611558575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556103b2565b5060006103b2565b60006001600160e01b03198216635a05180f60e01b14806103c357506103c382611a69565b610df3868686868686611a8e565b6115a5846001600160a01b0316611ac1565b15610df35760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906115de9089908990889088908890600401612254565b602060405180830381600087803b1580156115f857600080fd5b505af1925050508015611628575060408051601f3d908101601f1916820190925261162591810190612149565b60015b61167157611634612ac6565b8061163f5750611659565b8060405162461bcd60e51b8152600401610384919061234c565b60405162461bcd60e51b81526004016103849061235f565b6001600160e01b0319811663bc197c8160e01b146113fa5760405162461bcd60e51b8152600401610384906123e8565b606060006116b08360026129c5565b6116bb9060026129ad565b67ffffffffffffffff8111156116e157634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561170b576020820181803683370190505b509050600360fc1b8160008151811061173457634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061177157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060006117958460026129c5565b6117a09060016129ad565b90505b6001811115611834576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106117e257634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061180657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c9361182d81612a27565b90506117a3565b5083156108285760405162461bcd60e51b8152600401610384906123b3565b61185d828261082f565b15610597576000828152602081815260408083206001600160a01b03851684529091529020805460ff19169055611892610aa1565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000610828836001600160a01b038416611ac7565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061193357634e487b7160e01b600052603260045260246000fd5b602090810291909101015292915050565b611956846001600160a01b0316611ac1565b15610df35760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e619061198f90899089908890889088906004016122b2565b602060405180830381600087803b1580156119a957600080fd5b505af19250505080156119d9575060408051601f3d908101601f191682019092526119d691810190612149565b60015b6119e557611634612ac6565b6001600160e01b0319811663f23a6e6160e01b146113fa5760405162461bcd60e51b8152600401610384906123e8565b6000826000018281548110611a3a57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b5490565b60009081526001919091016020526040902054151590565b60006001600160e01b03198216637965db0b60e01b14806103c357506103c382611be4565b611a9c868686868686610df3565b611aa461070d565b15610df35760405162461bcd60e51b8152600401610384906124ed565b3b151590565b60008181526001830160205260408120548015611bda576000611aeb6001836129e4565b8554909150600090611aff906001906129e4565b9050818114611b80576000866000018281548110611b2d57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080876000018481548110611b5e57634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611b9f57634e487b7160e01b600052603160045260246000fd5b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506103b2565b60009150506103b2565b6001600160e01b031981166301ffc9a760e01b14919050565b80356001600160a01b03811681146103c657600080fd5b600082601f830112611c24578081fd5b81356020611c39611c3483612989565b61295f565b8281528181019085830183850287018401881015611c55578586fd5b855b85811015611c7357813584529284019290840190600101611c57565b5090979650505050505050565b600082601f830112611c90578081fd5b813567ffffffffffffffff811115611caa57611caa612aaa565b611cbd601f8201601f191660200161295f565b818152846020838601011115611cd1578283fd5b816020850160208301379081016020019190915292915050565b60008060408385031215611cfd578182fd5b611d0683611bfd565b9150611d1460208401611bfd565b90509250929050565b600080600080600060a08688031215611d34578081fd5b611d3d86611bfd565b9450611d4b60208701611bfd565b9350604086013567ffffffffffffffff80821115611d67578283fd5b611d7389838a01611c14565b94506060880135915080821115611d88578283fd5b611d9489838a01611c14565b93506080880135915080821115611da9578283fd5b50611db688828901611c80565b9150509295509295909350565b600080600080600060a08688031215611dda578081fd5b611de386611bfd565b9450611df160208701611bfd565b93506040860135925060608601359150608086013567ffffffffffffffff811115611e1a578182fd5b611db688828901611c80565b600080600060608486031215611e3a578283fd5b611e4384611bfd565b9250602084013567ffffffffffffffff80821115611e5f578384fd5b611e6b87838801611c14565b93506040860135915080821115611e80578283fd5b50611e8d86828701611c14565b9150509250925092565b60008060008060808587031215611eac578384fd5b611eb585611bfd565b9350602085013567ffffffffffffffff80821115611ed1578485fd5b611edd88838901611c14565b94506040870135915080821115611ef2578384fd5b611efe88838901611c14565b93506060870135915080821115611f13578283fd5b50611f2087828801611c80565b91505092959194509250565b60008060408385031215611f3e578182fd5b611f4783611bfd565b915060208301358015158114611f5b578182fd5b809150509250929050565b60008060408385031215611f78578182fd5b611f8183611bfd565b946020939093013593505050565b600080600060608486031215611fa3578081fd5b611fac84611bfd565b95602085013595506040909401359392505050565b60008060008060808587031215611fd6578182fd5b611fdf85611bfd565b93506020850135925060408501359150606085013567ffffffffffffffff811115612008578182fd5b611f2087828801611c80565b60008060408385031215612026578182fd5b823567ffffffffffffffff8082111561203d578384fd5b818501915085601f830112612050578384fd5b81356020612060611c3483612989565b82815281810190858301838502870184018b101561207c578889fd5b8896505b848710156120a55761209181611bfd565b835260019690960195918301918301612080565b50965050860135925050808211156120bb578283fd5b506120c885828601611c14565b9150509250929050565b6000602082840312156120e3578081fd5b5035919050565b600080604083850312156120fc578182fd5b82359150611d1460208401611bfd565b6000806040838503121561211e578182fd5b50508035926020909101359150565b60006020828403121561213e578081fd5b813561082881612b6b565b60006020828403121561215a578081fd5b815161082881612b6b565b6000815180845260208085019450808401835b8381101561219457815187529582019590820190600101612178565b509495945050505050565b600081518084526121b78160208601602086016129fb565b601f01601f19169290920160200192915050565b60007f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000825283516122038160178501602088016129fb565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516122348160288401602088016129fb565b01602801949350505050565b6001600160a01b0391909116815260200190565b6001600160a01b0386811682528516602082015260a06040820181905260009061228090830186612165565b82810360608401526122928186612165565b905082810360808401526122a6818561219f565b98975050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a0608082018190526000906122ec9083018461219f565b979650505050505050565b6000602082526108286020830184612165565b60006040825261231d6040830185612165565b828103602084015261232f8185612165565b95945050505050565b901515815260200190565b90815260200190565b600060208252610828602083018461219f565b60208082526034908201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356040820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b606082015260800190565b6020808252818101527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604082015260600190565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b60208082526014908201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604082015260600190565b6020808252602b908201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60408201526a65726f206164647265737360a81b606082015260800190565b60208082526024908201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604082015263616e636560e01b606082015260800190565b6020808252602c908201527f455243313135355061757361626c653a20746f6b656e207472616e736665722060408201526b1dda1a5b19481c185d5cd95960a21b606082015260800190565b60208082526029908201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260408201526808185c1c1c9bdd995960ba1b606082015260800190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526032908201527f455243313135353a207472616e736665722063616c6c6572206973206e6f74206040820152711bdddb995c881b9bdc88185c1c1c9bdd995960721b606082015260800190565b60208082526023908201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526038908201527f455243313135355072657365744d696e7465725061757365723a206d7573742060408201527f68617665206d696e74657220726f6c6520746f206d696e740000000000000000606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b6020808252603b908201527f455243313135355072657365744d696e7465725061757365723a206d7573742060408201527f686176652070617573657220726f6c6520746f20756e70617573650000000000606082015260800190565b60208082526039908201527f455243313135355072657365744d696e7465725061757365723a206d7573742060408201527f686176652070617573657220726f6c6520746f20706175736500000000000000606082015260800190565b60208082526029908201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604082015268103337b91039b2b63360b91b606082015260800190565b60208082526029908201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604082015268040dad2e6dac2e8c6d60bb1b606082015260800190565b60208082526028908201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206040820152670dad2e6dac2e8c6d60c31b606082015260800190565b60208082526021908201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736040820152607360f81b606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201526e103937b632b9903337b91039b2b63360891b606082015260800190565b918252602082015260400190565b60405181810167ffffffffffffffff8111828210171561298157612981612aaa565b604052919050565b600067ffffffffffffffff8211156129a3576129a3612aaa565b5060209081020190565b600082198211156129c0576129c0612a94565b500190565b60008160001904831182151516156129df576129df612a94565b500290565b6000828210156129f6576129f6612a94565b500390565b60005b83811015612a165781810151838201526020016129fe565b838111156104b35750506000910152565b600081612a3657612a36612a94565b506000190190565b600281046001821680612a5257607f821691505b60208210811415612a7357634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415612a8d57612a8d612a94565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b60e01c90565b600060443d1015612ad657610714565b600481823e6308c379a0612aea8251612ac0565b14612af457610714565b6040513d600319016004823e80513d67ffffffffffffffff8160248401118184111715612b245750505050610714565b82840192508251915080821115612b3e5750505050610714565b503d83016020828401011115612b5657505050610714565b601f01601f1916810160200160405291505090565b6001600160e01b031981168114612b8157600080fd5b5056fea2646970667358221220a0379bb3f8d1780d58cef4262af5e15948b93555005e9b08eed4a70317cd863c64736f6c63430008000033";

type ERC1155PresetMinterPauserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155PresetMinterPauserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155PresetMinterPauser__factory extends ContractFactory {
  constructor(...args: ERC1155PresetMinterPauserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC1155PresetMinterPauser";
  }

  deploy(
    uri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155PresetMinterPauser> {
    return super.deploy(
      uri,
      overrides || {}
    ) as Promise<ERC1155PresetMinterPauser>;
  }
  getDeployTransaction(
    uri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri, overrides || {});
  }
  attach(address: string): ERC1155PresetMinterPauser {
    return super.attach(address) as ERC1155PresetMinterPauser;
  }
  connect(signer: Signer): ERC1155PresetMinterPauser__factory {
    return super.connect(signer) as ERC1155PresetMinterPauser__factory;
  }
  static readonly contractName: "ERC1155PresetMinterPauser";
  public readonly contractName: "ERC1155PresetMinterPauser";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155PresetMinterPauserInterface {
    return new utils.Interface(_abi) as ERC1155PresetMinterPauserInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155PresetMinterPauser {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC1155PresetMinterPauser;
  }
}
