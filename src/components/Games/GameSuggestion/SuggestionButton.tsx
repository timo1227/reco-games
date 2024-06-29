import { SuggestionGames } from '@/types/Games';
import useGameContext from '@/hooks/useGameContext';
import { toast } from '@/components/ui/use-toast';

interface Props {
  gameID: string;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setSuggestions: (suggestions: SuggestionGames['games']) => void;
}

export default function SuggestionsButton({ gameID, setSuggestions, isLoading, setLoading }: Props) {
  const { gameList: games } = useGameContext();

  const handleSuggestionsClick = () => {
    return toast({
      title: 'Coming Soon',
      description: 'This feature is not available yet.',
    });
  };

  return (
    <div className='flex justify-center'>
      <button
        className='rounded border-2 border-black bg-white px-4 py-2 text-black transition hover:cursor-pointer hover:bg-slate-200 dark:border-white dark:bg-black/60 dark:text-white dark:hover:bg-black/50'
        onClick={() => handleSuggestionsClick()}
      >
        {isLoading ? 'Loading...' : 'Get Suggestions'}
      </button>
    </div>
  );
}
