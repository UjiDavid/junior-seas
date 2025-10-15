import {
  fetchSingleProduct,
  updateProduct,
} from '@/lib/services/productService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await here}catch (error) {
    const singleProduct = await fetchSingleProduct(id);
    return NextResponse.json(singleProduct);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await here}catch (error) {
    const updatedProduct = await updateProduct(
      id,
      req.body
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
