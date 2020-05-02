export interface Data {
  name: string;
  ean: number;
  type: string;
  weight: number;
  color: string;
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
}
