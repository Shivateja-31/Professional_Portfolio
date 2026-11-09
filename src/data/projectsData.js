// Portfolio projects data with rich cinematic metadata
// Ready to swap with your actual video files (.mp4 / .webm) or Vimeo/YouTube embeds!

export const PROJECTS_DATA = [
  {
    id: 'chronos-origins',
    title: 'CHRONOS: ORIGINS',
    category: 'AI Cinematic',
    categorySlug: 'ai-cinematic',
    year: '2025',
    runtime: '01:42',
    aspect: '2.39:1 Anamorphic',
    tagline: 'A dystopian exploration of synthetic consciousness and fragmented memory.',
    description: 'A 100% generative sci-fi cinematic trailer engineered using Runway Gen-3 Alpha, Kling AI, and Midjourney v6. Directed, edited, color graded, and sound designed from an original screenplay. Over 400 neural generations curated into a cohesive 102-second narrative arc.',
    tools: ['Runway Gen-3', 'Midjourney v6', 'Premiere Pro', 'Topaz Video AI', 'After Effects'],
    role: 'AI Direction, Prompt Engineering, Editorial, Sound Design',
    accentColor: '#B6FF00',
    stats: {
      generations: '420+ Clips',
      renderHours: '64 hrs',
      views: '1.2M+'
    },
    // Video URL placeholder (sample cinematic loops, easily replaceable with your MP4)
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-at-night-42861-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    promptSnippet: 'cinematic 35mm film still, neo-tokyo monolith, green bioluminescent rain, volumetric neon haze, anamorphic lens flare --ar 21:9 --v 6.0'
  },
  {
    id: 'velocity-hypercar',
    title: 'VELOCITY // ZERO EMISSION',
    category: 'Commercial',
    categorySlug: 'commercial',
    year: '2025',
    runtime: '00:45',
    aspect: '16:9 Cinema',
    tagline: 'Next-generation luxury EV commercial blending 3D photorealism with AI physics.',
    description: 'Commercial film for a conceptual luxury hypercar brand. Utilizing hybrid workflow combining Unreal Engine 5 vehicle camera passes with neural fluid dynamics and storm atmospherics synthesized in ComfyUI & Kling AI.',
    tools: ['Kling AI', 'ComfyUI', 'DaVinci Resolve Studio', 'After Effects', 'Soundly'],
    role: 'Creative Direction, Neural VFX, Commercial Editing',
    accentColor: '#4EFA9D',
    stats: {
      generations: '280+ Clips',
      renderHours: '38 hrs',
      views: '850K+'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-a-city-at-night-43224-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    promptSnippet: 'tracking side-shot of futuristic matte-black hypercar speeding through neon tunnel, motion blur, sharp reflections, ultra photoreal, 8k octane render style'
  },
  {
    id: 'metamorphosis-fashion',
    title: 'METAMORPHOSIS // SS25',
    category: 'Short-Form',
    categorySlug: 'short-form',
    year: '2025',
    runtime: '00:30',
    aspect: '9:16 Vertical Reel',
    tagline: 'High-fashion avant-garde AI editorial built for 9:16 vertical dominance.',
    description: 'Viral social media editorial campaign exploring haute couture bio-fabrics that mutate with sound. Engineered for maximum retention on Instagram Reels and TikTok, accumulating over 3.4M organic impressions in 7 days.',
    tools: ['Runway Gen-3', 'Luma Dream Machine', 'Premiere Pro', 'ElevenLabs', 'Photoshop'],
    role: 'AI Styling, Sound Synchronization, Vertical Re-framing',
    accentColor: '#B6FF00',
    stats: {
      generations: '190+ Clips',
      renderHours: '22 hrs',
      views: '3.4M+'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-neon-illuminated-runway-42668-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    promptSnippet: 'editorial fashion portrait, iridescent biomechanical silk dress shifting in wind, dramatic lime studio lighting, vogue editorial aesthetic'
  },
  {
    id: 'the-last-astronaut',
    title: 'THE LAST ASTRONAUT',
    category: 'AI Storytelling',
    categorySlug: 'ai-storytelling',
    year: '2024',
    runtime: '03:15',
    aspect: '2.35:1 Widescreen',
    tagline: 'An emotional deep-space narrative on solitary existence at the edge of the universe.',
    description: 'Short narrative film driven by an original voiceover monologue generated via ElevenLabs neural voice cloning, paired with melancholic celestial vistas synthesized via Midjourney and animated with Sora & Runway Gen-3.',
    tools: ['Sora / Gen-3', 'Midjourney v6', 'DaVinci Resolve', 'Ableton Live', 'ElevenLabs'],
    role: 'Writer, AI Director, Editor, Sound Designer',
    accentColor: '#00E5FF',
    stats: {
      generations: '600+ Clips',
      renderHours: '90 hrs',
      views: '540K+'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-astronaut-floating-in-space-41584-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    featured: false,
    promptSnippet: 'lone astronaut standing on dark obsidian moon overlooking emerald aurora borealis in deep cosmic space, 70mm IMAX cinematography'
  },
  {
    id: 'synapse-audio-reactive',
    title: 'SYNAPSE // AUDIO VISUAL',
    category: 'Experimental',
    categorySlug: 'experimental',
    year: '2025',
    runtime: '01:10',
    aspect: '16:9 Cinema',
    tagline: 'Real-time neural feedback loops pulsing to heavy bass rhythms.',
    description: 'An audiovisual experiment bridging generative neural interpolation with live music frequencies. Built using custom TouchDesigner scripts driving ComfyUI animated diffusion models, locked to 138 BPM electronic breakbeats.',
    tools: ['TouchDesigner', 'ComfyUI', 'Deforum', 'After Effects', 'Ableton'],
    role: 'Experimental Animation, Algorithmic Editing, Beat Sync',
    accentColor: '#B6FF00',
    stats: {
      generations: '340+ Clips',
      renderHours: '45 hrs',
      views: '410K+'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-animation-42777-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80',
    featured: false,
    promptSnippet: 'biomorphic neural network firing green neon electrical pulses through dark glass fibers, hyper-detailed, microscopic depth of field'
  },
  {
    id: 'cyber-ronin',
    title: 'CYBER RONIN // REBORN',
    category: 'AI Cinematic',
    categorySlug: 'ai-cinematic',
    year: '2024',
    runtime: '01:25',
    aspect: '2.39:1 Anamorphic',
    tagline: 'Feudal honor meets cybernetic warfare in a rain-soaked neon metropolis.',
    description: 'A stylistic homage to classic Akira Kurosawa cinema reimagined through cyberpunk generative AI lenses. Features complex camera motions, katana reflections, and neural slow-motion bullet time.',
    tools: ['Runway Gen-3', 'Kling AI', 'Premiere Pro', 'After Effects', 'Suno AI'],
    role: 'Creative Direction, Combat Choreography Edit, VFX',
    accentColor: '#9DFF2E',
    stats: {
      generations: '510+ Clips',
      renderHours: '72 hrs',
      views: '780K+'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-neon-sign-reflection-in-a-puddle-of-water-at-night-42995-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    featured: false,
    promptSnippet: 'rain-slicked street, futuristic samurai in carbon-fiber armor holding glowing neon katana, reflections in water puddles, film grain'
  }
];

export const CATEGORIES = [
  { label: 'All Works', value: 'all' },
  { label: 'AI Cinematic', value: 'ai-cinematic' },
  { label: 'Commercials', value: 'commercial' },
  { label: 'Short-Form / Reels', value: 'short-form' },
  { label: 'AI Storytelling', value: 'ai-storytelling' },
  { label: 'Experimental', value: 'experimental' }
];

export const CREATIVE_STATS = [
  { value: '120M+', label: 'Organic Video Views Generated', sub: 'Across YouTube, TikTok & Reels' },
  { value: '45+', label: 'Commercial & Film Deliveries', sub: 'For Global Tech & Luxury Brands' },
  { value: '100%', label: 'AI-Native & Hybrid Production', sub: 'Next-Gen Generative Workflows' },
  { value: '6x', label: 'Faster Concept-to-Screen Velocity', sub: 'Without Compromising Fidelity' }
];

export const TOOL_STACK = [
  {
    category: 'AI Synthesis & Motion Engines',
    tools: [
      { name: 'Runway Gen-3 Alpha', desc: 'Camera motion control & multi-motion brush' },
      { name: 'Kling AI 1.5', desc: 'High-fidelity cinematic physics & complex actions' },
      { name: 'Midjourney v6.1', desc: 'Photoreal worldbuilding & style keyframing' },
      { name: 'ComfyUI / Flux', desc: 'Custom node workflows & LoRA conditioning' },
      { name: 'Luma Dream Machine', desc: 'Fluid camera moves & spatial transitions' },
      { name: 'OpenAI Sora (Beta)', desc: 'Photorealistic narrative coherence' }
    ]
  },
  {
    category: 'Post-Production, Color & VFX',
    tools: [
      { name: 'DaVinci Resolve Studio', desc: 'ACES color science, HDR grading & Fairlight' },
      { name: 'Adobe Premiere Pro', desc: 'Micro-rhythm editorial, narrative assembly' },
      { name: 'Adobe After Effects', desc: 'Hybrid VFX, kinetic type & optical cleanup' },
      { name: 'Topaz Video AI 5', desc: 'Neural 4K/8K upscaling, motion interpolation' },
      { name: 'Unreal Engine 5', desc: 'Virtual production camera previsualization' }
    ]
  },
  {
    category: 'Audio Architecture & Foley',
    tools: [
      { name: 'Ableton Live 12', desc: 'Sub-bass design, riser synthesis, soundscapes' },
      { name: 'ElevenLabs', desc: 'Neural voice direction & emotional pacing' },
      { name: 'Soundly / Splice', desc: 'Bespoke cinematic foley & impact design' }
    ]
  }
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'NARRATIVE WORLDBUILDING & CONCEPT',
    desc: 'Every remarkable video begins with story architecture. We define moodboards, prompt taxonomies, color palettes, and cinematic references before generating a single frame.'
  },
  {
    step: '02',
    title: 'NEURAL SYNTHESIS & SEED CURATION',
    desc: 'Generating hundreds of micro-variations using advanced AI engines (Gen-3, Kling, Flux). We dial in camera pans, lens focal lengths, lighting dynamics, and character consistency.'
  },
  {
    step: '03',
    title: 'EDITORIAL RHYTHM & PACING',
    desc: 'The difference between AI demo clips and real cinema is pacing. We assemble the cut in Premiere/DaVinci with micro-frame precision, rhythmic tension, and emotional cadence.'
  },
  {
    step: '04',
    title: 'HYBRID VFX, 4K UPSCALE & SOUND ARCHITECTURE',
    desc: 'Neural artifact cleanup, After Effects optical blends, Topaz 4K/60fps master upscale, and visceral multi-layer sound design with sub-bass impacts and spatial foley.'
  }
];

