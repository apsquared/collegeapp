import { NextResponse } from 'next/server';
import { getCollegeByID } from '@/dbutil/collegedb';
import { College } from '@/models/College';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const college = await getCollegeByID(params.id) as College | null;
    
    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ college });
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json(
      { error: 'Failed to fetch college' },
      { status: 500 }
    );
  }
} 