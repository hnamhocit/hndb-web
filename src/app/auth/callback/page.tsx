'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ExternalLink, LoaderCircle } from 'lucide-react'
import { useLang } from '@/lib/use-lang'

export default function AuthCallbackPage() {
    const { t } = useLang()
    const [status, setStatus] = useState<'redirecting' | 'done'>('redirecting')

    const buildAppDeepLink = () => {
        const currentUrl = window.location.href
        return currentUrl.replace(
            `${window.location.origin}/auth/callback`,
            'hndb://auth/callback',
        )
    }

    const manualOpenClass =
        'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/80 px-6 font-semibold text-secondary-foreground transition-all hover:bg-secondary hover:border-ring/50'
    const homeClass =
        'inline-flex h-12 w-full items-center justify-center rounded-xl bg-foreground px-6 font-semibold text-background transition-all hover:scale-[1.02] hover:bg-foreground/90 shadow-lg'

    useEffect(() => {
        const appDeepLink = buildAppDeepLink()
        window.location.href = appDeepLink

        const timer = setTimeout(() => {
            setStatus('done')
            window.close()
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <main className='relative min-h-screen w-full overflow-hidden px-4 pb-16 pt-6 md:px-8 xl:px-16'>
            <div className='pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-30 [background-image:radial-gradient(var(--tw-gradient-stops))] from-primary/5 to-transparent bg-[length:16px_16px] [background-image:radial-gradient(rgba(170,186,242,0.3)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(170,186,242,0.1)_1px,transparent_1px)]' />

            <section className='relative z-10 mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-xl shadow-xl md:mt-16 md:p-8'>
                <p className='font-mono text-xs font-bold tracking-[0.22em] text-primary uppercase'>
                    {t('authCallback.badge')}
                </p>
                <div className='mt-4 flex items-start gap-4'>
                    <div className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10'>
                        <CheckCircle2 className='h-7 w-7 text-primary' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-3xl font-extrabold tracking-tight text-foreground md:text-4xl'>
                            {t('authCallback.title')}
                        </h1>
                        <p className='text-base text-muted-foreground'>
                            {t('authCallback.description')}
                        </p>
                    </div>
                </div>

                <div className='mt-6 rounded-2xl border border-primary/20 bg-primary/8 p-4 text-sm text-muted-foreground'>
                    <p className='flex items-center gap-2'>
                        {status === 'redirecting' ?
                            <LoaderCircle className='h-4 w-4 animate-spin text-primary' />
                            : <CheckCircle2 className='h-4 w-4 text-primary' />}
                        {t('authCallback.autoAttempt')}
                    </p>
                </div>

                <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    <button
                        type='button'
                        onClick={() => {
                            window.location.href = buildAppDeepLink()
                        }}
                        className={manualOpenClass}>
                        <ExternalLink className='h-4 w-4' />
                        {t('authCallback.openApp')}
                    </button>
                    <Link
                        href='/'
                        className={homeClass}>
                        {t('authCallback.backHome')}
                    </Link>
                </div>

                {status === 'done' && (
                    <p className='mt-4 text-center text-xs text-muted-foreground'>
                        {t('authCallback.closeHint')}
                    </p>
                )}
            </section>
        </main>
    )
}