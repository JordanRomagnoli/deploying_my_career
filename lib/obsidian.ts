import { Endpoints } from "@octokit/types";
import matter from "gray-matter";
import { Octokit } from "octokit";

type GitTreeResponse =
    Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"];
// https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree

type RepositoryContentResponse =
    Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];
// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content

type TreeElement = GitTreeResponse["tree"][number];

const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
});

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;

export async function getVaultFileTree(): Promise<TreeElement[]> {
    const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",
        {
            owner: OWNER,
            repo: REPO,
            tree_sha: "main",
        },
    );

    return data.tree.filter(
        (file: TreeElement & { path: string }) =>
            !!file.path &&
            (file.path.endsWith(".md") || file.path.endsWith(".mdx")),
    );
}

export async function getFileContent(filePath: string) {
    const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
            owner: OWNER,
            repo: REPO,
            path: filePath,
        },
    );

    if (Array.isArray(data) || !("content" in data)) {
        throw new Error(`"${filePath}" is not a file.`);
    }

    const fileData = data as Extract<
        RepositoryContentResponse,
        { type: "file" }
    >;

    const decodedContent = Buffer.from(
        fileData.content,
        (fileData.encoding as BufferEncoding) || "base64",
    ).toString("utf-8");

    const { content, data: frontmatter } = matter(decodedContent);

    return { content, frontmatter };
}
