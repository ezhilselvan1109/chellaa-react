export type ComponentStatus = "stable" | "beta" | "experimental" | "new";

export interface NavItem {
  id: string;
  title: string;
  path: string;
  status?: ComponentStatus | undefined;
  badge?: string | undefined;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
