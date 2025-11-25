import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { ProjectCard } from '@/components/ProjectCard';
import { Tokenomics } from '@/components/Tokenomics';
import { HowToJoin } from '@/components/HowToJoin';
import { Footer } from '@/components/Footer';
import { AiAssistant } from '@/components/AiAssistant';
import { LIVE_PROJECTS, UPCOMING_PROJECTS, COMPLETED_PROJECTS } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/Button';

export default function Home() {
  const featuredProjects = [...LIVE_PROJECTS, ...UPCOMING_PROJECTS].slice(0, 3);

  return (
    <main className="min-h-screen bg-[#E8E5D5]">
      <Navbar />
      <Hero />
      <StatsBar />

      {/* Featured Projects Section */}
      <section className="py-20 bg-[#E8E5D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold display-font">Featured Projects</h2>
              <p className="text-gray-600 mt-2">Discover the latest IGOs and investment opportunities</p>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="hidden md:flex">
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
              <Button variant="primary">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Tokenomics />
      <HowToJoin />

      {/* Completed Sales Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Trophy className="h-8 w-8 text-[#7FF252]" />
            <h2 className="text-3xl md:text-4xl font-bold display-font">Completed Sales</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Raised</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Participants</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">ATH ROI</th>
                </tr>
              </thead>
              <tbody>
                {COMPLETED_PROJECTS.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <Link href={`/projects/${project.id}`} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200">
                          <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 group-hover:text-[#7FF252] transition-colors">{project.name}</span>
                          <span className="block text-xs text-gray-500 font-mono">${project.ticker}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {project.category.slice(0, 2).map(cat => (
                          <span key={cat} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{cat}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-semibold">${project.totalRaise.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-gray-600">{project.participants.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-[#7FF252] font-bold font-mono">{project.roi}</span>
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
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#7FF252] transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                      <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">{project.name}</span>
                      <span className="block text-xs text-gray-500 font-mono">${project.ticker}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Raised:</span>
                    <span className="font-semibold">${project.totalRaise.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">ATH ROI:</span>
                    <span className="font-bold text-[#7FF252]">{project.roi}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AiAssistant />
    </main>
  );
}
