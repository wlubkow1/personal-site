export default function Contact() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-3">Contact</h1>
      <p className="text-gray-300 mb-6 text-sm">
        The easiest way to reach me is by email or LinkedIn.
      </p>

      <div className="space-y-3 text-sm text-gray-200">
        <p>
          Email:{" "}
          <a
            href="mailto:skiwojtek@gmail.com"
            className="text-indigo-400 hover:text-indigo-300"
          >
            skiwojtek@gmail.com
          </a>
        </p>

        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/wojciechlubkowski/"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-300"
          >
          linkedin.com/in/wojciechlubkowski/
          </a>
        </p>

        <p>
          GitHub:{" "}
          <a
            href="https://github.com/wlubkow1"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-300"
          >
            github.com/wlubkow1
          </a>
        </p>
      </div>
    </main>
  );
}
