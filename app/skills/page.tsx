"use client";

import { useState } from "react";

/* ---------- Skill data ---------- */

const skills = [
  {
    name: "Full-stack Web",
    level: "Strong",
    stack: ["TypeScript", "React", "Next.js", "Supabase", "Postgres"],
    exampleTitle: "Example: Know Your Notes",
    exampleDesc:
      "Fragrance discovery app with search, brand pages, collections, and accord visualizations backed by Supabase.",
  },
  {
    name: "Mobile / Desktop Apps",
    level: "Strong",
    stack: [".NET MAUI", "C#", "SQLite"],
    exampleTitle: "Example: FinanceFrenzy",
    exampleDesc:
      "Cross-platform finance app to track expenses, budgets, and savings with a clean, mobile-first UI.",
  },
  {
    name: "Game Development",
    level: "Comfortable",
    stack: ["Unity", "C#", "2D Pixel Art"],
    exampleTitle: "Example: Wizard Education Game",
    exampleDesc:
      "2D educational game with minigames, a shop, and an inventory system to teach math, spelling, and Spanish.",
  },
  {
    name: "Security / Malware Analysis",
    level: "Comfortable",
    stack: ["IDA Pro", "Ghidra", "Windows Internals"],
    exampleTitle: "Example: Malware Lab Work",
    exampleDesc:
      "Analyzed malware samples to understand API usage, persistence, and filesystem/registry/network behavior.",
  },
  {
    name: "Data / ML",
    level: "Comfortable",
    stack: ["Python", "pandas", "scikit-learn", "NumPy"],
    exampleTitle: "Example: Classifiers & Analysis",
    exampleDesc:
      "Built and evaluated classifiers on structured datasets, including feature engineering and model comparison.",
  },
  {
    name: "Teaching / Communication",
    level: "Strong",
    stack: ["TF / TA Roles", "Mentoring", "Writing"],
    exampleTitle: "Example: CS Teaching Fellow",
    exampleDesc:
      "Helped students in CS courses (Python, C/C++, Data Structures) through office hours, grading, and explanations.",
  },
];

/* ---------- BST (Data Structures) ---------- */

type TreeNode = {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function insertNode(root: TreeNode | null, key: number): TreeNode {
  if (!root) return { key, left: null, right: null };
  if (key < root.key) root.left = insertNode(root.left, key);
  else if (key > root.key) root.right = insertNode(root.right, key);
  return root;
}

function findMin(node: TreeNode): TreeNode {
  while (node.left) node = node.left;
  return node;
}

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (key < root.key) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.key) {
    root.right = deleteNode(root.right, key);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const minRight = findMin(root.right);
    root.key = minRight.key;
    root.right = deleteNode(root.right, minRight.key);
  }
  return root;
}

function buildLevels(root: TreeNode | null): (number | null)[][] {
  if (!root) return [];
  const levels: (number | null)[][] = [];
  type Item = { node: TreeNode | null; depth: number };
  const queue: Item[] = [{ node: root, depth: 0 }];

  while (queue.length) {
    const { node, depth } = queue.shift()!;
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push(node ? node.key : null);
    if (node) {
      queue.push({ node: node.left, depth: depth + 1 });
      queue.push({ node: node.right, depth: depth + 1 });
    }
  }

  while (levels.length && levels[levels.length - 1].every((v) => v === null)) {
    levels.pop();
  }

  return levels;
}

function inorder(root: TreeNode | null, res: number[] = []): number[] {
  if (!root) return res;
  inorder(root.left, res);
  res.push(root.key);
  inorder(root.right, res);
  return res;
}

function preorder(root: TreeNode | null, res: number[] = []): number[] {
  if (!root) return res;
  res.push(root.key);
  preorder(root.left, res);
  preorder(root.right, res);
  return res;
}

/* ---------- Sorting Algorithms ---------- */

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

type AlgoName = "bubble" | "merge" | "radix";

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr);
  let exp = 1;
  let output = [...arr];

  while (Math.floor(max / exp) > 0) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (const num of output) {
      const digit = Math.floor(num / exp) % 10;
      buckets[digit].push(num);
    }
    output = ([] as number[]).concat(...buckets);
    exp *= 10;
  }
  return output;
}

/* ---------- Page Component ---------- */

export default function SkillsPage() {
  // BST state
  const [bstRoot, setBstRoot] = useState<TreeNode | null>(null);
  const [bstInput, setBstInput] = useState("");

  // Sorting state
  const [arr, setArr] = useState<number[]>([]);
  const [algo, setAlgo] = useState<AlgoName>("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  function handleInsert() {
    const value = parseInt(bstInput, 10);
    if (isNaN(value)) return;
    setBstRoot((prev) => insertNode(prev, value));
    setBstInput("");
  }

  function handleDelete() {
    const value = parseInt(bstInput, 10);
    if (isNaN(value)) return;
    setBstRoot((prev) => deleteNode(prev, value));
    setBstInput("");
  }

  function generateArray() {
    if (isSorting) return;
    const newArr = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArr(newArr);
  }

  async function runSort() {
    if (isSorting || arr.length === 0) return;

    if (algo === "bubble") {
      setIsSorting(true);
      const a = [...arr];

      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          setActiveIndices([j, j + 1]);
          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
          }
          setArr([...a]);
          await sleep(25);
        }
      }

      setActiveIndices([]);
      setIsSorting(false);
    } else if (algo === "merge") {
      const sorted = mergeSort(arr);
      setArr(sorted);
      setActiveIndices([]);
    } else if (algo === "radix") {
      const sorted = radixSort(arr);
      setArr(sorted);
      setActiveIndices([]);
    }
  }

  const levels = buildLevels(bstRoot);
  const inorderVals = inorder(bstRoot);
  const preorderVals = preorder(bstRoot);

  return (
    <main className="space-y-10">
      {/* Skills Overview */}
      <section>
        <h1 className="text-3xl font-bold mb-2">Skills</h1>
        <p className="text-gray-300 text-sm mb-6">
          A quick overview of what I work with and concrete examples of where
          I&apos;ve used those skills. Scroll down for a small computer science
          playground with data structures and algorithms, or{" "}
          <a
            href="/projects"
            className="text-indigo-300 hover:text-indigo-200"
          >
            jump to projects →
          </a>
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {skills.map((skill) => (
            <section
              key={skill.name}
              className="border border-gray-800 rounded-2xl p-4 bg-black/60 hover:border-indigo-400 hover:bg-black/80 transition"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-lg font-semibold">{skill.name}</h2>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {skill.level}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {skill.stack.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-slate-900 border border-slate-700 text-gray-200 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 mb-1">
                {skill.exampleTitle}
              </p>
              <p className="text-sm text-gray-200">{skill.exampleDesc}</p>
            </section>
          ))}
        </div>
      </section>

      {/* CS Playground */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Computer Science Playground</h2>
        <p className="text-gray-300 text-sm mb-4">
          A small interactive space to show that I actually enjoy the classic
          data structures and algorithms, not just the buzzwords.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Data Structures: BST */}
          <div className="border border-gray-800 rounded-2xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-2">
              Data Structures: Binary Search Tree
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Insert and delete integers to see how a BST changes. The inorder
              traversal is always sorted if the tree is correct.
            </p>

            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={bstInput}
                onChange={(e) => setBstInput(e.target.value)}
                placeholder="Enter a number"
                className="bg-black border border-gray-700 rounded-lg px-3 py-1 text-sm flex-1"
              />
              <button
                onClick={handleInsert}
                className="bg-indigo-600 px-3 py-1 rounded-lg text-xs hover:bg-indigo-500"
              >
                Insert
              </button>
              <button
                onClick={handleDelete}
                className="bg-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-600"
              >
                Delete
              </button>
            </div>

            <div className="mb-3 text-xs text-gray-300 space-y-1">
              <p>
                <span className="text-gray-400">Inorder:</span>{" "}
                {inorderVals.length ? inorderVals.join(", ") : "—"}
              </p>
              <p>
                <span className="text-gray-400">Preorder:</span>{" "}
                {preorderVals.length ? preorderVals.join(", ") : "—"}
              </p>
            </div>

            <div className="border border-gray-800 rounded-lg p-3 bg-black/70 text-center text-xs text-gray-300">
              {levels.length === 0 ? (
                <p className="text-gray-500">Tree is empty. Insert a value.</p>
              ) : (
                levels.map((level, depth) => (
                  <div
                    key={depth}
                    className="flex justify-center gap-4 mb-2"
                  >
                    {level.map((val, idx) =>
                      val === null ? (
                        <div key={idx} className="w-8 h-8" />
                      ) : (
                        <div
                          key={idx}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-indigo-400 text-[11px]"
                        >
                          {val}
                        </div>
                      )
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Algorithms: Sorting */}
          <div className="border border-gray-800 rounded-2xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-2">
              Algorithms: Sorting (Bubble, Merge, Radix)
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Generate a random array and run different sorting algorithms.
              Bubble sort is animated; merge sort and radix sort show the result
              computed with their actual logic.
            </p>

            <div className="flex flex-wrap gap-2 mb-3 items-center">
              <button
                onClick={generateArray}
                disabled={isSorting}
                className="bg-indigo-600 px-3 py-1 rounded-lg text-xs hover:bg-indigo-500 disabled:opacity-50"
              >
                Generate array
              </button>

              <button
                onClick={runSort}
                disabled={isSorting || arr.length === 0}
                className="bg-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-600 disabled:opacity-50"
              >
                Run{" "}
                {algo === "bubble"
                  ? "Bubble Sort"
                  : algo === "merge"
                  ? "Merge Sort"
                  : "Radix Sort"}
              </button>

              <select
                value={algo}
                onChange={(e) => setAlgo(e.target.value as AlgoName)}
                disabled={isSorting}
                className="bg-black border border-gray-700 text-xs rounded-lg px-2 py-1"
              >
                <option value="bubble">Bubble Sort (O(n²), animated)</option>
                <option value="merge">Merge Sort (O(n log n))</option>
                <option value="radix">Radix Sort (O(k·n))</option>
              </select>
            </div>

            <div className="border border-gray-800 rounded-lg p-3 bg-black/70">
              {arr.length === 0 ? (
                <p className="text-xs text-gray-500 text-center">
                  Click &quot;Generate array&quot; to start.
                </p>
              ) : (
                <>
                  <div className="flex items-end gap-[3px] h-40 mb-2">
                    {arr.map((value, idx) => {
                      const isActive = activeIndices.includes(idx);
                      return (
                        <div
                          key={idx}
                          className={`rounded-t ${
                            isActive ? "bg-purple-400" : "bg-indigo-400"
                          }`}
                          style={{
                            height: `${value * 1.6}px`,
                            width: `${100 / arr.length}%`,
                          }}
                        />
                      );
                    })}
                  </div>
                    <div className="mt-2 text-[11px] text-gray-300">
                    <div className="flex">
                        {arr.map((value, idx) => {
                        const isActive = activeIndices.includes(idx);
                        return (
                            <div
                            key={idx}
                            className={`text-center ${
                                isActive ? "text-purple-300 font-semibold" : ""
                            }`}
                            style={{ width: `${100 / arr.length}%` }}
                            >
                            {value}
                            </div>
                        );
                        })}
                    </div>
                    </div>

                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
