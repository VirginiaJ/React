export interface Data {
  name: string;
  ean: string;
  type: string;
  weight: string;
  color: string;
  id: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  modalCallBack: any;
  delete: any;
}

export interface IProductsData {
  products: {
    [key: string] : {
      name: string;
      ean: string;
      type: string;
      weight: string;
      color: string;
    }
  }
}
