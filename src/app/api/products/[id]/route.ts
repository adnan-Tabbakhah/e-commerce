import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { type Product } from "@/src/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  try {
    const filePath = path.join(process.cwd(), "src", "store", "data.json");

    if (!fs.existsSync(filePath)) {
      console.error("File not found at:", filePath);
      return NextResponse.json(
        { error: `File not found at: ${filePath}` },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileContent);

    const products: Product[] = json;
    const product = products.find((p) => String(p.id) === id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (err: any) {
    console.error("API ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
