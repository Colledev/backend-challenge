import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: any, @Res() res): Promise<any> {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
    const token = await this.authService.login(user);
    return res.status(HttpStatus.OK).json(token);
  }

  @Post('register')
  async register(@Body() createUserDto: any, @Res() res): Promise<any> {
    const user = await this.authService.register(createUserDto);
    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed to register user' });
    }
    return res.status(HttpStatus.CREATED).json(user);
  }
}
