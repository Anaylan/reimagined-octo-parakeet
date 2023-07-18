import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare interface UserRequest extends Request {
    user: JwtPayload | string | null;
}