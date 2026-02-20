import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Delicious Food Delivered To Your Doorstep
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Order from top local restaurants with just a few clicks. Fast delivery, fresh food, and great service.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-black px-8 py-6 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              href="/restaurants"
            >
              Order Now
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-8 py-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
