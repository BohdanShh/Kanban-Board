import { FC } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const TaskBoard: FC = () => {
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollContainer
        className="scroll-container h-full"
        vertical
        horizontal
      >
        <div className="whitespace-nowrap text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis quasi et saepe totam minus
          eligendi similique nam debitis maxime, quisquam ab laborum dolores earum natus. Dolore
          facere similique atque deleniti nostrum et sunt a labore dolores laudantium laboriosam
          quis dolor officiis exercitationem officia magni quisquam incidunt suscipit, quos
          blanditiis cum impedit sequi corrupti recusandae. Molestias libero nulla repudiandae
          voluptatem dolorem corrupti, aspernatur numquam praesentium veniam aliquam, odit iusto
          eveniet delectus! Cumque doloremque nostrum sit neque ipsam deleniti officia, tempore,
          praesentium eos veritatis mollitia enim ducimus quos quia et assumenda ab doloribus. Vel,
          eos cumque! Nulla, id. At commodi accusantium vero.
        </div>
      </ScrollContainer>
    </div>
  );
};

export default TaskBoard;
