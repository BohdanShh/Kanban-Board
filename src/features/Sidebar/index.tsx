import { EyeClosedIcon, EyeOpenIcon, GridIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Switch } from 'src/components/ui/switch';
import { CreateNewBoardModal } from 'src/features/Modals';
import styles from 'src/features/Sidebar/styles.module.css';
import { cn } from 'src/lib/cn';
import { useTheme } from 'src/providers/ThemeProvider';

const Sidebar: FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (checked: boolean): void => {
    const theme = checked ? 'light' : 'dark';

    setTheme(theme);
  };

  const handleHideSidebar = (): void => setIsHidden(true);

  const handleShowSidebar = (): void => setIsHidden(false);

  return (
    <div
      className={cn(
        'relative w-[300px] h-full border-t-white border-solid border-r-[1px] p-[30px] pl-0 flex flex-col justify-between transition-[transform] duration-300',
        isHidden && '-translate-x-full'
      )}
    >
      <div className="text-[#171717] dark:text-[#fafafa]">
        <div className="font-bold uppercase mb-[22px] pl-[30px]">All boards (0)</div>
        <div className="flex flex-col gap-2">
          <div className={styles.boardItem}>
            <GridIcon className="w-[20px] h-[20px]" />
            <div className="text-xl font-bold">Roadmap</div>
          </div>
          <div className={styles.boardItem}>
            <GridIcon className="w-[20px] h-[20px]" />
            <div className="text-xl font-bold">Marketing plan</div>
          </div>
        </div>
      </div>
      <div className="pl-[30px] flex flex-col gap-4">
        <CreateNewBoardModal
          modalTriggerElement={
            <Button
              className="flex items-center gap-3 text-xl font-bold w-full"
              variant="ghost"
            >
              + Create new board
            </Button>
          }
        />
        <div className="p-3 flex items-center justify-center gap-3 bg-primary rounded-md transition-colors">
          <MoonIcon className="text-primary-foreground w-[20px] h-[20px]" />
          <Switch
            checked={theme === 'light'}
            onCheckedChange={handleChangeTheme}
          />
          <SunIcon className="text-primary-foreground w-[20px] h-[20px]" />
        </div>
        <Button
          className="flex items-center justify-center gap-2"
          variant="default"
          onClick={handleHideSidebar}
        >
          <EyeClosedIcon />
          <div>Hide sidebar</div>
        </Button>
      </div>
      {isHidden && (
        <Button
          className="absolute w-16 bottom-[30px] right-0 translate-x-full rounded-tr-[30px] rounded-br-[30px]"
          onClick={handleShowSidebar}
        >
          <EyeOpenIcon />
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
