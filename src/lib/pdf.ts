import { portfolioProjects, portfolioTitle, portfolioSubtitle, portfolioRole } from "./projects";

type PdfContent = {
  text: string;
  style?: string;
};

const toDataUri = async (src: string) => {
  try {
    const absoluteUrl = new URL(src, window.location.origin).href;
    const response = await fetch(absoluteUrl);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to data URI"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return src;
  }
};

const createHtml = async () => {
  const projectCards = await Promise.all(
    portfolioProjects.map(async (project) => {
      const imageElements = await Promise.all(
        project.images.map(async (image) => {
          const dataUri = await toDataUri(image);
          return `
            <img
              src="${dataUri}"
              alt="${project.title}"
              class="project-image"
            />
          `;
        })
      );

      return `
        <tr class="project-card">
          <td>

            <!-- PROJECT TITLE -->
            <div class="project-header">
              <span class="project-badge">Project ${project.id}</span>
              <h3 class="project-title">${project.title}</h3>
            </div>

            <!-- PROJECT IMAGES -->
            <div class="project-media">
              ${imageElements.join("")}
            </div>

            <!-- PROJECT DETAILS -->
            <div class="project-details">
              <p class="project-description">
                ${project.description}
              </p>

              <p class="project-tech">
                <strong>Technology stack:</strong>
                ${project.technologies.join(", ")}
              </p>

              <div class="project-actions">
                <a href="${project.liveUrl}" class="project-link">
                  Live Demo
                </a>

                <a href="${project.githubUrl}" class="project-link">
                  Repository
                </a>
              </div>
            </div>

          </td>
        </tr>
      `;
    })
  );

  const projectsHtml = projectCards.join("");

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${portfolioTitle}</title>
        <style>
          * {
            box-sizing: border-box;
          }

          html {
            background: #0b1224;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #0f172a;
            background: linear-gradient(135deg, #0b1224 0%, #1d2b56 40%, #f8fafc 100%);
          }

          .page {
            width: 100%;
            min-height: 100vh;
            padding: 32px;
          }

          .container {
            width: 100%;
            max-width: 980px;
            margin: 0 auto;
            padding: 36px;
            background: rgba(255, 255, 255, 0.98);
            border-radius: 32px;
            box-shadow: 0 40px 120px rgba(15, 23, 42, 0.18);
          }

          .header {
            margin-bottom: 48px;
            border-bottom: 2px solid rgba(15, 23, 42, 0.12);
            padding-bottom: 32px;
            text-align: center;
          }

          .eyebrow {
            display: none;
          }

          .title {
            font-size: clamp(3rem, 4vw, 4rem);
            margin: 0 0 16px;
            line-height: 1.05;
            color: #111827;
            font-weight: 800;
            letter-spacing: -0.02em;
          }

          .role {
            margin: 0;
            font-size: 1.15rem;
            color: #0f172a;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .subtitle {
            margin: 16px 0 0;
            max-width: 100%;
            color: #475569;
            line-height: 1.85;
            font-size: 1.05rem;
          }

          .project-list {
            width: 100%;
            border-collapse: collapse;
          }

          .project-card {
            padding: 28px 0;
            border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          }

          .project-card:last-child {
            border-bottom: none;
          }

          .project-media {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
            margin-bottom: 20px;
          }

          .project-image {
            width: 100%;
            height: auto;
            border-radius: 24px;
            object-fit: cover;
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
          }

          .project-details {
            margin-top: 4px;
          }

          .project-header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 18px;
          }

          .project-badge {
            display: inline-flex;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(16, 185, 129, 0.14);
            color: #047857;
            font-size: 0.88rem;
            font-weight: 700;
          }

          .project-title {
            margin: 0;
            font-size: 1.45rem;
            color: #0f172a;
          }

          .project-description {
            margin: 0 0 16px;
            color: #475569;
            line-height: 1.75;
            font-size: 1rem;
          }

          .project-tech {
            margin: 0 0 20px;
            color: #334155;
            font-size: 0.98rem;
            line-height: 1.7;
          }

          .project-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .project-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 140px;
            padding: 0.85rem 1.2rem;
            border-radius: 999px;
            background: #2563eb;
            color: #fff;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 600;
          }

          .project-link:hover {
            opacity: 0.92;
          }

          @media print {
            body {
              background: #ffffff;
            }

            .container {
              box-shadow: none;
              border-radius: 0;
              padding: 24px;
            }

            .project-link {
              background: #111827;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="container">
            <div class="header">
              <h1 class="title">${portfolioTitle}</h1>
              <p class="role">${portfolioRole}</p>
              <p class="subtitle">${portfolioSubtitle}</p>
            </div>
            <table class="project-list">
              ${projectsHtml}
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
};

const waitForImages = (doc: Document) => {
  const images = Array.from(doc.images);
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    )
  );
};

export const generatePortfolioPdf = async () => {
  const html = await createHtml();
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.src = url;
  document.body.appendChild(iframe);

  return new Promise<void>((resolve) => {
    iframe.onload = async () => {
      const doc = iframe.contentDocument;
      if (!doc) {
        resolve();
        return;
      }
      await waitForImages(doc);
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
        URL.revokeObjectURL(url);
        resolve();
      }, 500);
    };
  });
};
