import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <section className="bg-white py-10 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <p className="text-foreground/60 mb-8">
            Profile editing is coming soon. Check back later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-blush text-blush-foreground px-6 py-2.5 text-sm font-semibold hover:bg-blush/90 transition-all"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
