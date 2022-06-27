import create from 'zustand';

type StoreTypes = {
  screenSize: {
    dynamicWidth: number;
    dynamicHeight: number;
  };
  showMenu: boolean;
  setScreenSize: (width: number, height: number) => void;
  setShowMenu: (value: boolean) => void;
};

export const useStore = create<StoreTypes>((set) => ({
  screenSize: {
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  },
  showMenu: window.innerWidth >= 767 ? true : false,
  setScreenSize: (width, height) =>
    set({ screenSize: { dynamicWidth: width, dynamicHeight: height } }),
  setShowMenu: (value: boolean) => set({ showMenu: value })
}));
