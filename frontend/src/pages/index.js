import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>OpenChallenge - Home</title>
        <meta name="description" content="Página inicial do OpenChallenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Bem-vindo ao OpenChallenge!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Sua plataforma para desafios de programação e gamificação.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Começar um Desafio
        </button>
      </main>
    </div>
  );
}
