// app/components/mdx.tsx
"use client";

import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

function clsx(...args: any[]) {
	return args.filter(Boolean).join(" ");
}

const components = {
	h1: ({ className, ...props }) => (
		<h1 className={clsx("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)} {...props} />
	),
	h2: ({ className, ...props }) => (
		<h2 className={clsx("mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight", className)} {...props} />
	),
	p: ({ className, ...props }) => (
		<p className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
	),
	a: ({ className, ...props }) => (
		<Link className={clsx("font-medium text-zinc-900 underline underline-offset-4", className)} {...props} />
	),
	ul: ({ className, ...props }) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	),
	li: ({ className, ...props }) => (
		<li className={clsx("mt-2", className)} {...props} />
	),
	pre: ({ className, ...props }) => (
		<pre className={clsx("mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4", className)} {...props} />
	),
	code: ({ className, ...props }) => (
		<code className={clsx("relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600", className)} {...props} />
	),
};

export function MdxWrapper({ children }: { children: React.ReactNode }) {
	return <MDXProvider components={components}>{children}</MDXProvider>;
}
