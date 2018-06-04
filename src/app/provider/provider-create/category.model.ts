export class Category {
  id: number;
  title: string;
  description: string;
  picture_url: string;
  articles: Sleep[];

}

export class Sleep {
  id: number;
  title: string;
  description: string;
  article: string;
  picture_url: string;
  video_url: string;
  tips: Tips[];
}

export class Tips {
  tips_id: number;
  topic: string;
  content: string;
}

export class TipDetail {
  topic: string;
  content: string;
}
