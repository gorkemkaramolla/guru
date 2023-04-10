import { Input } from '@nextui-org/react';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {
  return (
    <>
      <Input
        clearable
        contentRightStyling={false}
        placeholder='Search...'
        contentRight={<FiSearch className='mr-2' />}
      />
    </>
  );
}
export default SearchBar;
