import type { NextApiRequest, NextApiResponse } from 'next';
import { getPayload } from 'payload';
import payloadConfig from '../../../payload.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const payload = await getPayload({ config: payloadConfig });

    // Create new user with Payload
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'editor', // Default role for new users
      },
    });

    // Automatically log in the user after registration
    const { token } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    });

    // Set the JWT token as an HTTP-only cookie
    if (token) {
      res.setHeader('Set-Cookie', `payload-token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax;${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`);
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: 'Registration successful',
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    // Handle duplicate email error
    if (error.errors?.email?.name === 'ValidationError') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Registration failed' });
  }
} 