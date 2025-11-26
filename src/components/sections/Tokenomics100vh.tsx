'use client'

import { Coins, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Lock, Gift, Flame, Building2 } from 'lucide-react'
import { TOKENOMICS } from '@/lib/constants'

const tokenDistribution = [
  { label: 'Public Sale', percentage: 30, color: 'bg-primary' },
  { label: 'Liquidity Pool', percentage: 25, color: 'bg-secondary' },
  { label: 'Team & Advisors', percentage: 15, color: 'bg-accent' },
  { label: 'Marketing', percentage: 10, color: 'bg-primary/70' },
  { label: 'Development', percentage: 10, color: 'bg-secondary/70' },
  { label: 'Reserve', percentage: 10, color: 'bg-accent/70' }
]

const taxDetails = [
  {
    icon: ArrowUpRight,
    label: 'Buy Tax',
    value: TOKENOMICS.buyTax,
    description: 'Split between rewards & liquidity',
    color: 'text-primary'
  },
  {
    icon: ArrowDownLeft,
    label: 'Sell Tax',
    value: TOKENOMICS.sellTax,
    description: 'Funds marketing & development',
    color: 'text-secondary'
  },
  {
    icon: ArrowLeftRight,
    label: 'Transfer Tax',
    value: TOKENOMICS.transferTax,
    description: 'Free peer-to-peer transfers',
    color: 'text-accent'
  }
]

const utilities = [
  {
    icon: Lock,
    title: 'Staking Tiers',
    description: 'Stake $PCGF to unlock allocation tiers from Bronze to Quantum.'
  },
  {
    icon: Gift,
    title: 'Revenue Share',
    description: 'Earn a share of platform fees from every successful IGO.'
  },
  {
    icon: Flame,
    title: 'Deflationary Burns',
    description: 'A portion of all taxes are burned, reducing supply over time.'
  },
  {
    icon: Building2,
    title: 'Governance Rights',
    description: 'Vote on project listings, platform upgrades, and treasury allocation.'
  }
]

export function Tokenomics100vh() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-card py-20" id="tokenomics">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            <Coins className="h-4 w-4" />
            $PCGF Token
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Tokenomics
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {TOKENOMICS.description}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column - Distribution chart */}
          <div className="rounded-3xl border border-border bg-background p-8">
            <h3 className="mb-8 text-2xl font-bold text-foreground">Token Distribution</h3>

            {/* Visual chart representation */}
            <div className="mb-8 flex h-8 overflow-hidden rounded-full">
              {tokenDistribution.map((item) => (
                <div
                  key={item.label}
                  className={`${item.color} transition-all hover:opacity-80`}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.label}: ${item.percentage}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              {tokenDistribution.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total supply */}
            <div className="mt-8 rounded-2xl bg-muted/50 p-6 text-center">
              <div className="text-sm uppercase tracking-wider text-muted-foreground">Total Supply</div>
              <div className="mt-2 text-3xl font-bold text-foreground">{TOKENOMICS.displaySupply}</div>
              <div className="mt-1 font-mono text-sm text-muted-foreground">{TOKENOMICS.supply} $PCGF</div>
            </div>
          </div>

          {/* Right column - Tax & utilities */}
          <div className="space-y-8">
            {/* Tax structure */}
            <div className="rounded-3xl border border-border bg-background p-8">
              <h3 className="mb-6 text-2xl font-bold text-foreground">Tax Structure</h3>
              <div className="grid gap-4">
                {taxDetails.map((tax) => {
                  const Icon = tax.icon
                  return (
                    <div
                      key={tax.label}
                      className="flex items-center gap-4 rounded-2xl bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className={`rounded-xl bg-background p-3 ${tax.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{tax.label}</span>
                          <span className="text-2xl font-bold text-foreground">{tax.value}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tax.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Token utility */}
            <div className="rounded-3xl border border-border bg-background p-8">
              <h3 className="mb-6 text-2xl font-bold text-foreground">Token Utility</h3>
              <div className="grid grid-cols-2 gap-4">
                {utilities.map((util) => {
                  const Icon = util.icon
                  return (
                    <div key={util.title} className="rounded-2xl bg-muted/30 p-4">
                      <Icon className="mb-3 h-6 w-6 text-primary" />
                      <h4 className="mb-1 font-semibold text-foreground">{util.title}</h4>
                      <p className="text-xs text-muted-foreground">{util.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6 text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="mt-2 text-muted-foreground">Liquidity Locked</div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 text-center">
            <div className="text-3xl font-bold text-secondary">Audited</div>
            <div className="mt-2 text-muted-foreground">By CertiK & SolidProof</div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 text-center">
            <div className="text-3xl font-bold text-accent">No Max Wallet</div>
            <div className="mt-2 text-muted-foreground">Accumulate Freely</div>
          </div>
        </div>
      </div>
    </section>
  )
}
