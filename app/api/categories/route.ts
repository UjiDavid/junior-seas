import { fetchCategories } from '@/lib/services/categoryService';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const categories = await fetchCategories();
    return NextResponse.json({ success: true, categories }); // no `return` — match express handler typing
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load categories',
      },
      { status: 500 }
    );
  }
}
