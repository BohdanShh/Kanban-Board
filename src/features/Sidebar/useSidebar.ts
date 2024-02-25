import { useState } from 'react';
import { useTheme } from 'src/providers/ThemeProvider';
import { useBoard } from 'src/store/useBoard';

export const useSidebar = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();
  const { boards } = useBoard();

  const handleChangeTheme = (checked: boolean): void => {
    const theme = checked ? 'light' : 'dark';

    setTheme(theme);
  };

  const handleHideSidebar = (): void => setIsHidden(true);

  const handleShowSidebar = (): void => setIsHidden(false);

  return { isHidden, theme, boards, handleChangeTheme, handleHideSidebar, handleShowSidebar };
};
