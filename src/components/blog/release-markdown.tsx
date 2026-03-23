import type { ComponentPropsWithoutRef } from 'react'

import ReactMarkdown, { type Components } from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

const markdownComponents: Components = {
	a(props) {
		return (
			<a
				{...props}
				target='_blank'
				rel='noreferrer'
				className='text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary'
			/>
		)
	},
	img(props) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				{...props}
				alt={props.alt || ''}
				className='my-6 w-full rounded-2xl border border-border bg-card/60 object-cover shadow-sm'
			/>
		)
	},
	pre(props) {
		return (
			<pre
				{...props}
				className='my-8 overflow-x-auto rounded-2xl border border-border bg-card/80 p-4 text-sm text-foreground shadow-sm'
			/>
		)
	},
	code(props) {
		const { className, children, ...rest } =
			props as ComponentPropsWithoutRef<'code'> & {
				inline?: boolean
			}
		const isInline = !className && !String(children).includes('\n')

		if (isInline) {
			return (
				<code
					{...rest}
					className='rounded bg-primary/8 px-1.5 py-0.5 text-[0.9em] text-foreground'>
					{children}
				</code>
			)
		}

		return (
			<code
				{...rest}
				className={className}>
				{children}
			</code>
		)
	},
	table(props) {
		return (
			<div className='my-8 overflow-x-auto rounded-2xl border border-border bg-card/30'>
				<table
					{...props}
					className='w-full border-collapse text-left text-sm'
				/>
			</div>
		)
	},
	thead(props) {
		return (
			<thead
				{...props}
				className='bg-card/80'
			/>
		)
	},
	th(props) {
		return (
			<th
				{...props}
				className='border-b border-border px-4 py-3 font-semibold text-foreground'
			/>
		)
	},
	td(props) {
		return (
			<td
				{...props}
				className='border-b border-border/70 px-4 py-3 align-top text-muted-foreground'
			/>
		)
	},
	hr(props) {
		return (
			<hr
				{...props}
				className='my-8 border-border'
			/>
		)
	},
	input(props) {
		return (
			<input
				{...props}
				readOnly
				className='mr-2 h-4 w-4 rounded border-border accent-primary align-middle'
			/>
		)
	},
}

export function ReleaseMarkdown({ markdown }: { markdown: string }) {
	if (!markdown.trim()) {
		return (
			<p className='text-muted-foreground'>
				Release này chưa có ghi chú chi tiết.
			</p>
		)
	}

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkBreaks]}
			components={markdownComponents}>
			{markdown}
		</ReactMarkdown>
	)
}
