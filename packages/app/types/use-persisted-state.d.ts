import type { Dispatch, SetStateAction } from 'react';

declare function createPersistedState(
  key: string,
  provider?: Pick<Storage, 'getItem' | 'setItem'>,
): <S>() => [S | undefined, Dispatch<SetStateAction<S | undefined>>];

export as namespace createPersistedState;
export default createPersistedState;
