import { EyeClosedIcon, EyeOpenIcon, GridIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import { ScrollArea } from 'src/components/ui/scroll-area';
import { Switch } from 'src/components/ui/switch';
import { CreateNewBoardModal } from 'src/features/Modals';
import styles from 'src/features/Sidebar/styles.module.css';
import { useSidebar } from 'src/features/Sidebar/useSidebar';
import { cn } from 'src/lib/cn';

const Sidebar: FC = () => {
  const {
    isHidden,
    theme,
    boards,
    activeBoardId,
    setActiveBoardId,
    handleChangeTheme,
    handleHideSidebar,
    handleShowSidebar,
  } = useSidebar();

  return (
    <div
      className={cn(
        'relative w-[300px] h-full border-t-white border-solid border-r-[1px] py-[30px] px-0 flex flex-col justify-between transition-[margin] duration-300',
        isHidden && '-ml-[300px]'
      )}
    >
      <div className="font-bold uppercase mb-[22px] pl-[30px]">All boards ({boards.length})</div>
      <ScrollArea className="flex-1 pr-[30px]">
        {boards.map(({ name, id }) => (
          <div
            className={cn(
              styles.boardItem,
              id === activeBoardId &&
                'rounded-tr-[30px] rounded-br-[30px] bg-[#171717] text-[#fafafa] dark:bg-[#fafafa] dark:text-[#171717]'
            )}
            key={id}
            onClick={() => setActiveBoardId(id)}
          >
            <GridIcon className="w-[20px] h-[20px]" />
            <div className="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden">
              {name}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="px-[30px] flex flex-col gap-4">
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
