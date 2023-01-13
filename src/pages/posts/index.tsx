import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import styles from './style.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>13 de Janeiro de 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared button.</p>
                    </a>
                    <a href='#'>
                        <time>13 de Janeiro de 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared button.</p>
                    </a>
                    <a href='#'>
                        <time>13 de Janeiro de 2023</time>
                        <strong>Creating a Monorepo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared button.</p>
                    </a>                                        
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType(
        Prismic.predicate.at('document.type', 'post')
    , {
        fetch: ['post.title', 'post.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
            props: {}
        };
}