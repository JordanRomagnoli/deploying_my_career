# Digital Garden

Welcome to the repository of my **digital garden**.
This application is built with **Next.js** and uses **Obsidian** as a Headless CMS, synchronized via GitHub.

## 🚀 How it works

The architecture eliminates the need for a traditional database or a complex CMS to manage blog posts.

1.  **Writing:** I write notes and articles locally in **Obsidian**.
2.  **Syncing:** The _Obsidian Git_ plugin automatically pushes Markdown files (`.md`) to a private GitHub repository (the "Vault").
3.  **Rendering:** This web app queries the **GitHub API** to fetch the file tree and raw content in real-time (or at build time).
4.  **Display:** Markdown content is processed by `next-mdx-remote`, transforming it into server-side rendered React components, allowing for custom styling.

### Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling & UI:**
    - [Tailwind CSS](https://tailwindcss.com/)
    - [Shadcn UI](https://ui.shadcn.com/)
    - [Magic UI](https://magicui.design/)
- **Data Fetching:** [Octokit](https://github.com/octokit) (GitHub REST API)
- **Content Processing:** `next-mdx-remote`, `gray-matter`
- **CMS:** [Obsidian](https://obsidian.md/)
