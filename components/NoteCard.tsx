import { JSXElementConstructor, ReactElement } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

export type Note = {
    createdAt: string;
    title?: string;
    content: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
};

const NoteCard = ({ createdAt, title = "", content }: Note) => {
    return (
        <Card className="w-full  border-cyan-500/25 mt-4 bg-cyan-100/10 shadow-sm">
            <CardHeader>
                <span className="text-start font-normal text-xs text-muted-foreground">
                    {createdAt}
                </span>

                <h3 className="text-xl md:text-2xl font-semibold text-cyan-700 font-mono">
                    {title.trim()}
                </h3>
            </CardHeader>
            <CardContent>
                <span className="prose whitespace-pre-line text-cyan-600 text-xs md:text-sm">
                    {content}
                </span>
            </CardContent>
        </Card>
    );
};

export default NoteCard;
