import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'sdadasdasdasdasd11231231sdsadasd1sdas',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    
    if (!payload) {
      throw new UnauthorizedException('Invalid token payload');
    }

    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token structure');
    }

    return {
      id: payload.sub,
      email: payload.email
    };
  }
} 