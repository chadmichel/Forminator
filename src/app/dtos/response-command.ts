import { MenuItem } from './menu-item';

export interface ResponseCommand {
  guid?: string;
  screen?: string;
  title?: string;
  dataProvider?: string;
  dataQueryText?: string;
  selectItemCommand?: string;
  route?: string;
  menu?: MenuItem[];
  data?: any;
}
