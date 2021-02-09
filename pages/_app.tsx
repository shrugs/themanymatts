import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'client/lib/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          key="google"
          href="//fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextSeo
        title="✋ themanymatts"
        description="Matt Condon has a chip in his hand that dispenses rare, digital matt stickers... but only if you
            find him IRL. There are many matts, but one could be yours."
        openGraph={{
          site_name: '✋ themanymatts',
          // images: [
          //   {
          //     url: 'https://themanymatts.lol/meta.png',
          //     // width: 800,
          //     // height: 600,
          //     // alt: 'Og Image Alt',
          //   },
          // ],
        }}
        twitter={{
          handle: '@mattgcondon',
          cardType: 'summary_large_image',
        }}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
