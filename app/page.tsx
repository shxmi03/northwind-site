export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <main className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Northwind — site in build
        </h1>
        <p className="text-lg text-zinc-400">
          Infrastructure and GitHub Pages deployment pipeline initialized successfully.
        </p>
      </main>
    </div>
  );
}
