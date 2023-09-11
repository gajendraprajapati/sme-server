import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
const fs = require('fs');
import internal = require('stream');


@Injectable()
export class S3Service {
  private s3: AWS.S3;
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "us-west-2",
      signatureVersion: 'v4',
    });
    // @ts-ignore
    this.s3 = new AWS.S3();
  }
  async uploadFile(
    file: any,
    fileName: string,
    folderName: string,
    bucketName?: string,
    mimeType?: string
  ): Promise<any> {
    const { s3 } = this;
    const s3Params = {
      Bucket: bucketName,
      Key: `${folderName}/${fileName}`,
      Body: file,
      ContentType: mimeType
    };

    return new Promise((resolve, reject) => {
      // @ts-ignore
      s3.upload(s3Params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  async downloadFile(key: string, bucketName?: string): Promise<any> {
    const { s3 } = this;
    const s3Params = {
      Bucket: bucketName,
      Key: key,
    };

    return new Promise((resolve, reject) => {
      // @ts-ignore
      s3.getObject(s3Params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

}