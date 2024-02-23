export interface RequestProps {
  data?: unknown;
  params?: unknown;
}

export interface CommonResponse {
  message: string;
  ok: boolean;
  data: any;
}
