import { NextResponse } from 'next/server';
import { getAllColleges } from '@/dbutil/collegedb';
import { College } from '@/models/College';

export async function GET() {
  try {
    const colleges = await getAllColleges() as College[];
    return NextResponse.json({ colleges });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // For now, just return the body since we don't have a create function
    // You can implement this later if needed
    return NextResponse.json({ college: body }, { status: 201 });
  } catch (error) {
    console.error('Error creating college:', error);
    return NextResponse.json(
      { error: 'Failed to create college' },
      { status: 500 }
    );
  }
} 