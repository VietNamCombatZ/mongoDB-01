import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { RequestDto } from '../../auth/adapter/dto';

export class UpdatePostBody extends RequestDto {
  @IsOptional()
  @IsString()
  title: string;


  @IsOptional()
  @IsString()
  markdown?: string;

  
  @IsOptional()
  @IsString()
  image?: string;


  @IsOptional()
  @IsArray()
  tags?: string[];

  constructor(body: any) {
    super();
    if (body) {
      this.title = body.title ?? this.title;
      this.markdown = body.markdown ?? this.markdown;
      this.image = body.image ?? this.image;
      this.tags = body.tags ?? this.tags;
    }
  }
}

export class CreatePostBody extends RequestDto {
  title: string;
  markdown: string;
  image: string;
  tags: string[];

  constructor(body: any) {
    super();
    if (body) {
      this.title = body.title;
      this.markdown = body.markdown;
      this.image = body.image;
      this.tags = body.tags;
    }
  }
}

// Data transfer object
export class GetPostDto extends RequestDto {
  @Length(24)
  id: string;

  constructor(requestParams: any) {
    super();
    if (requestParams) {
      this.id = requestParams.id;
    }
  }
}

export class UpdatePostDto extends RequestDto {
  title: string;
  markdown: string;
  image: string;
  tags: string[];

  constructor(body: any) {
    super();
    if (body) {
      this.title = body.title;
      this.markdown = body.markdown;
      this.image = body.image;
      this.tags = body.tags;
    }
  }
}