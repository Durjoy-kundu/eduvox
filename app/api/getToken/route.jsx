
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        console.log('API endpoint called - getToken');
        console.log('AssemblyAI API Key:', process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY ? 'Present' : 'Missing');
        
        // Return the API key directly for client-side use with Universal Streaming API
        // The client will connect directly to AssemblyAI's WebSocket endpoint
        const apiKey = process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json(
                { error: 'AssemblyAI API key not configured' }, 
                { status: 500 }
            );
        }
        
        console.log('API key returned successfully');
        return NextResponse.json({ apiKey });
    } catch (error) {
        console.error('Error in getToken:', error);
        return NextResponse.json(
            { error: 'Failed to get API configuration' }, 
            { status: 500 }
        );
    }
}