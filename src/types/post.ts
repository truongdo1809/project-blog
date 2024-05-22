export type Post = {
  id?: number;
  imgUrl: any;
  name: string;
  category: {
    name: string;
  };
  viewCount: string;
  comments: string[];
  share: number;
  rate: number;
  createdAt: string;
  status?: string;
  link?: string;
};
