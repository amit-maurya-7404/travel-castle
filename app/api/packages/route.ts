import { connectDB } from '@/lib/mongodb';
import { Package } from '@/lib/models';
import { useMockData, getPackages, createPackage } from '@/lib/mockData';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const type = searchParams.get('type') || undefined;
    const publishedParam = searchParams.get('published');
    const published = publishedParam === 'true' ? true : publishedParam === 'false' ? false : undefined;

    if (useMockData) {
      const data = getPackages({ category, type, published });
      return NextResponse.json(data);
    }

    await connectDB();

    const query: any = {};
    if (category) query.category = category;
    if (type) query.type = type;
    if (published !== undefined) query.published = published;

    const packages = await Package.find(query).sort({ createdAt: -1 });
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error in GET packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (useMockData) {
      const result = createPackage(body);
      return NextResponse.json(result, { status: 201 });
    }

    await connectDB();

    const newPackage = await Package.create({
      title: body.title,
      description: body.description,
      category: body.category,
      type: body.type || 'domestic',
      image: body.image,
      duration: body.duration,
      price: body.price,
      highlights: body.highlights || [],
      itinerary: body.itinerary || [],
      published: body.published !== false,
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error('Error in POST packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
