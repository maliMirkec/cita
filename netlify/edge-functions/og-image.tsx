// @ts-nocheck - Deno imports not recognized by VS Code
import satori, { init as initSatori } from "https://esm.sh/satori@0.10.14/wasm";
import initYoga from "https://esm.sh/yoga-wasm-web@0.3.3";
import { Resvg, initWasm as initResvg } from "https://esm.sh/@resvg/resvg-wasm@2.6.2";

// Track initialization state
let initialized = false;

async function initialize() {
  if (initialized) return;

  try {
    // Initialize Yoga (for satori layout)
    const yogaWasm = await fetch(
      "https://unpkg.com/yoga-wasm-web@0.3.3/dist/yoga.wasm"
    );
    const yoga = await initYoga(await yogaWasm.arrayBuffer());
    initSatori(yoga);

    // Initialize Resvg (for PNG conversion)
    const resvgWasm = await fetch(
      "https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm"
    );
    await initResvg(await resvgWasm.arrayBuffer());

    initialized = true;
  } catch (e) {
    // If already initialized, that's fine
    if (e.message?.includes("Already initialized")) {
      initialized = true;
    } else {
      throw e;
    }
  }
}

export default async function handler(request: Request) {
  await initialize();

  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";
  const subtitle = url.searchParams.get("subtitle") || "";

  const defaultTitle = lang === "hr"
    ? "Vaš partner za izradu web stranica"
    : "Your partner for building websites";

  const title = url.searchParams.get("title") || defaultTitle;

  const subtitleText =
    subtitle || (lang === "hr" ? "Web Development Studio" : "Web Development Studio");

  // Load font
  const fontResponse = await fetch(
    "https://og-playground.vercel.app/inter-latin-ext-400-normal.woff"
  );
  const fontData = await fontResponse.arrayBuffer();

  // Try to fetch and encode logo
  let logoDataUrl: string | null = null;
  try {
    const logoRes = await fetch(
      `${url.origin}/favicon/studio-cita-turquoise.svg`
    );
    if (logoRes.ok) {
      const buffer = await logoRes.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      logoDataUrl = `data:image/svg+xml;base64,${btoa(binary)}`;
    }
  } catch {
    console.log("Could not load logo");
  }

  const jsx = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#110920",
        background:
          "linear-gradient(135deg, #110920 0%, #1a0f2e 50%, #2d1b4e 100%)",
        padding: "60px",
      },
      children: [
        logoDataUrl
          ? {
              type: "img",
              props: {
                src: logoDataUrl,
                width: 331.3333333333333,
                height: 52,
                style: {
                  marginBottom: "30px",
                },
              },
            }
          : null,
        {
          type: "div",
          props: {
            style: {
              fontSize: "52px",
              fontWeight: 400,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.3,
              maxWidth: "800px",
              marginBottom: "20px",
            },
            children: title,
          },
        },
        subtitleText
          ? {
              type: "div",
              props: {
                style: {
                  fontSize: "26px",
                  color: "#9370D8",
                  textAlign: "center",
                },
                children: subtitleText,
              },
            }
          : null,
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "40px",
              fontSize: "22px",
              color: "#666666",
            },
            children: "cita.hr",
          },
        },
      ].filter(Boolean),
    },
  };

  const svg = await satori(jsx, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  // Convert SVG to PNG
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
