import { compileMDX } from "next-mdx-remote/rsc";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { BlurFade } from "@/components/ui/blur-fade";
import NotesList from "@/components/NotesList";
import Image from "next/image";
import profileImage from "@/public/profile-img.jpg";
import { Github, Linkedin, MailIcon } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { getVaultFileTree, getFileContent } from "@/lib/obsidian";
import ButtonCopyMail from "@/components/ButtonCopyMail";
import { mdxComponents } from "@/components/mdx-components";

interface NoteFrontmatter {
    createdAt: string;
    title: string;
}

export const revalidate = 60;
export const dynamic = "force-dynamic";

const SOCIALS = [
    {
        icon: Linkedin,
        link: "https://www.linkedin.com/in/jordan-romagnoli",
    },
    {
        icon: Github,
        link: "https://github.com/JordanRomagnoli",
    },
];

export default async function Home() {
    const files = await getVaultFileTree();

    const notes = await Promise.all(
        files.map(async (file) => {
            const { content: rawContent, frontmatter } = await getFileContent(
                file.path,
            );

            const { content } = await compileMDX<NoteFrontmatter>({
                source: rawContent,
                components: mdxComponents,
                options: {
                    parseFrontmatter: false,
                },
            });

            return {
                content,
                ...(frontmatter as unknown as NoteFrontmatter),
            };
        }),
    );

    const sortedNotes = notes.sort((a, b) => {
        return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });

    return (
        <div className="min-h-screen w-full p-6 pt-16 md:pt-48">
            <div className="max-w-4xl mx-auto">
                <div className="w-full mb-12 flex">
                    <div className="size-20 md:size-25 lg:size-35 border border-cyan-500 rounded-full overflow-hidden z-10">
                        <Image
                            src={profileImage}
                            alt="profile image"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="pl-6 md:pl-9">
                        <h1 className="text-2xl md:text-5xl font-semibold text-gray-700">
                            Jordan Romagnoli
                        </h1>
                        <TypingAnimation
                            as="h2"
                            typeSpeed={80}
                            className="text-lg sm:text-xl md:text-2xl italic text-cyan-600 font-mono"
                            loop={false}
                            words={["Jr Web Developer"]}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                    <div className="md:flex-1 mb-16 md:mb-0 md:h-125 flex flex-col gap-6 align-items-center">
                        <p className="flex-1 max-w-[90%] leading-relaxed tracking-wide text-xs md:text-sm text-muted-foreground">
                            Ciao 👋, sono <strong>Jordan</strong>.
                            <br />
                            <br />
                            Sviluppatore Front-end con un anno di esperienza
                            alle spalle. Questo spazio è il mio{" "}
                            <strong>digital garden</strong>: condivido e
                            documento i miei progressi nello studio e
                            soprattutto il percorso verso la mia prossima sfida
                            lavorativa.
                        </p>
                        <div className="flex items-center gap-6">
                            {SOCIALS.map((icon, idx) => (
                                <a
                                    key={idx}
                                    href={icon.link}
                                    target="_blank"
                                    className="flex items-center justify-center bg-gray-300/25 text-muted-foreground p-1 hover:bg-cyan-500/25 rounded hover:text-cyan-500 active:text-cyan-500 transition-all duration-75 hover:shadow-md hover:shadow-cyan-500/25 active:scale-95"
                                >
                                    <icon.icon className="size-4 md:size-5" />
                                </a>
                            ))}
                            <ButtonCopyMail email="jordanromagnoli1999@gmail.com">
                                <MailIcon className="size-4 md:size-5" />
                            </ButtonCopyMail>
                        </div>
                    </div>

                    <div className="md:flex-1 h-115 md:h-125 grow relative rounded-3xl border border-gray overflow-hidden shadow-lg bg-gray-50 z-10">
                        <BlurFade className="h-full overflow-auto space-y-4 px-4 no-scrollbar">
                            <NotesList notes={sortedNotes} />
                            <div className="w-full h-20"></div>
                        </BlurFade>

                        <ProgressiveBlur height="25%" position="bottom" />
                    </div>
                </div>
            </div>
        </div>
    );
}
