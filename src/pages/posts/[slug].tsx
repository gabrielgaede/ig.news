import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { client } from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import styles from './post.module.scss';
import { redirect } from "next/dist/server/api-utils";

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps){
    return (
        <>
            <Head>
                <title>{post.title} | ig.news</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params

    //console.log(session);

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }

    }

    const response = await client.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: response.data.title,
        content:  prismicH.asHTML(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        }
    }
}