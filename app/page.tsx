'use client'

import { useState, useMemo } from 'react'
import { Search, ExternalLink, Code2, Zap, Shield, DollarSign, Users, Sparkles } from 'lucide-react'

interface Tool {
  name: string
  description: string
  category: string
  url: string
  pricing: string
  features: string[]
  bestFor: string
  logo?: string
}

const tools: Tool[] = [
  // AI IDE'ler
  {
    name: 'Cursor',
    description: 'VS Code tabanlı hızlı AI kod editörü. Multi-file düzenleme için idealdir.',
    category: 'AI IDE',
    url: 'https://cursor.sh',
    pricing: '$20/ay (Pro)',
    features: ['Fast autocomplete', 'Composer multi-file editing', 'Claude Sonnet 3.5', 'VS Code uyumlu'],
    bestFor: 'Solo geliştiriciler, hızlı prototipleme'
  },
  {
    name: 'Windsurf',
    description: 'Büyük projelerde derin kod anlayışı sunan AI IDE. Cascade özellikleri güçlü.',
    category: 'AI IDE',
    url: 'https://windsurf.com',
    pricing: '$15/ay (Individual)',
    features: ['Cascade agent', 'Multi-file context', 'Team collaboration', 'Cross-IDE support'],
    bestFor: 'Büyük kod tabanları, ekip çalışması'
  },
  {
    name: 'Cline',
    description: 'Adım adım şeffaf çalışan AI asistan. Kendi hatalarını düzeltebilir.',
    category: 'AI IDE',
    url: 'https://github.com/cline/cline',
    pricing: 'Ücretsiz (Open Source)',
    features: ['Step-by-step workflow', 'Self-correction', 'Transparent process', 'VS Code extension'],
    bestFor: 'Kontrollü geliştirme, şeffaflık'
  },

  // Kod Asistanları
  {
    name: 'GitHub Copilot',
    description: 'Microsoft\'un AI kod asistanı. GPT-4.1, Claude Sonnet 4 ve Gemini desteği.',
    category: 'Kod Asistanı',
    url: 'https://github.com/features/copilot',
    pricing: '$10/ay (Individual)',
    features: ['Multi-model support', 'Agent mode', 'Code completion', 'Chat assistance'],
    bestFor: 'GitHub kullanıcıları, çok modelli destek'
  },
  {
    name: 'Tabnine',
    description: 'Gizlilik odaklı, on-premise AI kod asistanı. 80+ dil desteği.',
    category: 'Kod Asistanı',
    url: 'https://www.tabnine.com',
    pricing: 'Free / $12/ay (Pro)',
    features: ['Privacy-first', 'On-premise support', 'Custom models', 'IP indemnification'],
    bestFor: 'Kurumsal, hassas projeler'
  },
  {
    name: 'Codeium',
    description: 'Bireysel geliştiriciler için tamamen ücretsiz AI asistan. 70+ dil.',
    category: 'Kod Asistanı',
    url: 'https://codeium.com',
    pricing: 'Ücretsiz (Individual)',
    features: ['Completely free', 'Built-in chat', 'Real-time suggestions', '70+ languages'],
    bestFor: 'Bütçe dostu, bireysel geliştiriciler'
  },
  {
    name: 'Amazon CodeWhisperer',
    description: 'AWS optimize edilmiş ücretsiz AI asistan. Güvenlik taraması dahil.',
    category: 'Kod Asistanı',
    url: 'https://aws.amazon.com/codewhisperer',
    pricing: 'Ücretsiz',
    features: ['AWS-optimized', 'Security scanning', 'Reference tracking', 'Free forever'],
    bestFor: 'AWS geliştiricileri'
  },

  // Vibe Coding - Web Builders
  {
    name: 'Bolt.new',
    description: 'Tarayıcıda full-stack uygulama geliştirme. StackBlitz WebContainers ile.',
    category: 'Vibe Coding',
    url: 'https://bolt.new',
    pricing: 'Free / Pro planlar',
    features: ['Browser-based', 'Full-stack apps', 'Instant deployment', 'Multiple integrations'],
    bestFor: 'Hızlı web uygulamaları'
  },
  {
    name: 'Lovable',
    description: 'Doğal dille React uygulamaları oluşturma. Figma entegrasyonu var.',
    category: 'Vibe Coding',
    url: 'https://lovable.dev',
    pricing: 'Subscription based',
    features: ['React + Tailwind', 'shadcn/ui', 'Figma import', 'Responsive design'],
    bestFor: 'Frontend uygulamaları, MVP geliştirme'
  },
  {
    name: 'v0 by Vercel',
    description: 'Üstün kalitede UI component üretimi. React + Tailwind + shadcn/ui.',
    category: 'Vibe Coding',
    url: 'https://v0.dev',
    pricing: '$20/ay',
    features: ['Outstanding UI quality', 'React components', 'Clean code', 'Copy-paste ready'],
    bestFor: 'UI component geliştirme'
  },
  {
    name: 'Replit',
    description: '50+ dil desteği olan tarayıcı tabanlı geliştirme ortamı. AI agent dahil.',
    category: 'Vibe Coding',
    url: 'https://replit.com',
    pricing: 'Free / $25/ay (Core)',
    features: ['50+ languages', 'Replit Agent', 'Live collaboration', 'Ghostwriter AI'],
    bestFor: 'Çok dilli projeler, öğrenme'
  },

  // No-Code AI Builders
  {
    name: 'Wegic',
    description: 'AI ile otomatik optimize olan web siteleri. Veri odaklı büyüme.',
    category: 'No-Code Builder',
    url: 'https://wegic.ai',
    pricing: 'Varies',
    features: ['Auto-optimization', 'Data-driven growth', 'Visitor analysis', 'Content adjustment'],
    bestFor: 'Küçük işletmeler, otomatik optimizasyon'
  },
  {
    name: 'Dora AI',
    description: '3D animasyonlu web siteleri. Prompt\'tan siteye 80+ tasarım stili.',
    category: 'No-Code Builder',
    url: 'https://www.dora.run',
    pricing: 'Beta pricing',
    features: ['3D animations', '80+ design styles', 'No-code', 'Visual-first'],
    bestFor: 'Yaratıcı portfolyolar, görsel odaklı markalar'
  },
  {
    name: 'Durable',
    description: 'Basit servis siteleri için hızlı AI builder. İşletme yönetimi kolaylaştırır.',
    category: 'No-Code Builder',
    url: 'https://durable.co',
    pricing: 'Subscription',
    features: ['Quick setup', 'Service sites', 'Simple interface', 'Business tools'],
    bestFor: 'Basit servis siteleri'
  },

  // Autonomous AI
  {
    name: 'Devin AI',
    description: 'İlk tam otonom yazılım mühendisi. PR oluşturma, bug fix, refactoring.',
    category: 'Autonomous AI',
    url: 'https://devin.ai',
    pricing: '$500/ay',
    features: ['Fully autonomous', 'PR creation', 'Bug fixing', 'Refactoring tasks'],
    bestFor: 'Otonom yazılım geliştirme, ekip desteği'
  },

  // AI Models & APIs
  {
    name: 'Claude Code',
    description: 'Anthropic\'in kod yazma modeli. Sonnet 4.5 en güçlü coding model.',
    category: 'AI Model',
    url: 'https://www.anthropic.com',
    pricing: 'API bazlı',
    features: ['Best coding model', 'Multi-step reasoning', '30+ hour focus', 'Agentic workflows'],
    bestFor: 'Karmaşık kod projeleri, agent sistemler'
  },
  {
    name: 'OpenAI Codex',
    description: 'GPT-3 tabanlı kod anlama ve yazma modeli. 12+ dil desteği.',
    category: 'AI Model',
    url: 'https://openai.com/codex',
    pricing: 'API bazlı',
    features: ['Natural language to code', 'Python expert', '12+ languages', 'GPT-3 based'],
    bestFor: 'Natural language kod dönüştürme'
  },

  // Developer Tools
  {
    name: 'Pieces',
    description: 'On-device yapay bellek. İş akışını takip eder ve raporlar.',
    category: 'Developer Tool',
    url: 'https://pieces.app',
    pricing: 'Free / Pro',
    features: ['On-device AI', 'Work capture', 'Standup reports', 'Code snippets'],
    bestFor: 'Geliştirici üretkenliği, kod yönetimi'
  }
]

const categories = ['Tümü', 'AI IDE', 'Kod Asistanı', 'Vibe Coding', 'No-Code Builder', 'Autonomous AI', 'AI Model', 'Developer Tool']

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'Tümü' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const categoryStats = useMemo(() => {
    return categories.map(cat => ({
      name: cat,
      count: cat === 'Tümü' ? tools.length : tools.filter(t => t.category === cat).length
    }))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Coding Hub</h1>
                <p className="text-sm text-purple-300">Tüm Vibe Coding Araçları Tek Platformda</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>{tools.length} Araç</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-300">AI IDE\'ler</span>
            </div>
            <p className="text-2xl font-bold text-white">{tools.filter(t => t.category === 'AI IDE').length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-blue-300">Vibe Coding</span>
            </div>
            <p className="text-2xl font-bold text-white">{tools.filter(t => t.category === 'Vibe Coding').length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-300">Kod Asistanları</span>
            </div>
            <p className="text-2xl font-bold text-white">{tools.filter(t => t.category === 'Kod Asistanı').length}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-pink-400" />
              <span className="text-sm text-pink-300">No-Code</span>
            </div>
            <p className="text-2xl font-bold text-white">{tools.filter(t => t.category === 'No-Code Builder').length}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder="Araç ara... (örn: Cursor, AI IDE, free, AWS)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-purple-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categoryStats.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-black/40 text-purple-300 border border-purple-500/20 hover:border-purple-500/50 backdrop-blur-sm'
                }`}
              >
                {name} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              className="bg-black/40 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 backdrop-blur-sm group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {tool.category}
                  </span>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500/20 hover:bg-purple-500/30 p-2 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-purple-300" />
                </a>
              </div>

              <p className="text-purple-200/80 text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-green-300">{tool.pricing}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-purple-300 mb-2">
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">Özellikler:</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="text-purple-200/70 text-xs">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-pink-300 font-medium">En İyi:</span>
                    <p className="text-xs text-pink-200/80 mt-0.5">{tool.bestFor}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
            <p className="text-purple-300/70 text-lg">Aramanıza uygun araç bulunamadı</p>
            <p className="text-purple-400/50 text-sm mt-2">Farklı bir arama terimi deneyin</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-purple-300/70 text-sm">
            <p className="mb-2">AI Coding Hub - 2025</p>
            <p className="text-xs text-purple-400/50">
              Tüm AI kod yazma araçlarını tek platformda keşfedin ve karşılaştırın
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
