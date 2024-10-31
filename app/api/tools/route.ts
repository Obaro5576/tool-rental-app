import { NextResponse } from 'next/server';
import tools from '../../../data/tools.json';

interface Tool {
    type: string;
    code: string;
    brand: string;
}

export async function GET() {
    return NextResponse.json(tools as Tool[]);
}
