import { fetchAllHighlights } from '@/lib/services/highlightService';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const grouped = await fetchAllHighlights();
    return NextResponse.json(grouped); // no `return` — match express handler typing
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
