'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AiAssistant } from '@/components/AiAssistant';
import { Button } from '@/components/Button';
import { PROJECTS } from '@/lib/constants';
import { analyzeProject } from '@/actions/ai';
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Twitter,
  Send,
  Calendar,
  Users,
  Target,
  Shield,
  Sparkles,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);
  const project = PROJECTS.find(p => p.id === id);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#E8E5D5]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const progress = project.totalRaise > 0 ? (project.currentRaise / project.totalRaise) * 100 : 0;

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeProject(project.name, project.description);
      setAnalysis(result);
    } catch (error) {
      setAnalysis('Analysis unavailable at this time.');
    }
    setLoading(false);
  };

  const statusColors = {
    'Live': 'bg-[#7FF252] text-black',
    'Upcoming': 'bg-orange-500 text-white',
    'Ended': 'bg-gray-500 text-white'
  };

  const statusIcons = {
    'Live': <TrendingUp className="h-4 w-4" />,
    'Upcoming': <Clock className="h-4 w-4" />,
    'Ended': <CheckCircle className="h-4 w-4" />
  };

  return (
    <main className="min-h-screen bg-[#E8E5D5]">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-black/50 to-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/projects">
            <Button variant="secondary" size="sm" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" /> All Projects
            </Button>
          </Link>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${statusColors[project.status]}`}>
            {statusIcons[project.status]}
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.category.map(cat => (
                <span key={cat} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-white uppercase">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white display-font mb-2">
              {project.name}
            </h1>
            <p className="text-2xl text-gray-300 font-mono">${project.ticker}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 display-font">About</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>

              {/* Links */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Globe className="mr-2 h-4 w-4" /> Website
                    </Button>
                  </a>
                )}
                {project.twitter && (
                  <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Twitter className="mr-2 h-4 w-4" /> Twitter
                    </Button>
                  </a>
                )}
                {project.telegram && (
                  <a href={project.telegram} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Send className="mr-2 h-4 w-4" /> Telegram
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* AI Analysis Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold display-font">AI Analysis</h2>
                <Sparkles className="h-6 w-6 text-[#7FF252]" />
              </div>

              {analysis ? (
                <div className="bg-[#F0FDF4] border border-[#7FF252]/20 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">{analysis}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Get an AI-powered analysis of this project</p>
                  <Button onClick={handleAnalyze} disabled={loading}>
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Analysis
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Key Information */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 display-font">Key Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Blockchain</span>
                    <p className="font-bold text-lg">{project.blockchain || 'Multi-chain'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Start Date</span>
                    <p className="font-bold text-lg">{project.startDate || 'TBA'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Participants</span>
                    <p className="font-bold text-lg">{project.participants > 0 ? project.participants.toLocaleString() : 'TBA'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">KYC Required</span>
                    <p className="font-bold text-lg">{project.kycRequired ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-6 display-font">Raise Details</h3>

              {/* Progress Bar */}
              {project.status !== 'Upcoming' && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-bold">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#7FF252] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Total Raise</span>
                  <span className="font-bold font-mono text-lg">${project.totalRaise.toLocaleString()}</span>
                </div>

                {project.status !== 'Upcoming' && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-500">Current Raised</span>
                    <span className="font-bold font-mono text-lg text-[#7FF252]">${project.currentRaise.toLocaleString()}</span>
                  </div>
                )}

                {project.roi !== 'TBA' && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-500">ATH ROI</span>
                    <span className="font-bold font-mono text-2xl text-[#7FF252]">{project.roi}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500">Categories</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {project.category.map(cat => (
                      <span key={cat} className="text-xs bg-gray-100 px-2 py-1 rounded">{cat}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                {project.status === 'Live' && (
                  <Button className="w-full" size="lg">
                    Participate Now <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {project.status === 'Upcoming' && (
                  <Button className="w-full" size="lg" variant="outline">
                    Get Notified
                  </Button>
                )}
                {project.status === 'Ended' && (
                  <Button className="w-full" size="lg" variant="secondary" disabled>
                    Sale Ended
                  </Button>
                )}

                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full" variant="outline">
                      Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AiAssistant />
    </main>
  );
}
