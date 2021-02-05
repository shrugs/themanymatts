import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import createPersistedState from 'use-persisted-state';

const usePasswordState = createPersistedState('password');

function Dashboard() {
  const [password, setPassword] = usePasswordState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [token, setToken] = useState<string>();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setLoading(true);
      try {
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setToken(data.token);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [password],
  );

  return (
    <VStack
      minHeight="100vh"
      p={16}
      spacing={16}
      width="full"
      maxWidth="2xl"
      mx="auto"
      align="start"
      alignItems="stretch"
    >
      <Heading as="h1" textAlign="center">
        👀 Matt-only 👀
      </Heading>

      {token ? (
        <Link href={`https://drop.nifti.es/${token}`}>Copy me</Link>
      ) : (
        <VStack
          as="form"
          id="form"
          onSubmit={onSubmit}
          align="start"
          alignItems="stretch"
          spacing={8}
        >
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          {error && (
            <Alert status="error">
              <AlertTitle mr={2}>Error:</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" form="form" isLoading={loading} loadingText="Generating">
            Generate
          </Button>
        </VStack>
      )}
    </VStack>
  );
}

export default Dashboard;
