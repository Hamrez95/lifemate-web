import type { Dictionary } from "./content-types";
export const en: Dictionary = {
    dir: "ltr",
    nav: { home: "Home", ecosystem: "Ecosystem", wellmate: "WellMate", caremate: "CareMate", story: "Our story", contact: "Contact", early: "Early access" },
    common: {
      learnMore: "Learn more", how: "How it works", comingSoon: "Coming soon", earlyAccess: "Early access", products: "LifeMate products",
      privacyPill: "Sharing only with your permission", disclaimer: "LifeMate does not replace professional medical advice, diagnosis, treatment, or emergency services.",
      chooseApps: "Two LifeMate products", close: "Close"
    },
    meta: {
      home: { title: "LifeMate | Your health, your family's peace of mind", description: "LifeMate is a family health and care ecosystem connecting WellMate for personal health with CareMate for permission-based family care." },
      wellmate: { title: "WellMate | Your personal health companion", description: "WellMate helps organize medications, checkups, tests, vital signs, routines and personal health records in one calm experience." },
      caremate: { title: "CareMate | Family care with more peace of mind", description: "CareMate supports remote family care, shared alerts and care coordination while keeping consent and personal independence central." },
      ecosystem: { title: "LifeMate Ecosystem | Connecting WellMate and CareMate", description: "LifeMate is the secure connection layer between personal health in WellMate and family care in CareMate." },
      about: { title: "About LifeMate | Care without intrusion", description: "LifeMate grew from a real family-care problem and over a year of product research, UX, architecture, documentation and MVP development." },
      contact: { title: "Contact LifeMate", description: "Contact LifeMate about early access, collaboration or a professional conversation." },
      investors: { title: "Partnerships & investors | LifeMate", description: "A public introduction for potential LifeMate partners and investors. Confidential plans and financials remain private." },
      privacy: { title: "Privacy | LifeMate", description: "LifeMate privacy principles: consent, access control and careful handling of health information." },
      terms: { title: "Terms | LifeMate", description: "General terms for the LifeMate public website and product introduction." },
      "cookie-policy": { title: "Cookie policy | LifeMate", description: "Cookie and local-storage policy for the LifeMate public website." }
    },
    home: {
      eyebrow: "Health and care, connected",
      title: "Your health and the people you love,",
      highlight: "closer than ever.",
      intro: "LifeMate connects personal health management with family care: WellMate for you, CareMate for people you choose to keep close.",
      storyTitle: "Sometimes distance is more than kilometres.", storyText: "When someone you love is far away, simple questions repeat: Did they take their medication? How are they today? When is the next appointment? LifeMate aims to reduce that everyday uncertainty without turning care into surveillance.",
      stepsTitle: "Three simple steps to more peace of mind", steps: [
        { title: "Organize your health", text: "Keep medications, checkups and routines together in WellMate." },
        { title: "Connect people you trust", text: "Choose exactly who can see what, and for how long." },
        { title: "Care without hovering", text: "CareMate shows the essentials so support can be timely and respectful." }
      ],
      productTitle: "Two experiences, one connected ecosystem", wellText: "A personal health space for medication reminders, routines, tests, vital signs and simple records.", careText: "A family-care space for essential status, coordination and timely follow-up — with respect for independence.",
      connectTitle: "Connected with permission and respect", connectText: "LifeMate does not make everything visible by default. You decide what can be shared, with whom, and until when.",
      trustTitle: "Trust is the foundation.", trustText: "Visible access, minimal sharing and the ability to change or revoke permissions are core LifeMate design principles.",
      aboutTitle: "It started with a simple question...", aboutText: "If someone you love lives far away, how do you know they are okay without calling them all day? That question started LifeMate.",
      partnerTitle: "A conversation about the future of family care", partnerText: "If you work in health, technology or investment, we would be happy to discuss LifeMate privately.",
      faqTitle: "Frequently asked questions", faqs: [
        { q: "What is LifeMate?", a: "LifeMate is not a standalone downloadable app. It is the ecosystem and connection layer between WellMate and CareMate." },
        { q: "What is WellMate?", a: "WellMate is the personal health space for routines, medications, checkups and health information." },
        { q: "What is CareMate?", a: "CareMate is designed for family members or caregivers to view selected care summaries with the person's permission." },
        { q: "How does connected family care work?", a: "The WellMate user sets permissions; LifeMate processes only allowed information and makes the appropriate summary available in CareMate." },
        { q: "What information can family see?", a: "Only what the user explicitly shares. Access can be limited by data type and time." },
        { q: "Does LifeMate replace a doctor?", a: "No. LifeMate is a health-management and care-coordination product, not a substitute for professional medical care." }
      ]
    },
    wellmate: {
      eyebrow: "Your personal health space", title: "A health companion for real-life days", intro: "WellMate is designed to remember the things that should not slip through the cracks — medications, supplements, tests, checkups and daily routines.",
      capabilities: ["Medication & supplement reminders", "Checkups and tests", "Vital signs and daily logs", "Health routines", "Smart calendar", "Personal health record"],
      calendarTitle: "Your smart calendar", calendarText: "Health reminders, tests and routines are organized in one calm view — not to add more noise, but to keep important things from being missed.",
      morningTitle: "A busy morning, simplified", morningText: "Morning medication, a checkup and a short walk: WellMate turns scattered memory into a clear plan.",
      supportTitle: "Connected through LifeMate", supportText: "When you choose, selected summaries can move through LifeMate and become available to CareMate."
    },
    caremate: {
      eyebrow: "Support without intrusion", title: "Care, with more peace of mind", intro: "CareMate helps you stay aware of the people you love without making them feel watched or controlled.",
      capabilities: ["Family health summaries", "Shared reminders and alerts", "Family care calendar", "Care coordination", "Treatment status", "Mood and energy check-ins"],
      consentTitle: "Family connection with consent", consentText: "Access starts only with permission. The person chooses what is visible and can change or revoke access at any time.",
      moodTitle: "How they feel matters", moodText: "Care is not only medication and numbers. Short check-ins can help families notice meaningful moments earlier.",
      togetherTitle: "Connected in LifeMate", togetherText: "WellMate and CareMate are separate experiences; LifeMate creates the controlled connection between them."
    },
    ecosystem: {
      eyebrow: "A secure, intelligent connection layer", title: "LifeMate bridges health and care", intro: "WellMate and CareMate do not need to become one crowded app. LifeMate sits between them and moves only the information allowed by the selected sharing policy.",
      flowTitle: "One event, one controlled journey", wellEvent: "Vitamin B taken — 08:00", coreSteps: ["Permission check", "Secure processing", "Summary", "Sharing policy"], careSummary: "Today's summary: Vitamin B was taken.",
      permissionTitle: "Connection with permission and clarity", permissionText: "You stay in control: what is shared, with whom, and for how long.",
      futureTitle: "LifeMate does not stop here", futureText: "Future journeys are being explored and tested. Details stay private until they are ready for public release."
    },
    about: {
      title: "LifeMate started with a real family-care experience.", intro: "Medication routines, physical distance and repeated check-ins raised one question: can care become simpler without taking independence away from the person receiving it?",
      originTitle: "Care without intrusion", originText: "LifeMate evolved into two connected experiences: WellMate for the individual and CareMate for family. The goal is to turn stressful follow-up into a calmer, clearer care flow.",
      founderTitle: "Founder", founderText: "Hamidreza Pakpour — Founder of LifeMate, Product Owner and Backend Developer focused on C#/.NET and software architecture, alongside MBA studies. LifeMate has been developed through more than a year of product work, research, UX, documentation, architecture and MVP development.",
      principleTitle: "Principles shaping the product", principles: ["Personal independence", "Family care without intrusion", "Consent and access control", "Simplicity for real life", "Transparency and trust"]
    },
    contact: { title: "Have something to say? We'd love to hear it.", intro: "For early access, collaboration or a professional conversation about LifeMate, email us directly.", emailLabel: "Email", earlyTitle: "Early access", earlyText: "WellMate and CareMate have not launched publicly yet. To be notified about the test release, use “Early Access” as the email subject." },
    investors: { title: "A private conversation for partnership and investment", intro: "The public LifeMate site intentionally excludes confidential financials, roadmap details and internal architecture.", noteTitle: "Full information is shared privately", noteText: "Pitch materials, research, financial models, technical details and development plans are shared only with relevant parties in a direct conversation.", cta: "Request a private meeting" },
    legal: {
      privacyTitle: "Privacy", privacy: ["LifeMate is designed around consent and user control over health-information sharing.", "The public website does not collect medical user data in this preview.", "Product caregiver access must be limited, visible and revocable.", "Final product policies for data processing, retention, account deletion and user rights will be published before public launch."],
      termsTitle: "Terms of use", terms: ["This website introduces the LifeMate ecosystem and its two products, WellMate and CareMate.", "Website content is product information and is not medical advice or diagnosis.", "LifeMate names, marks and content remain subject to applicable ownership rights.", "Final application service terms will be completed before public launch."],
      cookieTitle: "Cookie policy", cookie: ["This preview is not designed for behavioural advertising or third-party tracking.", "Theme preference may be stored in browser localStorage so light/dark selection persists.", "If essential analytics are introduced, this policy will be updated before public activation."]
    }
  };
