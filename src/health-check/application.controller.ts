import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IApplicationForm } from './interfaces/application.request';
import { ApplicantService } from './services/applicant.service';

@Controller('/form')
export class ApplicationController {
  constructor(
    private readonly userService: ApplicantService,
  ) { }

  @Post('/submit')
  async saveApplication(@Body() application: IApplicationForm) {
    const newUser = await this.userService.processApplication(application);
    return newUser;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: './uploads'
  }))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }

  @Get('/test')
  getHello(): string {
    return 'application form is working!';
  }

  @Get('/applicant-list')
  applicantList() {
    return this.userService.getApplicant()

  }
}
