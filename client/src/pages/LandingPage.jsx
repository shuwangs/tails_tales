import { IoArrowForward, IoPawOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LandingPage() {
	const { session } = useAuth();
	const startPath = session ? "/entries" : "/register";
	return (
		<div className="min-h-screen text-amber-950">
			<header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-amber-200 px-6 py-6">
				<Link to="/" className="flex items-center gap-2 text-xl font-semibold">
					<IoPawOutline /> Tails & Tales
				</Link>
				<nav aria-label="Main navigation" className="flex items-center gap-6">
					<a href="#how-it-works" className="hidden hover:underline sm:block">
						How it works
					</a>
					<Link
						to={session ? "/entries" : "/login"}
						className="font-semibold underline underline-offset-4"
					>
						{session ? "My diary" : "Log in"}
					</Link>
				</nav>
			</header>

			<main>
				<section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-24">
					<div>
						<p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
							Little moments. Lasting memories.
						</p>
						<h1 className="!my-0 !text-5xl leading-tight font-heading sm:!text-7xl">
							Every tail has
							<br />a tale to tell.
						</h1>
						<p className="mt-6 max-w-md text-lg leading-relaxed text-amber-800">
							The sleepy stretches, muddy paws, and everyday adventures. Give
							your pet’s little moments a place to live.
						</p>
						<Link
							to={startPath}
							className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-800 px-7 py-4 font-semibold text-white transition-colors hover:bg-amber-900"
						>
							{session ? "Open your diary" : "Start your pet’s diary"}
							<IoArrowForward aria-hidden="true" />
						</Link>
						<p className="mt-4 text-sm text-amber-700">
							A little home for your favorite memories.
						</p>
					</div>

					<div className="relative">
						<article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-amber-950/5 sm:p-8">
							<p className="text-sm text-amber-700">
								Sample diary · A sunny afternoon
							</p>
							<img
								src="/illustrations/sunny-cat.svg"
								alt="A sleepy ginger cat curled up in a soft patch of sunlight by the window"
								width="480"
								height="300"
								className="my-6 w-full rounded-xl"
							/>
							<h2 className="font-heading text-4xl">
								A sunbeam with my name on it
							</h2>
							<p className="mt-4 leading-7 text-amber-800">
								Found the warmest spot by the window. Watched three birds.
								Knocked one pen off the desk. A very productive afternoon, if
								you ask me.
							</p>
							<p className="mt-6 border-t border-amber-100 pt-4 text-sm text-amber-700">
								Mood: cozy · A little purr, a perfect day
							</p>
						</article>
					</div>
				</section>

				<section
					id="how-it-works"
					className="border-y border-amber-200 bg-amber-100/50 px-6 py-16"
				>
					<div className="mx-auto max-w-6xl">
						<p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
							Make room for the everyday
						</p>
						<h2 className="mt-3 font-heading text-4xl sm:text-5xl">
							Your pet’s story, one day at a time.
						</h2>
						<ol className="mt-10 grid gap-10 md:grid-cols-3">
							{[
								[
									"01",
									"Meet your main character",
									"Create a profile for your cat or dog. Their name belongs at the top of the story.",
								],
								[
									"02",
									"Keep a little moment",
									"Write a diary entry, add a mood, and save the day’s adventures in your own words.",
								],
								[
									"03",
									"Wander down memory lane",
									"Browse your entries by date or search for a memory you want to revisit.",
								],
							].map(([number, title, description]) => (
								<li key={number} className="border-t border-amber-300 pt-5">
									<span className="font-heading text-3xl text-amber-600">
										{number}
									</span>
									<h3 className="mt-3 text-xl font-semibold">{title}</h3>
									<p className="mt-3 leading-7 text-amber-800">{description}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className="mx-auto max-w-3xl px-6 py-20 text-center">
					<h2 className="mt-5 font-heading text-4xl sm:text-5xl">
						Today’s ordinary is tomorrow’s favorite memory.
					</h2>
					<Link
						to={startPath}
						className="mt-7 inline-flex items-center gap-3 font-semibold text-amber-800 underline underline-offset-8"
					>
						{session ? "Back to your diary" : "Create your account"}
						<IoArrowForward aria-hidden="true" />
					</Link>
				</section>
			</main>
			<footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-amber-200 px-6 py-6 text-sm text-amber-700">
				<span>Tails & Tales</span>
				<span>For the stories behind the paw prints.</span>
			</footer>
		</div>
	);
}
