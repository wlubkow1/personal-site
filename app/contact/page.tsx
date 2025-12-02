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
            href="mailto:youremail@umbc.edu"
            className="text-indigo-400 hover:text-indigo-300"
          >
            youremail@umbc.edu
          </a>
        </p>

        <p>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-300"
          >
            linkedin.com/in/yourprofile
          </a>
        </p>

        <p>
          GitHub:{" "}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-300"
          >
            github.com/yourusername
          </a>
        </p>
      </div>
    </main>
  );
}
