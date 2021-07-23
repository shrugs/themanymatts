import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  ListItem,
  OrderedList,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Eckles from 'eckles';
import { ethers } from 'ethers';
import { parseJwk } from 'jose/jwk/parse';
import { SignJWT } from 'jose/jwt/sign';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useClipboard from 'react-use-clipboard';
import createPersistedState from 'use-persisted-state';
import weighted from 'weighted';

const audience = 'drop.nifti.es';
const DECIMALS = ethers.BigNumber.from(2);
const ONE = ethers.BigNumber.from(1);
const SATS_PER_STICKER = ethers.BigNumber.from(10).pow(DECIMALS);
const ONE_WITH_DECIMALS = ethers.utils.hexlify(ONE.mul(SATS_PER_STICKER));

async function signMintGrant(id: string, pem: string, issuer: string) {
  const jwk = await Eckles.import({ pem });
  const key = await parseJwk(jwk, 'ES256');

  return await new SignJWT({
    grant: {
      type: 'mint',
      ids: [ethers.utils.hexlify(ethers.BigNumber.from(id))],
      amounts: [ONE_WITH_DECIMALS],
      assetType: 'eip155:1/erc1155:0x28959cf125ccb051e70711d0924a62fb28eaf186',
    },
  })
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .sign(key);
}

const toExponentialWeights = (ids: string[]) =>
  ids.reduce((memo, id, i) => ({ ...memo, [id]: i + 1 }), {});

const useIssuerState = createPersistedState('issuer');
const _useTokenIdsState = createPersistedState('tokenIds');
const useSecretState = createPersistedState('secret');

const EMPTY_TOKEN_ID = '';

function useAfterServerRender() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(true);
  }, []);

  return value;
}

function useTokenIdsState() {
  const [tokenIds, setTokenIds] = _useTokenIdsState<string[]>([EMPTY_TOKEN_ID]);

  const addTokenId = useCallback(() => setTokenIds([...tokenIds, EMPTY_TOKEN_ID]), [
    setTokenIds,
    tokenIds,
  ]);
  const removeAtIndex = useCallback(
    (index: number) => setTokenIds((ids) => [...ids.slice(0, index), ...ids.slice(index + 1)]),
    [setTokenIds],
  );
  const setAtIndex = useCallback(
    (index: number, value: string) =>
      setTokenIds((ids) => ids.map((id, i) => (i === index ? value : id))),
    [setTokenIds],
  );

  return { tokenIds, addTokenId, setAtIndex, removeAtIndex };
}

function isInteger(i: string) {
  try {
    parseInt(i, 10);
    return true;
  } catch (error) {
    return false;
  }
}

function Dashboard() {
  const asr = useAfterServerRender();
  const { tokenIds, addTokenId, setAtIndex, removeAtIndex } = useTokenIdsState();
  const [issuer, setIssuer] = useIssuerState('');
  const [secret, setSecret] = useSecretState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [token, setToken] = useState<string>();

  const [isCopied, setCopied] = useClipboard(`https://drop.nifti.es/${token}`, {
    successDuration: 1000,
  });

  const validTokenIds = useMemo(
    () => tokenIds.filter(Boolean).filter((id: string) => isInteger(id)),
    [tokenIds],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setToken(null);
      try {
        // select a token id, exponentially weighted
        const items = toExponentialWeights(validTokenIds);
        const id = weighted(items) as string;

        // build the token
        const token = await signMintGrant(id, secret, issuer);

        setToken(token);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [issuer, secret, validTokenIds],
  );

  const canGenerate = validTokenIds.length > 0 && !!issuer && !!secret;

  return (
    <VStack
      minHeight="100vh"
      py={16}
      px={8}
      spacing={16}
      width="full"
      maxWidth="2xl"
      mx="auto"
      align="stretch"
      alignItems="stretch"
    >
      <Heading as="h1" textAlign="center">
        👀 Matts-only 👀
      </Heading>

      <VStack
        as="form"
        id="form"
        onSubmit={onSubmit}
        align="stretch"
        alignItems="stretch"
        spacing={8}
      >
        <Button onClick={setCopied} isDisabled={!token}>
          {isCopied
            ? 'Copied 🤙'
            : token
            ? `Click to copy URL: (...${token?.slice(token.length - 8, token.length)})`
            : `Generate a token first`}
        </Button>

        {/* IDK why asr is needed here, but emotion isn't happy about it */}
        {asr && (
          <Button
            type="submit"
            form="form"
            isLoading={loading}
            loadingText="Generating"
            isDisabled={!canGenerate}
          >
            Generate
          </Button>
        )}

        <Divider />

        <Heading as="h2" size="md">
          Fill these out:
        </Heading>

        <FormControl id="tokenIds">
          <FormLabel>Token Ids (weighted by index)</FormLabel>

          <VStack spacing={2} align="stretch">
            <OrderedList spacing={2}>
              {asr &&
                tokenIds.map((id, i) => (
                  <ListItem key={i}>
                    <HStack spacing={4}>
                      <Input
                        type="text"
                        value={id}
                        onChange={(e) => setAtIndex(i, e.target.value)}
                      />
                      <Button onClick={() => removeAtIndex(i)}>x</Button>
                    </HStack>
                  </ListItem>
                ))}
            </OrderedList>

            <Button onClick={addTokenId}>Add Token Id</Button>
          </VStack>
        </FormControl>

        <FormControl id="issuer">
          <FormLabel>Issuer</FormLabel>
          <Input type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
        </FormControl>

        <FormControl id="secret">
          <FormLabel>Secret</FormLabel>
          <Textarea
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder={'-----BEGIN EC PRIVATE KEY-----\n\n-----END EC PRIVATE KEY-----'}
          />
        </FormControl>

        {error && (
          <Alert status="error">
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </VStack>
    </VStack>
  );
}

export default Dashboard;
