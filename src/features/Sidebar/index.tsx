import { EyeNoneIcon, GridIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import { Switch } from 'src/components/ui/switch';
import styles from 'src/features/Sidebar/styles.module.css';

const Sidebar: FC = () => {
  return (
    <div className="w-[300px] h-full bg-black border-t-white border-solid border-r-[1px] p-[30px] pl-0 flex flex-col justify-between">
      <div className="text-white">
        <div className="text-white font-bold uppercase mb-[30px] pl-[30px]">All boards (0)</div>
        <div className="flex flex-col gap-2">
          <div className={styles.boardItem}>
            <GridIcon className="w-[20px] h-[20px]" />
            <div className="text-xl font-bold">Roadmap</div>
          </div>
          <div className={styles.boardItem}>
            <GridIcon className="w-[20px] h-[20px]" />
            <div className="text-xl font-bold">Marketing plan</div>
          </div>
          <div className="flex items-center gap-3 pl-[30px] py-2">
            <GridIcon className="w-[20px] h-[20px]" />
            <div className="text-xl font-bold">+ Create new board</div>
          </div>
        </div>
      </div>
      <div className="pl-[30px] flex flex-col gap-4">
        <div className="p-3 flex items-center justify-center gap-3 bg-[#111] rounded-md">
          <MoonIcon className="text-white w-[20px] h-[20px]" />
          <Switch />
          <SunIcon className="text-white w-[20px] h-[20px]" />
        </div>
        <Button
          className="flex items-center justify-start gap-2"
          variant="default"
        >
          <EyeNoneIcon />
          <div>Hide sidebar</div>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
