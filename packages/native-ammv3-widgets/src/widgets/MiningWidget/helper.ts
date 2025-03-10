import { MiningApi } from '@native-ammv3/api';
import { contractRequests } from '../../constants/api';

export const miningApi = new MiningApi({
  contractRequests,
});
