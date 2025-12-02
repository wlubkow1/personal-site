export type Project = {
  slug: string;
  title: string;
  description: string;
  role?: string;
  stack: string[];
  link?: string;
  live?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    slug: "know-your-notes",
    title: "Know Your Notes",
    description:
      "Fragrance discovery app with searchable notes, brand pages, and data-driven accord visualizations.",
    role: "Solo developer",
    stack: ["React", "TypeScript", "Supabase", "Postgres", "Tailwind"],
    link: "https://github.com/wlubkow1/publicKnowYourNotes",
    live: "https://know-your-notes.com/",
    highlight: "Live search, user collections, and custom accord charts.",
  },
  {
    slug: "financefrenzy",
    title: "Bugdet Buddy",
    description:
      "Cross-platform finance app to track expenses, budgets, and savings with a clean mobile-first UI.",
    role: "Solo developer",
    stack: [".NET MAUI", "C#", "SQLite"],
    link: "https://github.com/mjani23/budget-buddy",
    highlight: "Savings logic, categorized expenses, and polished MAUI UI.",
  },
  {
    slug: "wizard-edu-game",
    title: "Wizard Education Game",
    description:
      "2D Unity game where kids learn math, spelling, and Spanish through minigames, inventory, and a shop system.",
    role: "Designer & programmer",
    stack: ["Unity", "C#", "2D Game Dev"],
    link: "https://github.com/mjani23/Scholarly-Sorcery",
    highlight:
      "Multiple minigames, player inventory/store, and kid-friendly UX.",
  },
    {
    slug: "linux-kernel-chess",
    title: "Linux Kernel Chess",
    description:
      "2D Unity game where kids learn math, spelling, and Spanish through minigames, inventory, and a shop system.",
    role: "Programming and Operating Systems",
    stack: ["C", "Debian Linux", "Virtual Box"],
    link: "https://github.com/UMBC-CMSC421/project3-wlubkow1",
    highlight:
      "Fully functional chess, check, checkmate, pawn promotion.",
  },
  {
    slug: "hash-table",
    title: "Hash Table Car Dealership",
    description:
      "2D Unity game where kids learn math, spelling, and Spanish through minigames, inventory, and a shop system.",
    role: "Programming and Operating Systems",
    stack: ["C++", "Rehashing", "Valgrind"],
    link: "https://github.com/wlubkow1/hashcardealer",
    highlight:
      "Incremental rehashing, multiple hashing algorithms, O(1) access time.",
  }
  
];
