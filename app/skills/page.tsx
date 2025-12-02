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

/* ---------- ML Playground: toy classifiers + k-means ---------- */

type LabeledPoint = {
  x: number; // 0..1
  y: number; // 0..1
  label: 0 | 1;
};

const labeledData: LabeledPoint[] = [
  { x: 0.15, y: 0.2, label: 0 },
  { x: 0.2, y: 0.3, label: 0 },
  { x: 0.25, y: 0.15, label: 0 },
  { x: 0.3, y: 0.25, label: 0 },
  { x: 0.35, y: 0.2, label: 0 },
  { x: 0.75, y: 0.7, label: 1 },
  { x: 0.8, y: 0.8, label: 1 },
  { x: 0.9, y: 0.65, label: 1 },
  { x: 0.7, y: 0.85, label: 1 },
  { x: 0.6, y: 0.7, label: 1 },
  // a bit of overlap
  { x: 0.45, y: 0.4, label: 0 },
  { x: 0.55, y: 0.55, label: 1 },
];

type MLAlgoName = "knn" | "svm" | "kernelSvm" | "tree" | "forest";

function distSq(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function getKnnIndices(
  data: LabeledPoint[],
  point: { x: number; y: number },
  k: number
): number[] {
  return data
    .map((p, idx) => ({ idx, d: distSq(p, point) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((v) => v.idx);
}

function knnPredict(
  data: LabeledPoint[],
  point: { x: number; y: number },
  k: number
): 0 | 1 {
  const idxs = getKnnIndices(data, point, k);
  let count0 = 0;
  let count1 = 0;
  idxs.forEach((i) => {
    if (data[i].label === 0) count0++;
    else count1++;
  });
  return count1 > count0 ? 1 : 0;
}

// simple linear SVM-style boundary
function svmPredict(point: { x: number; y: number }): 0 | 1 {
  // w = [1, -1], b ~ 0 => diagonal line
  const score = point.x - point.y;
  return score >= 0 ? 1 : 0;
}

// radial "kernel" SVM demo: circle around center
function kernelSvmPredict(point: { x: number; y: number }): 0 | 1 {
  const center = { x: 0.5, y: 0.5 };
  const r2 = distSq(point, center);
  return r2 < 0.12 ? 0 : 1; // inside circle vs outside
}

// tiny hand-crafted decision tree
function treePredict(point: { x: number; y: number }): 0 | 1 {
  if (point.x < 0.35) return 0;
  if (point.y > 0.75) return 1;
  return point.x + point.y < 1 ? 0 : 1;
}

// random forest = majority vote of a few simple trees
function forestPredict(point: { x: number; y: number }): 0 | 1 {
  const voters: (0 | 1)[] = [];

  // tree 1
  voters.push(point.x < 0.4 ? 0 : 1);

  // tree 2
  voters.push(point.y > 0.65 ? 1 : 0);

  // tree 3
  voters.push(point.x + point.y < 1 ? 0 : 1);

  const ones = voters.filter((v) => v === 1).length;
  const zeros = voters.length - ones;
  return ones > zeros ? 1 : 0;
}

function predictML(
  algo: MLAlgoName,
  data: LabeledPoint[],
  point: { x: number; y: number },
  k: number
): 0 | 1 {
  switch (algo) {
    case "knn":
      return knnPredict(data, point, k);
    case "svm":
      return svmPredict(point);
    case "kernelSvm":
      return kernelSvmPredict(point);
    case "tree":
      return treePredict(point);
    case "forest":
      return forestPredict(point);
    default:
      return 0;
  }
}

/* k-means (unsupervised) */

type Point2D = { x: number; y: number };

const rawPoints: Point2D[] = [
  { x: 0.2, y: 0.2 },
  { x: 0.25, y: 0.3 },
  { x: 0.3, y: 0.25 },
  { x: 0.75, y: 0.7 },
  { x: 0.8, y: 0.75 },
  { x: 0.9, y: 0.65 },
  { x: 0.55, y: 0.2 },
  { x: 0.6, y: 0.25 },
  { x: 0.15, y: 0.75 },
  { x: 0.2, y: 0.8 },
  { x: 0.4, y: 0.55 },
  { x: 0.45, y: 0.6 },
];

type KMeansResult = {
  assignments: number[];
  centroids: Point2D[];
};

function kmeans(points: Point2D[], k: number, iterations = 8): KMeansResult {
  if (k <= 0) {
    return { assignments: points.map(() => 0), centroids: [] };
  }

  // initialize centroids as first k points (good enough for demo)
  let centroids = points.slice(0, k).map((p) => ({ ...p }));
  let assignments = points.map(() => 0);

  for (let it = 0; it < iterations; it++) {
    // assign
    assignments = points.map((p) => {
      let bestIdx = 0;
      let bestDist = Infinity;
      centroids.forEach((c, idx) => {
        const d = distSq(p, c);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      });
      return bestIdx;
    });

    // recompute centroids
    const sums: { x: number; y: number; count: number }[] = Array.from(
      { length: k },
      () => ({ x: 0, y: 0, count: 0 })
    );

    points.forEach((p, i) => {
      const cluster = assignments[i];
      sums[cluster].x += p.x;
      sums[cluster].y += p.y;
      sums[cluster].count += 1;
    });

    centroids = sums.map((s, idx) =>
      s.count === 0 ? centroids[idx] : { x: s.x / s.count, y: s.y / s.count }
    );
  }

  return { assignments, centroids };
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

  // ML playground state
  const [mlAlgo, setMlAlgo] = useState<MLAlgoName>("knn");
  const [kValue, setKValue] = useState(3);
  const [testPoint, setTestPoint] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });

  // k-means state
  const [kClusters, setKClusters] = useState(3);
  const [assignments, setAssignments] = useState<number[]>(
    rawPoints.map(() => 0)
  );
  const [centroids, setCentroids] = useState<Point2D[]>([]);

  /* ---- BST handlers ---- */

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

  /* ---- Sorting handlers ---- */

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

  /* ---- ML playground derived values ---- */

  const knnNeighbors =
    mlAlgo === "knn" ? getKnnIndices(labeledData, testPoint, kValue) : [];
  const mlPrediction = predictML(mlAlgo, labeledData, testPoint, kValue);

  function runKMeans() {
    const k = Math.max(1, Math.min(5, kClusters));
    const { assignments, centroids } = kmeans(rawPoints, k);
    setAssignments(assignments);
    setCentroids(centroids);
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
          I&apos;ve used those skills. Scroll down for interactive demos of
          classic data structures, algorithms, and some machine learning.
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
        <h2 className="text-2xl font-bold mb-2">
          Computer Science Algorithms and Data Structures
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          Interactive designs I created to prove my knowledge of core CS
          concepts like trees and sorting.
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

      {/* ML Playground */}
      <section>
        <h2 className="text-2xl font-bold mb-2">
          Machine Learning Algorithms
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          Demos of common logistic regression tools and unsupervised learning models in machine learning and data science. 
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Supervised: classifiers */}
          <div className="border border-gray-800 rounded-2xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-2">
              Supervised Learning: Toy Classifier
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Training points are fixed; move the test point and switch
              algorithms to see how the predicted class changes.
            </p>

            <div className="flex flex-wrap gap-2 mb-3 items-center">
              <select
                value={mlAlgo}
                onChange={(e) => setMlAlgo(e.target.value as MLAlgoName)}
                className="bg-black border border-gray-700 text-xs rounded-lg px-2 py-1"
              >
                <option value="knn">k-Nearest Neighbors</option>
                <option value="svm">Linear SVM</option>
                <option value="kernelSvm">Kernel SVM (RBF-style)</option>
                <option value="tree">Decision Tree</option>
                <option value="forest">Random Forest</option>
              </select>

              {mlAlgo === "knn" && (
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-gray-400">k =</span>
                  <input
                    type="number"
                    min={1}
                    max={labeledData.length}
                    value={kValue}
                    onChange={(e) =>
                      setKValue(
                        Math.min(
                          labeledData.length,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-14 bg-black border border-gray-700 rounded px-2 py-0.5"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {/* controls for test point */}
              <div className="text-[11px] text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-10 text-gray-400">x₁</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(testPoint.x * 100)}
                    onChange={(e) =>
                      setTestPoint((p) => ({
                        ...p,
                        x: Number(e.target.value) / 100,
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="w-8 text-right">
                    {testPoint.x.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-gray-400">x₂</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(testPoint.y * 100)}
                    onChange={(e) =>
                      setTestPoint((p) => ({
                        ...p,
                        y: Number(e.target.value) / 100,
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="w-8 text-right">
                    {testPoint.y.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* prediction summary */}
              <div className="text-xs text-gray-300">
                <span className="text-gray-400">Predicted class:</span>{" "}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] ${
                    mlPrediction === 0
                      ? "bg-sky-900/70 text-sky-200 border border-sky-500/60"
                      : "bg-pink-900/70 text-pink-200 border border-pink-500/60"
                  }`}
                >
                  {mlPrediction === 0 ? "Class 0" : "Class 1"}
                </span>
              </div>

              {/* scatter plot */}
              <div className="relative border border-gray-800 rounded-lg bg-black/70 aspect-square overflow-hidden">
                {/* training points */}
                {labeledData.map((p, idx) => {
                  const isClass1 = p.label === 1;
                  const isNeighbor = knnNeighbors.includes(idx);
                  return (
                    <div
                      key={idx}
                      className={`absolute rounded-full border-[2px] ${
                        isClass1
                          ? "bg-pink-400/80 border-pink-300"
                          : "bg-sky-400/80 border-sky-300"
                      } ${isNeighbor ? "ring-2 ring-yellow-300" : ""}`}
                      style={{
                        width: isNeighbor ? "10px" : "8px",
                        height: isNeighbor ? "10px" : "8px",
                        left: `${p.x * 100}%`,
                        top: `${(1 - p.y) * 100}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  );
                })}

                {/* test point */}
                <div
                  className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-emerald-100 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                  style={{
                    left: `${testPoint.x * 100}%`,
                    top: `${(1 - testPoint.y) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>

              <p className="text-[11px] text-gray-500">
                Blue / pink points = training data. Green point = test sample.
                For kNN, highlighted points are the k nearest neighbors used to
                vote on the prediction.
              </p>
            </div>
          </div>

          {/* Unsupervised: k-means */}
          <div className="border border-gray-800 rounded-2xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-2">
              Unsupervised Learning: k-means Clustering
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              The same set of unlabeled points grouped into k clusters based on
              distance. Try different values of k to see how the structure
              changes.
            </p>

            <div className="flex items-center gap-2 mb-3 text-xs">
              <span className="text-gray-400">k (clusters):</span>
              <input
                type="number"
                min={1}
                max={5}
                value={kClusters}
                onChange={(e) =>
                  setKClusters(Math.max(1, Math.min(5, Number(e.target.value))))
                }
                className="w-14 bg-black border border-gray-700 rounded px-2 py-0.5"
              />
              <button
                onClick={runKMeans}
                className="bg-indigo-600 px-3 py-1 rounded-lg text-xs hover:bg-indigo-500"
              >
                Run k-means
              </button>
            </div>

            <div className="relative border border-gray-800 rounded-lg bg-black/70 aspect-square overflow-hidden mb-2">
              {rawPoints.map((p, idx) => {
                const cluster = assignments[idx] ?? 0;
                const colors = [
                  "bg-sky-400",
                  "bg-pink-400",
                  "bg-emerald-400",
                  "bg-amber-300",
                  "bg-purple-400",
                ];
                const color = colors[cluster % colors.length];
                return (
                  <div
                    key={idx}
                    className={`absolute w-2.5 h-2.5 rounded-full ${color}`}
                    style={{
                      left: `${p.x * 100}%`,
                      top: `${(1 - p.y) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}

              {centroids.map((c, idx) => {
                const colors = [
                  "border-sky-300",
                  "border-pink-300",
                  "border-emerald-300",
                  "border-amber-200",
                  "border-purple-300",
                ];
                const color = colors[idx % colors.length];
                return (
                  <div
                    key={idx}
                    className={`absolute w-4 h-4 rounded-full border-2 ${color} bg-black`}
                    style={{
                      left: `${c.x * 100}%`,
                      top: `${(1 - c.y) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>

            <p className="text-[11px] text-gray-500">
              Colored dots are data points assigned to clusters. Larger outlined
              circles are the learned centroids after a few k-means iterations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
