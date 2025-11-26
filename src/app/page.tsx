import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/tailark/HeroSection';
import { StatsSection } from '@/components/tailark/StatsSection';
import { ProjectCard } from '@/components/ProjectCard';
import { Tokenomics } from '@/components/Tokenomics';
import { FeaturesSection } from '@/components/tailark/FeaturesSection';
import { FooterSection } from '@/components/tailark/FooterSection';
import { AiAssistant } from '@/components/AiAssistant';
import { LIVE_PROJECTS, UPCOMING_PROJECTS, COMPLETED_PROJECTS } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const featuredProjects = [...LIVE_PROJECTS, ...UPCOMING_PROJECTS].slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Opportunities
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
                Featured Projects
              </h2>
              <p className="text-muted-foreground mt-2">
                Discover the latest IGOs and investment opportunities
              </p>
            </div>
            <Link href="/projects" className="hidden md:block">
              <Button variant="outline">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/projects">
              <Button>
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Tokenomics />
      <FeaturesSection />

      {/* Completed Sales Section */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Track Record
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">
                Completed Sales
              </h2>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Project
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Total Raised
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    ATH ROI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPLETED_PROJECTS.map((project) => (
                  <tr
                    key={project.id}
                    className="bg-card hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                            {project.name}
                          </span>
                          <span className="block text-xs text-muted-foreground font-mono">
                            ${project.ticker}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1.5 flex-wrap">
                        {project.category.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-semibold text-card-foreground">
                      ${project.totalRaise.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-muted-foreground">
                      {project.participants.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-primary font-bold font-mono">
                        {project.roi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {COMPLETED_PROJECTS.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        {project.name}
                      </span>
                      <span className="block text-xs text-muted-foreground font-mono">
                        ${project.ticker}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-3">
                    <div>
                      <span className="text-muted-foreground block text-xs">Raised</span>
                      <span className="font-semibold text-foreground">
                        ${project.totalRaise.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground block text-xs">ATH ROI</span>
                      <span className="font-bold text-primary">{project.roi}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
      <AiAssistant />
    </main>
  );
}
