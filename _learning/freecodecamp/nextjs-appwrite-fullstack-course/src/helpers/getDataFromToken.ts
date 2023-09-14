import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('jwt')?.value || ''
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error: any) {
        throw new Error(error.message)
    }

}