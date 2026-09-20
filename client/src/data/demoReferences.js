export const DEMO_REFERENCES = [
  {
    _id: "demo-new-normal",
    slug: "new-normal",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80",
    originalFilename: "the-new-normal-editorial.jpg",
    visualDna: {
      mediaType: {
        category: "graphic_design",
        label: "Desain Grafis",
        icon: "🎨",
        reason: "Poster editorial tipografis dengan sentuhan Neo-Brutalism perkotaan.",
        hasTypography: true
      },
      style: {
        primaryName: "Contemporary Brutalism & Editorial Typographic",
        confidence: 0.96,
        movementHistory: "Jadi style di poster ini tuu namanya Neo-Brutalism yang di-mix sama sentuhan editorial modern. Akarnya dari gaya Swiss Style tahun 60-an yang dipaduin sama arsitektur urban mentah, jadinya keliatan super tegas, berani, dan kekinian banget!",
        moodKeywords: ["Brutalism", "Editorial", "Modernist", "Aesthetic", "Tegas", "Minimalis"],
        textureAndLighting: "Pencahayaan matahari terik dengan bayangan arsitektur tajam, permukaan beton matte yang berkarakter, dan efek cetak tinta yang terasa bertekstur."
      },
      typography: {
        classification: "Display Sans Padat Berkarakter Arsitektur",
        characteristics: "Jarak hurufnya (tracking) rapet banget, hurufnya jangkung tinggi, dan tebal garisnya seragam bikin visualnya berasa kokoh.",
        detectedHeadlineStyle: "Huruf kapital semua (All-caps), ditumpuk vertikal dengan jarak mepet",
        detectedFonts: [
          {
            role: "Headline / Judul Utama",
            sampleText: "THE NEW NORMAL",
            classification: "Neo-Grotesque Condensed Display Sans",
            letterformTraits: "Huruf jangkung tinggi, tarikan garis tegas, spasi antar huruf sangat rapat",
            matchedGoogleFont: {
              fontFamily: "Inter",
              confidence: 0.95,
              googleFontsUrl: "https://fonts.google.com/specimen/Inter",
              suggestedWeight: "800 ExtraBold",
              category: "sans-serif"
            }
          },
          {
            role: "Body / Teks Pendukung",
            sampleText: "Structural visual languages in contemporary urban architecture",
            classification: "Clean Modernist Grotesque",
            letterformTraits: "Lubang huruf terbuka, proporsi netral seimbang, tingkat keterbacaan tinggi",
            matchedGoogleFont: {
              fontFamily: "DM Sans",
              confidence: 0.91,
              googleFontsUrl: "https://fonts.google.com/specimen/DM+Sans",
              suggestedWeight: "700 Bold",
              category: "sans-serif"
            }
          },
          {
            role: "Accent / Label Editorial",
            sampleText: "VOL. 04 / ISSUE 2026",
            classification: "Technical Grid Monospace",
            letterformTraits: "Lebar huruf sama rata (fixed-width), gaya cetak industrial teknis",
            matchedGoogleFont: {
              fontFamily: "Space Mono",
              confidence: 0.88,
              googleFontsUrl: "https://fonts.google.com/specimen/Space+Mono",
              suggestedWeight: "700 Bold",
              category: "monospace"
            }
          }
        ],
        matchedGoogleFonts: [
          {
            fontFamily: "Inter",
            role: "Headline / Display",
            confidence: 0.95,
            googleFontsUrl: "https://fonts.google.com/specimen/Inter",
            suggestedWeight: "800 ExtraBold",
            category: "sans-serif"
          },
          {
            fontFamily: "DM Sans",
            role: "Body / Secondary",
            confidence: 0.91,
            googleFontsUrl: "https://fonts.google.com/specimen/DM+Sans",
            suggestedWeight: "700 Bold",
            category: "sans-serif"
          },
          {
            fontFamily: "Plus Jakarta Sans",
            role: "Headline Alternative",
            confidence: 0.88,
            googleFontsUrl: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
            suggestedWeight: "800 ExtraBold",
            category: "sans-serif"
          },
          {
            fontFamily: "Space Mono",
            role: "Accent / Detail",
            confidence: 0.88,
            googleFontsUrl: "https://fonts.google.com/specimen/Space+Mono",
            suggestedWeight: "700 Bold",
            category: "monospace"
          }
        ]
      },
      colorPalette: {
        dominantSwatches: [
          { hex: "#111111", rgb: [17, 17, 17], dominancePercentage: 42, role: "primary" },
          { hex: "#2A7BB5", rgb: [42, 123, 181], dominancePercentage: 24, role: "secondary" },
          { hex: "#D65038", rgb: [214, 80, 56], dominancePercentage: 16, role: "accent" },
          { hex: "#D9DFE3", rgb: [217, 223, 227], dominancePercentage: 11, role: "background" },
          { hex: "#8A9499", rgb: [138, 148, 153], dominancePercentage: 7, role: "muted" }
        ],
        contrastAssessment: {
          bgHex: "#D9DFE3",
          textHex: "#111111",
          wcagRatio: 12.8,
          isAccessible: true
        }
      },
      composition: {
        layoutType: "Grid 3-Kolom Asimetris Bergaya Urban",
        focalPoint: "Mata langsung ketarik ke blok judul utama di kiri atas yang ngebingkai bayangan gedung",
        whitespaceDensity: "balanced",
        rulesAndGuidelines: [
          "Bikin bobot tipografi jauh lebih dominan dibanding tekstur background",
          "Kunci pesan utama dengan mengisi sekitar 80% lebar kolom",
          "Gunakan biru tua sebagai warna dasar dan oranye bata buat aksen kejutan"
        ]
      },
      prompts: {
        aiGenerationPrompt: "A high-impact editorial poster design rooted in Brutalist architecture and graphic design. Features bold, monolithic sans-serif typography set against tactile textured concrete surfaces. Natural directional daylight casts sharp, dramatic geometric shadows across an asymmetrical layout. High-contrast monochromatic palette grounded with deep charcoal and crisp off-white tones, finished with subtle authentic paper grain texture.",
        pinterestKeywords: [
          "desain poster neo brutalism",
          "referensi tipografi arsitektur",
          "swiss grid editorial poster",
          "poster aesthetic kekinian",
          "brutalist graphic design inspiration"
        ],
        midjourney: "A high-impact editorial poster design rooted in Brutalist architecture and graphic design. Features bold, monolithic sans-serif typography set against tactile textured concrete surfaces. Natural directional daylight casts sharp, dramatic geometric shadows across an asymmetrical layout. High-contrast monochromatic palette grounded with deep charcoal and crisp off-white tones, finished with subtle authentic paper grain texture.",
        arenaSearch: ["neo brutalist poster", "architectural typography", "condensed sans editorial", "swiss international grid"],
        pinterestSearch: ["desain poster neo brutalism", "referensi tipografi arsitektur", "swiss grid editorial poster"],
        cosmosSearch: ["concrete typography", "monochrome editorial", "modernist outdoor poster"]
      }
    },
    isFavorite: true,
    collections: [],
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-better-things",
    slug: "better-things",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80",
    originalFilename: "better-things-ahead.jpg",
    visualDna: {
      mediaType: {
        category: "social_media_ui",
        label: "Konten Sosmed & UI",
        icon: "📱",
        reason: "Visual dinamis yang sangat cocok untuk konten street art poster & feed Instagram.",
        hasTypography: true
      },
      style: {
        primaryName: "Warm Optimistic Editorial & Street Poster",
        confidence: 0.94,
        movementHistory: "Jadi style di poster ini tuh namanya Warm Optimistic Poster dengan nuansa street art. Kombinasi antara tipografi Bauhaus klasik sama gaya cetak risograph jalanan yang lagi hits banget di kalangan kreator muda!",
        moodKeywords: ["Optimis", "Hangat", "Editorial", "Bold", "Kreatif", "Street Art"],
        textureAndLighting: "Pencahayaan sore hari yang hangat, nempel di dinding bata jalanan dengan tekstur kertas wheatpaste yang sedikit kusut natural."
      },
      typography: {
        classification: "Grotesque Padat Dinamis & Tipografi Jalanan",
        characteristics: "Punya ink traps yang tebal, jarak huruf rapet, dan lekukan tegas yang bikin pesan posternya nendang banget.",
        detectedHeadlineStyle: "Teks bertumpuk dinamis dengan ritme multi-baris yang energik",
        detectedFonts: [
          {
            role: "Headline / Judul Utama",
            sampleText: "BETTER THINGS AHEAD",
            classification: "Kinetic Brutalist Grotesque",
            letterformTraits: "Ink traps tebal di sambungan garis, proporsi padat, daya tarik visual tinggi",
            matchedGoogleFont: {
              fontFamily: "Space Grotesk",
              confidence: 0.94,
              googleFontsUrl: "https://fonts.google.com/specimen/Space+Grotesk",
              suggestedWeight: "700 Bold",
              category: "sans-serif"
            }
          },
          {
            role: "Body / Teks Pendukung",
            sampleText: "Contemporary risograph print and activist street art typography",
            classification: "Warm Geometric Sans",
            letterformTraits: "Bentuk lingkaran geometris seimbang, ritme baris nyaman, huruf terbaca jelas",
            matchedGoogleFont: {
              fontFamily: "Outfit",
              confidence: 0.90,
              googleFontsUrl: "https://fonts.google.com/specimen/Outfit",
              suggestedWeight: "400 Regular",
              category: "sans-serif"
            }
          }
        ],
        matchedGoogleFonts: [
          {
            fontFamily: "Space Grotesk",
            role: "Headline / Display",
            confidence: 0.94,
            googleFontsUrl: "https://fonts.google.com/specimen/Space+Grotesk",
            suggestedWeight: "700 Bold",
            category: "sans-serif"
          },
          {
            fontFamily: "Outfit",
            role: "Body / Secondary",
            confidence: 0.90,
            googleFontsUrl: "https://fonts.google.com/specimen/Outfit",
            suggestedWeight: "400 Regular",
            category: "sans-serif"
          }
        ]
      },
      colorPalette: {
        dominantSwatches: [
          { hex: "#FAF6EE", rgb: [250, 246, 238], dominancePercentage: 42, role: "background" },
          { hex: "#D65038", rgb: [214, 80, 56], dominancePercentage: 35, role: "primary" },
          { hex: "#111111", rgb: [17, 17, 17], dominancePercentage: 15, role: "secondary" },
          { hex: "#E89B38", rgb: [232, 155, 56], dominancePercentage: 8, role: "accent" }
        ],
        contrastAssessment: {
          bgHex: "#FAF6EE",
          textHex: "#D65038",
          wcagRatio: 4.8,
          isAccessible: true
        }
      },
      composition: {
        layoutType: "Grid Tengah Dinamis ala Billboard Jalanan",
        focalPoint: "Blok teks tebal warna oranye bata yang langsung narik perhatian",
        whitespaceDensity: "balanced",
        rulesAndGuidelines: [
          "Biarkan warna crimson hangat memicu emosi positif dan urgensi pesan",
          "Seimbangkan teks yang padat dengan ruang kosong krem yang bernapas",
          "Gunakan aksen hitam pekat untuk membingkai batas visual karya"
        ]
      },
      prompts: {
        aiGenerationPrompt: "A vibrant, optimistic wheatpaste poster installed on an urban textured city building wall. Large-scale dynamic sans-serif typography in saturated rust-orange ink on organic cream uncoated paper. Captured in warm late-afternoon natural sunlight with subtle paper wrinkles, tactile street-level print textures, and modern graphic design art direction.",
        pinterestKeywords: [
          "poster hangat optimis",
          "desain billboard tipografi",
          "street art graphic design",
          "risograph typography inspiration",
          "poster aesthetic jalanan"
        ],
        midjourney: "A vibrant, optimistic wheatpaste poster installed on an urban textured city building wall. Large-scale dynamic sans-serif typography in saturated rust-orange ink on organic cream uncoated paper. Captured in warm late-afternoon natural sunlight with subtle paper wrinkles, tactile street-level print textures, and modern graphic design art direction.",
        arenaSearch: ["warm editorial poster", "risograph activist graphic", "space grotesque type specimen"],
        pinterestSearch: ["poster hangat optimis", "desain billboard tipografi", "street art graphic design"],
        cosmosSearch: ["warm color block typography", "urban wall graphic", "tactile print design"]
      }
    },
    isFavorite: false,
    collections: [],
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-swiss-minimal",
    slug: "swiss-minimal",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80",
    originalFilename: "swiss-minimal-identity.jpg",
    visualDna: {
      mediaType: {
        category: "graphic_design",
        label: "Desain Grafis",
        icon: "🎨",
        reason: "Karya identitas visual dan poster dengan tata letak Swiss grid klasik.",
        hasTypography: true
      },
      style: {
        primaryName: "Swiss International Typographic Style",
        confidence: 0.99,
        movementHistory: "Jadi style di desain ini tuu namanya Swiss International Style! Asalnya dari era 1950-an di Swiss, konsepnya super disiplin, rapi, dan mengutamakan fungsi tanpa hiasan yang nggak perlu. Minimalis abis!",
        moodKeywords: ["Rasional", "Minimalis", "Disiplin", "Clean", "Modern", "Elegan"],
        textureAndLighting: "Cahaya studio yang super bersih, background putih matte galeri tanpa cela, dan garis vektor yang tajem maksimal."
      },
      typography: {
        classification: "Neo-Grotesque Netral dengan Disiplin Grid Swiss",
        characteristics: "Ujung hurufnya horizontal tegas, tebal garisnya matematis dan konsisten, bikin tingkat keterbacaannya sempurna.",
        detectedHeadlineStyle: "Rata kiri (flush-left ragged-right) tanpa dekorasi berlebihan",
        detectedFonts: [
          {
            role: "Headline / Judul Utama",
            sampleText: "INTERNATIONAL TYPOGRAPHIC STYLE",
            classification: "Pure Swiss Neo-Grotesque",
            letterformTraits: "Garis horizontal kaku, geometri netral, disiplin baseline matematis",
            matchedGoogleFont: {
              fontFamily: "Inter",
              confidence: 0.98,
              googleFontsUrl: "https://fonts.google.com/specimen/Inter",
              suggestedWeight: "700 Bold",
              category: "sans-serif"
            }
          },
          {
            role: "Body / Kolom Teks",
            sampleText: "Objective graphic communication free from extraneous ornamentation",
            classification: "Clean Baseline Sans",
            letterformTraits: "Ketebalan garis seragam, ascender tinggi, kejelasan informasi maksimal",
            matchedGoogleFont: {
              fontFamily: "Plus Jakarta Sans",
              confidence: 0.94,
              googleFontsUrl: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
              suggestedWeight: "500 Medium",
              category: "sans-serif"
            }
          }
        ],
        matchedGoogleFonts: [
          {
            fontFamily: "Inter",
            role: "Headline / Display",
            confidence: 0.98,
            googleFontsUrl: "https://fonts.google.com/specimen/Inter",
            suggestedWeight: "700 Bold",
            category: "sans-serif"
          },
          {
            fontFamily: "Plus Jakarta Sans",
            role: "Body / Column",
            confidence: 0.94,
            googleFontsUrl: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
            suggestedWeight: "500 Medium",
            category: "sans-serif"
          },
          {
            fontFamily: "DM Sans",
            role: "Headline Alternative",
            confidence: 0.90,
            googleFontsUrl: "https://fonts.google.com/specimen/DM+Sans",
            suggestedWeight: "700 Bold",
            category: "sans-serif"
          }
        ]
      },
      colorPalette: {
        dominantSwatches: [
          { hex: "#FFFFFF", rgb: [255, 255, 255], dominancePercentage: 65, role: "background" },
          { hex: "#0789D8", rgb: [7, 137, 216], dominancePercentage: 18, role: "primary" },
          { hex: "#111111", rgb: [17, 17, 17], dominancePercentage: 12, role: "secondary" },
          { hex: "#C8FF3D", rgb: [200, 255, 61], dominancePercentage: 5, role: "accent" }
        ],
        contrastAssessment: {
          bgHex: "#FFFFFF",
          textHex: "#111111",
          wcagRatio: 19.5,
          isAccessible: true
        }
      },
      composition: {
        layoutType: "Grid 12-Kolom Asimetris Matematis",
        focalPoint: "Kolom tipografi rata kiri yang tegas diimbangi ruang kosong super lega",
        whitespaceDensity: "spacious",
        rulesAndGuidelines: [
          "Sisakan lebih dari 60% ruang kosong (whitespace) sebagai ruang bernapas desain",
          "Jangan tambahkan ornamen dekoratif tanpa fungsi struktural yang jelas",
          "Sejajarkan semua elemen visual ke unit baseline grid yang presisi"
        ]
      },
      prompts: {
        aiGenerationPrompt: "An authentic Swiss International Typographic exhibition poster inspired by Josef Müller-Brockmann. Built on a strict 12-column mathematical baseline grid with vast intentional negative space. Flawless neo-grotesque typography in pure obsidian black and vibrant electric blue ink on pristine matte white fine-art gallery paper, radiating modern minimalism and intellectual clarity.",
        pinterestKeywords: [
          "poster gaya swiss",
          "desain layout grid rapi",
          "tipografi minimalis aesthetic",
          "swiss style graphic design",
          "josef muller brockmann inspiration"
        ],
        midjourney: "An authentic Swiss International Typographic exhibition poster inspired by Josef Müller-Brockmann. Built on a strict 12-column mathematical baseline grid with vast intentional negative space. Flawless neo-grotesque typography in pure obsidian black and vibrant electric blue ink on pristine matte white fine-art gallery paper, radiating modern minimalism and intellectual clarity.",
        arenaSearch: ["swiss graphic design", "international typographic style", "josef muller brockmann", "grid systems"],
        pinterestSearch: ["poster gaya swiss", "desain layout grid rapi", "tipografi minimalis aesthetic"],
        cosmosSearch: ["clean grid design", "monochrome with blue accent", "modernist layout"]
      }
    },
    isFavorite: false,
    collections: [],
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-editorial-portrait",
    slug: "editorial-portrait",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    originalFilename: "editorial-fashion-portrait.jpg",
    visualDna: {
      mediaType: {
        category: "photography",
        label: "Fotografi",
        icon: "📸",
        reason: "Potret fotografi mode murni tanpa elemen tipografi/teks grafis.",
        hasTypography: false
      },
      style: {
        primaryName: "Cinematic Editorial Portrait & Rembrandt Lighting",
        confidence: 0.97,
        movementHistory: "Jadi style di foto ini tuu namanya Cinematic Editorial Portrait. Mengandalkan teknik pencahayaan Rembrandt klasik yang dipaduin sama color grading modern, bikin aura subjek terasa intim, misterius, dan dramatis banget!",
        moodKeywords: ["Cinematic", "Portrait", "Moody", "Intim", "Dramatis", "Fashion"],
        textureAndLighting: "Pencahayaan single softbox dengan rasio kontras 3:1 (Rembrandt light triangle), grain analog 35mm yang halus, dan bokeh latar belakang yang creamy (f/1.8)."
      },
      typography: {
        classification: "Tidak Ada Teks Terdeteksi",
        characteristics: "Foto murni tanpa elemen tipografi atau teks grafis.",
        detectedHeadlineStyle: "",
        detectedFonts: [],
        matchedGoogleFonts: []
      },
      colorPalette: {
        dominantSwatches: [
          { hex: "#1D1917", rgb: [29, 25, 23], dominancePercentage: 54, role: "background" },
          { hex: "#B87A5E", rgb: [184, 122, 94], dominancePercentage: 22, role: "primary" },
          { hex: "#5C4033", rgb: [92, 64, 51], dominancePercentage: 14, role: "secondary" },
          { hex: "#D4AF37", rgb: [212, 175, 55], dominancePercentage: 10, role: "accent" }
        ],
        contrastAssessment: {
          bgHex: "#1D1917",
          textHex: "#B87A5E",
          wcagRatio: 4.6,
          isAccessible: true
        }
      },
      composition: {
        layoutType: "Rule of Thirds Portrait dengan Shallow Depth of Field",
        focalPoint: "Sorot mata subjek yang tajam dengan pantulan catchlight alami",
        whitespaceDensity: "spacious",
        rulesAndGuidelines: [
          "Fokuskan ketajaman lensa tepat di mata subjek yang paling dekat dengan kamera",
          "Biarkan bayangan halus di sisi wajah membangun dimensi dan kedalaman karakter",
          "Gunakan latar belakang gelap tanpa distraksi agar warna kulit menjadi pusat perhatian"
        ]
      },
      prompts: {
        aiGenerationPrompt: "Editorial fashion portrait photography of a woman, shot on 85mm f/1.4 lens, Rembrandt cinematic lighting, high-contrast chiaroscuro, natural skin texture, subtle 35mm film grain, moody warm earth tones and obsidian shadow palette, Vogue editorial quality, photorealistic masterpiece.",
        pinterestKeywords: [
          "cinematic portrait photography",
          "editorial fashion lighting",
          "rembrandt portrait inspiration",
          "moody portrait color grading",
          "foto potret aesthetic"
        ],
        midjourney: "Editorial fashion portrait photography of a woman, shot on 85mm f/1.4 lens, Rembrandt cinematic lighting, high-contrast chiaroscuro, natural skin texture, subtle 35mm film grain, moody warm earth tones and obsidian shadow palette, Vogue editorial quality.",
        arenaSearch: ["cinematic portrait", "editorial fashion lighting", "rembrandt mood photography"],
        pinterestSearch: ["cinematic portrait photography", "editorial fashion lighting", "foto potret aesthetic"],
        cosmosSearch: ["moody portrait", "earth tone portrait lighting", "fashion editorial camera angle"]
      }
    },
    isFavorite: true,
    collections: [],
    createdAt: new Date().toISOString()
  }
];
