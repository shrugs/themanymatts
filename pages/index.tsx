import { Divider, Heading, Link, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { Pill } from 'client/components/Pill';

export default function Home() {
  return (
    <VStack minHeight="100vh" py={16} spacing={16} width="full" maxWidth="2xl" mx="auto">
      <VStack px={8} spacing={16} align="start">
        <Heading as="h1" fontSize={['2xl', '3xl', '4xl', '5xl']}>
          <Pill prefix="✋">themanymatts</Pill>
        </Heading>
        <Heading as="h2" fontSize={['md', 'lg', 'xl']} lineHeight="tall">
          <Link href="https://twitter.com/mattgcondon" isExternal>
            <Pill prefix="👀">Matt Condon</Pill>
          </Link>{' '}
          has a chip in his hand that dispenses rare, digital matt stickers... but only if you find
          him IRL.
        </Heading>
        <Heading as="h2" fontSize="md" lineHeight="tall">
          there are many <Pill prefix="❏">matts</Pill>, but one of them could be yours.
        </Heading>
      </VStack>
      <Divider />
      <VStack px={8} spacing={8} align="start">
        <Heading as="h3">wut on earth</Heading>
        <Heading as="h4" fontSize="base" lineHeight="tall" fontWeight="normal">
          themanymatts are rare digital stickers, proof-of-matt-proximity, and weird art objects.
        </Heading>
        <UnorderedList spacing={4}>
          <ListItem>
            yes, i literally have an NFC chip in my hand and you can scan it with your phone
          </ListItem>
          <ListItem>
            you can only get a sticker by finding <Pill prefix="❏">matts</Pill> IRL
            <UnorderedList>
              <ListItem>find me personally and scan my hand, or</ListItem>
              <ListItem>
                find one of the many matt stickers around the world and send it to me on{' '}
                <Link href="https://twitter.com/mattgcondon" isExternal>
                  <Pill prefix="🐦">Twitter</Pill>
                </Link>{' '}
                or{' '}
                <Link href="https://instagram.com/oneofthemanymatts" isExternal>
                  <Pill prefix="📸">Instagram</Pill>
                </Link>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Pill prefix="❏">matts</Pill> are the first non-fungible social token
          </ListItem>
          <ListItem>
            <Pill prefix="❏">matts</Pill> are distributed with gas-less metatransactions via{' '}
            <Link href="https://drop.nifi.es" isExternal>
              <Pill prefix="📦">drop.nifi.es</Pill>
            </Link>
          </ListItem>
          <ListItem>
            ...and maybe something special will come to those who own a <Pill prefix="❏">matt</Pill>{' '}
            .
          </ListItem>
        </UnorderedList>
      </VStack>
      <Divider />
      <VStack align="start" spacing={8} px={8}>
        <Heading as="h3">gotta hand it to &apos;em</Heading>
        <Text textStyle="highlightable" lineHeight="taller">
          <Pill prefix="✋">themanymatts</Pill> is a{' '}
          <Link href="https://nifti.es" isExternal>
            <Pill prefix="❏">nifti.es</Pill>
          </Link>{' '}
          project by
          <Link href="https://twitter.com/mattgcondon" isExternal>
            <Pill prefix="🐦">Matt Condon</Pill>
          </Link>
          . You can view, edit, and audit the code on{' '}
          <Link href="https://github.com/shrugs/themanymatts" isExternal>
            <Pill prefix="📂">GitHub</Pill>
          </Link>
          .
        </Text>
      </VStack>
    </VStack>
  );
}
