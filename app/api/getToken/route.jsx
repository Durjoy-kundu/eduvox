
import { AssemblyAI } from "assemblyai"
const assemblyAi  = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_API_KEY,
})
export async function GET(req) {
    const token= await assemblyAi.realtime.createTemporaryToken({
        expires_in: 3600})
}