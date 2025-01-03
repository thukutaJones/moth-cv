import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: NextRequest) {
  try {
    const { htmlContent } = await req.json();

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    console.log("Browser launched");

    const page = await browser.newPage();
    console.log("New page created");

    await page.setContent(htmlContent, { waitUntil: "load" });
    console.log("HTML content set");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    console.log("PDF generated");

    await browser.close();
    console.log("Browser closed");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=document.pdf",
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error.message },
      { status: 500 }
    );
  }
}
