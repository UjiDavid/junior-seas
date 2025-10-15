import { searchProductsService } from '@/lib/services/searchService';
import { createClient } from '@/lib/services/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    if (!q) {
      return NextResponse.json({ products: [] });
    }

    const results = await searchProductsService(q);
    // Log search query to search_history table
    await supabase.from('search_history').insert([
      {
        query: q,
        user_id: null, // or req.user?.id if you have auth
        product_id: results?.[0]?.id || null, // optional: first match
      },
    ]);
    return NextResponse.json(
      { products: results },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      '❌ Error in searchProducts:',
      error.message || error
    );
    return NextResponse.json(
      { error: error.message || 'Search failed' },
      { status: 500 }
    );
  }
}
