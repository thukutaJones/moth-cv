import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { htmlContent } = await req.json();

    if (!htmlContent || typeof htmlContent !== "string") {
      return NextResponse.json({ error: "Invalid HTML content" }, { status: 400 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=document.pdf",
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error.message },
      { status: 500 }
    );
  }
}
