import { useUnit } from 'effector-react';
import { Input } from '@lm-client/shared/ui';
import * as model from './model';

export const SearchUser = () => {
  const [search, handleChangeSearch, handleSubmitForm] = useUnit([
    model.$searchInput,
    model.searchInputChanged,
    model.searchFormSubmitted,
  ]);

  return (
    <form
      className="flex h-50 flex-col items-center justify-center px-5"
      onSubmit={(e) => (e.preventDefault(), handleSubmitForm())}
    >
      <Input
        value={search}
        onChange={(e) => handleChangeSearch(e.target.value)}
        className="w-full"
        size="sm"
        color="blue"
        placeholder="Search users..."
      />
    </form>
  );
};
