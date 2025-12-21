"use server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { type Product } from "@/src/types";

export async function GET() {
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

    return NextResponse.json({ products });
  } catch (err: any) {
    console.error("API ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
