export interface RequestCommand {
  guid?: string;
  browserSessionGuid?: string;
  sessionGuid?: string;

  text?: string;
  query?: string;
  data?: any;
  commandType?: string;
}
