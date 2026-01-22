/* eslint-disable @typescript-eslint/no-explicit-any */
export const mdxComponents = {
    h3: (props: any) => {
        return (
            <h3
                className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
                {...props}
            />
        );
    },

    ul: (props: any) => (
        <ul className=" ml-6 list-disc [&>li]:mt-2" {...props} />
    ),

    ol: (props: any) => (
        <ol className=" ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),

    a: (props: any) => (
        <a
            className="font-medium text-purple-400 underline underline-offset-4 hover:text-purple-400/80"
            {...props}
            target="_blank"
        />
    ),
};
