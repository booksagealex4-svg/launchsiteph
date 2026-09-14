export interface Certification {
  id: string
  title: string
  issuer: string
  date?: string
  duration?: string
  skills?: string[]
  certificateId?: string
  credentialUrl?: string
  status?: 'completed' | 'in-progress' | 'planned'
}

/**
 * Real, completed LinkedIn Learning certifications. `credentialUrl` uses the
 * stable public certificate path (LinkedIn's page-view tracking query params
 * stripped). Shared here so About and a future homepage Credentials card can
 * both read from one source.
 */
export const certifications: Certification[] = [
  {
    id: 'cert-ai-content-generation-adobe',
    title: 'AI-Powered Content Generation for Communications and Social Media Marketing by Adobe',
    issuer: 'LinkedIn Learning',
    date: 'Aug 10, 2026',
    duration: '1 hour 22 minutes',
    skills: ['AI for Communication', 'AI for Marketing', 'Artificial Intelligence (AI)'],
    certificateId: 'd2c3926d80ff6ad3394ad67300096af203c318017f7215f7ab2129e5c96eedab',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/d2c3926d80ff6ad3394ad67300096af203c318017f7215f7ab2129e5c96eedab',
    status: 'completed',
  },
  {
    id: 'cert-ai-audience-strategy-adobe',
    title:
      'AI-Powered Audience Strategy for Digital Marketing: Build Seed Audiences, Improve Data Quality, and Optimize Segmentation by Adobe',
    issuer: 'LinkedIn Learning',
    date: 'Aug 10, 2026',
    duration: '32 minutes',
    skills: ['Digital Marketing', 'AI for Marketing', 'Artificial Intelligence (AI)'],
    certificateId: 'cb9110c10ac3740943280854673ae3dcb020b1fd0938fcab41cb1119bf4a3ad3',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/cb9110c10ac3740943280854673ae3dcb020b1fd0938fcab41cb1119bf4a3ad3',
    status: 'completed',
  },
  {
    id: 'cert-sales-strategy-ai-automation',
    title: 'Sales Strategy: Using AI and Automation to Sell More',
    issuer: 'LinkedIn Learning',
    date: 'Aug 10, 2026',
    duration: '48 minutes',
    skills: ['Sales Strategy', 'AI for Sales', 'Artificial Intelligence (AI)'],
    certificateId: 'daa720138e4a4a92f6070e36cb43ed7465a46bd6894e0d9d50ae9938633e11f2',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/daa720138e4a4a92f6070e36cb43ed7465a46bd6894e0d9d50ae9938633e11f2',
    status: 'completed',
  },
  {
    id: 'cert-ai-driven-sales-professional',
    title: 'The AI-Driven Sales Professional: Streamline Systems and Exceed Targets',
    issuer: 'LinkedIn Learning',
    date: 'Aug 10, 2026',
    duration: '49 minutes',
    skills: ['Sales', 'AI for Sales', 'Artificial Intelligence (AI)'],
    certificateId: '58251ba53d31264f4118f4024d94476f886d23e56738901cc7c3c3e155167d88',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/58251ba53d31264f4118f4024d94476f886d23e56738901cc7c3c3e155167d88',
    status: 'completed',
  },
  {
    id: 'cert-learning-copilot-chat-basic',
    title: 'Learning Copilot Chat (Basic)',
    issuer: 'LinkedIn Learning',
    date: 'Aug 07, 2026',
    duration: '55 minutes',
    skills: ['Microsoft Copilot', 'AI Productivity', 'Artificial Intelligence (AI)'],
    certificateId: '0cb22e4edf4e50cb271344f0637f2f203af485d55617a2540bdc29ca11922829',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/0cb22e4edf4e50cb271344f0637f2f203af485d55617a2540bdc29ca11922829',
    status: 'completed',
  },
  {
    id: 'cert-what-is-generative-ai',
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning',
    date: 'Aug 06, 2026',
    duration: '1 hour 3 minutes',
    skills: ['Generative AI Tools', 'Artificial Intelligence (AI)', 'Generative AI'],
    certificateId: 'aab7a25c4dfd4bb6b65f89e73cc2b290b6aea9fa8969d6e1e4a84762eec39489',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/aab7a25c4dfd4bb6b65f89e73cc2b290b6aea9fa8969d6e1e4a84762eec39489',
    status: 'completed',
  },
]
