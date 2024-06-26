import Head from "next/head";

function HeadSgme({title}) {
    return(
        <Head>
            <title>{title}</title>
            <meta name="description" content="Generated by create next app"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.svg"/>
        </Head>
    )
}

export default HeadSgme;