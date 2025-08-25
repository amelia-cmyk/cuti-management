import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService, private jwt: JwtService) {}

  @Post('login')
  async login(@Body() body: LoginAdminDto) {
    const admin = await this.adminService.validate(body.email, body.password);
    if (!admin) return { ok: false, message: 'Email atau password salah' };

    const accessToken = await this.jwt.signAsync(
      { sub: admin.id, email: admin.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );

    const { passwordHash, ...safe } = admin as any;
    return { ok: true, accessToken, admin: safe };
  }

  @Post('logout')
  logout() {
    // Stateless JWT: FE cukup hapus token
    return { ok: true };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() req: any) {
    const me = await this.adminService.findById(req.user.userId);
    if (!me) return null;
    const { passwordHash, ...safe } = me as any;
    return safe;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me/profile')
  async updateMe(@Req() req: any, @Body() body: UpdateAdminDto) {
    const updated = await this.adminService.updateProfile(req.user.userId, body);
    const { passwordHash, ...safe } = updated as any;
    return safe;
  }
}
