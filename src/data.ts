import type { Project } from "./types";

export const projects: Project[] = [
  {
    data_open: crypto.randomUUID(),
    desc: "Nextjs Reddit clone",
    title: "Red.dot",
    github_link:
      "https://github.com/Agreatdayforfreedom/Red.dot---Next.js-Reddit-Clone-",
    page_link: "https://reddot-roan.vercel.app/",
    img_paths: ["/home.avif"],
    tecnologies: [
      { content: "Next.js", color: "#374151" },
      { content: "Postgresql", color: "#008bb9" },
      { content: "Typescript", color: "#3178c6" },
      { content: "Auth.js", color: "#b814ad" },
    ],
  },
  {
    data_open: crypto.randomUUID(),
    title: "Library",
    desc: "E-commerce of books",
    github_link:
      "https://github.com/Agreatdayforfreedom/react-nestjs-ecommerce",
    page_link: "https://github.com/Agreatdayforfreedom/react-nestjs-ecommerce",
    img_paths: ["/library1.avif", "/library2.avif"],
    tecnologies: [
      { content: "React", color: "#04d8f9" },
      { content: "Postgresql", color: "#008bb9" },
      { content: "Nest.js", color: "#E0234E" },
      { content: "Typescript", color: "#3178c6" },
    ],
  },

  {
    data_open: crypto.randomUUID(),
    title: "Heapoverflow",
    desc: "Stackoverflow clone with MERN stack",
    github_link:
      "https://github.com/Agreatdayforfreedom/stackoverflow-mern-clone",
    page_link: "https://stackoverflow-mern-clone.vercel.app/",
    img_paths: ["/heapoverflow1.avif", "/heapoverflow2.avif"],
    tecnologies: [
      { content: "Node.js", color: "#83BA63" },
      { content: "Typescript", color: "#3178c6" },
      { content: "Mongodb", color: "#00ED64" },
      { content: "Redux", color: "#764ABC" },
      { content: "React.js", color: "#04d8f9" },
    ],
  },
  {
    data_open: crypto.randomUUID(),
    title: "TaskBoard",
    desc: "Beautiful Trello clone with Nextjs, Postgresql and stripe",
    github_link: "https://github.com/Agreatdayforfreedom/trello-clone",
    page_link: "https://trello-clone-psi-nine.vercel.app/sign-in?mode=test",
    img_paths: ["/trello1.avif", "/trello2.avif"],
    tecnologies: [
      { content: "Next.js", color: "#374151" },
      { content: "Postgresql", color: "#008bb9" },
      { content: "Typescript", color: "#3178c6" },
      { content: "Clerk", color: "#562ABC" },
    ],
  },
  {
    data_open: crypto.randomUUID(),
    title: "Dye - Palette generator",
    desc: "A Tailwind palette generator ",
    github_link: "https://github.com/Agreatdayforfreedom/dye",
    page_link: "https://dye-1g1t.vercel.app/",
    img_paths: ["/dye.avif"],
    tecnologies: [
      { content: "Next.js", color: "#374151" },
      { content: "Zustand", color: "#413e38" },
    ],
  },
  {
    data_open: crypto.randomUUID(),
    title: "Particle System",
    desc: "GPU accelerated particle system",
    github_link: "https://github.com/Agreatdayforfreedom/particle_system",
    page_link: "/ps",
    img_paths: ["/ps1.png"],
    tecnologies: [
      { content: "Rust", color: "#B7410E" },
      { content: "Wgpu", color: "#004891" },
    ],
  },
  {
    data_open: crypto.randomUUID(),
    title: "Space shooter",
    desc: "Space shooter made with Rust",
    github_link: "https://github.com/Agreatdayforfreedom/wgpu-game",
    page_link:
      "https://github.com/Agreatdayforfreedom/wgpu-game?tab=readme-ov-file#space-shooter",
    img_paths: [],
    tecnologies: [
      { content: "Rust", color: "#B7410E" },
      { content: "Wgpu", color: "#004891" },
    ],
  },

  {
    data_open: crypto.randomUUID(),
    title: "Image to ASCII",
    desc: "Convert bmp images to ascii art",
    github_link: "https://github.com/Agreatdayforfreedom/image-to-ascii",
    page_link: "https://github.com/Agreatdayforfreedom/image-to-ascii",
    img_paths: ["/girl.avif", "/bulm.avif"],
    tecnologies: [{ content: "C", color: "#374151" }],
  },
];
