import {useIslandContent} from '$/src/components/global/Island/island-repo';

import {OrderPhase} from '../order/types';

export type MenuItemType = {
  action(): void;
  icon: {
    component: React.ReactNode;
    backgroundColor: string;
    // props: ComponentProps<typeof Ionicons>;
  };
  text: string;
  color: string;
};

export type IslandState = {
  showIsland: boolean;
  islandMessage?: {
    title: string | React.ReactNode;
    text: string | React.ReactNode;
    icon?: React.FC<React.SVGProps<SVGElement>>;
  };
  actionConfirm?(): void;
  actionCancel?(): void;
  disableOnClick: boolean;
  children?: React.ReactNode | JSX.Element;
  className?: string;
  type?: 'menu' | 'notification' | 'chat' | 'custom';
  pingReceptor: number;
  menuItems: MenuItemType[];
  menuItemsKey: OrderPhase;
  content?: keyof ReturnType<typeof useIslandContent>;
};

export type TriggerIsland = {
  message?: IslandState['islandMessage'];
  confirm?(): void;
  cancel?(): void;
  clickToDisable?: boolean;
  show?: boolean;
  type?: IslandState['type'];
  children?: IslandState['children'];
  className?: string;
};
