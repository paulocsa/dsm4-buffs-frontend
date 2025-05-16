import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { applyLayout } from "@/utils/LayoutUtil.js";
import ProtectedRoute from '@/components/protectedRoute';
import Head from "next/head";

const publicPaths = ['/auth/login', '/auth/register']; // rotas públicas, sem proteção

export default function App({ Component, pageProps, router }) {
  const getLayout = applyLayout(Component);

  // Verifica se a rota atual é pública
  const isPublicRoute = publicPaths.includes(router.pathname);

  const pageContent = isPublicRoute ? (
    <Component {...pageProps} />
  ) : (
    <ProtectedRoute>
      <Component {...pageProps} />
    </ProtectedRoute>
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout(pageContent)}
    </>
  );
}
