function TerminalLine({ prompt, text }: { prompt: string; text: string }) {
  return (
    <div className="font-mono text-sm text-emerald-300">
      <span className="text-emerald-400">{prompt}</span>
      <span className="ml-2">{text}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="space-y-10">
      {/* Hero */}
      <section className="space-y-5">
        {/* <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-300">
          Software Engineer · CS @ UMBC
        </p> */}

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Hey, I&apos;m{" "}
          <span className="text-indigo-300 drop-shadow-[0_0_18px_rgba(129,140,248,0.60)]">
            Wojciech
          </span>
          .
        </h1>

        <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
          I&apos;m finishing
          my B.S in CS at UMBC and looking forward to entering the workforce come my December 2025 graduation date. As an aspiring 
          Software Engineer, I&apos;m excited to find a team
          where I will be pushed to my fullest and actively learn new things!
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/projects"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-500/30"
          >
            View Projects
          </a>
          <a
            href="/septemberCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-500/70 hover:bg-gray-900 px-4 py-2 rounded-lg text-sm transition"
          >
            Download Resume
          </a>
        </div>
      </section>

      {/* Mini terminal */}
      <section className="bg-black/70 border border-gray-800 rounded-2xl p-4 shadow-xl shadow-black/60">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-gray-400 ml-2">woj@portfolio:~</span>
        </div>
        <TerminalLine prompt="> who =" text="Wojciech Lubkowski" />
        <TerminalLine
          prompt="> focus ="
          text="[Full-stack, Back-End, Database, Security, AI/ML]"
        />
        <TerminalLine
          prompt="> current ="
          text="Finishing CS @ UMBC · Learning new frameworks"
        />
        <TerminalLine
          prompt="> next ="
          text="Full-Stack Software Engineer where I can impact my team"
        />
      </section>

      {/* Quick stats */}
      <section className="grid sm:grid-cols-3 gap-4">
        <div className="border border-gray-800 rounded-xl p-4 bg-black/60">
          <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-wide">
            Most Familiar Stack
          </p>
          <p className="font-semibold text-sm">
            C# · .NET MAUI · SQLite
          </p>
        </div>
        <div className="border border-gray-800 rounded-xl p-4 bg-black/60">
          <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-wide">
            Other tools
          </p>
          <p className="font-semibold text-sm">
            Python, React, Node, C/C++, HTML/CSS/JS, Typescript
          </p>
        </div>
        <div className="border border-gray-800 rounded-xl p-4 bg-black/60">
          <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-wide">
            Currently Learning
          </p>
          <p className="font-semibold text-sm">
            Malware analysis, reverse engineering, making UI look less boring.
          </p>
        </div>
      </section>

      {/* What I'm looking for */}
      <section className="border border-gray-800 rounded-xl p-4 bg-black/70">
        <h2 className="text-sm font-semibold text-gray-100 mb-1">
          What I&apos;m looking for
        </h2>
        <p className="text-sm text-gray-300">
          Entry-level software engineering roles where I can work across the
          stack, ship real features, and collaborate with a strong team; web,
          backend, or security-focused work are all on the table.
        </p>
      </section>
    </main>
  );
}
