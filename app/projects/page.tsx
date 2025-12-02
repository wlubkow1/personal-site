import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-2">Projects</h1>
      <p className="text-gray-300 mb-8 text-sm">
        Projects I have created, or am actively working on.
      </p>

      <div className="space-y-6">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="border border-indigo-500/40 rounded-2xl p-5 bg-black/60 hover:border-indigo-400 hover:bg-black/80 transition shadow-lg shadow-black/40"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              {p.role && (
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  {p.role}
                </p>
              )}
            </div>

            <p className="text-gray-300 text-sm mb-3">{p.description}</p>

            {p.highlight && (
              <p className="text-xs text-indigo-300 mb-3">★ {p.highlight}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {p.stack.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-slate-900 border border-slate-700 text-gray-200 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  GitHub →
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
