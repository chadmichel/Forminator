export interface RequestCommand {
  guid?: string;
  text?: string;
  query?: string;
  provider?: string;
  data?: any;
  commandType?: string;
}
