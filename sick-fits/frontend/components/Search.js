import { useState } from 'react';
import { useRouter } from 'next/router';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';
import { useCombobox, resetIdCounter } from 'downshift';
import { searchProductsQuery } from '../lib/query/product';
import { useQuery } from 'react-query';
import debounce from 'lodash.debounce';
import { client } from '../lib/api-client';

function Search() {
	resetIdCounter();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearh = debounce(setSearchTerm, 350);
	const { data: items, isLoading } = useQuery({
		queryKey: ['products-search', { searchTerm }],
		queryFn: () =>
			client('', { method: 'POST', query: searchProductsQuery(searchTerm) }).then(
				({ data }) => data.searchTerms
			),
		placeholderData: []
	});
	const {
		inputValue,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		getItemProps,
		highlightedIndex,
		isOpen
	} = useCombobox({
		items,
		onInputValueChange({ inputValue }) {
			debounceSearh(inputValue);
		},
		onSelectedItemChange({ selectedItem }) {
			router.push({
				pathname: `/product/${selectedItem.id}`
			});
		},
		itemToString(item) {
			if (!item) return '';
			return item.name;
		}
	});

	return (
		<SearchStyles>
			<div {...getComboboxProps()}>
				<input
					{...getInputProps({
						type: 'search',
						placeholder: 'Search for an Item',
						id: 'search',
						className: 'loading'
					})}
				/>
			</div>
			<DropDown {...getMenuProps()}>
				{isOpen
					? items?.map((el, i) => (
							<DropDownItem
								key={el.id}
								{...getItemProps({ item: el })}
								highlighted={i === highlightedIndex}
							>
								<img src={el.photo.image.publicUrlTransformed} alt={el.name} width='50' />
								{el.name}
							</DropDownItem>
					  ))
					: null}
				{isOpen && items.length < 1 && !isLoading ? (
					<DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
				) : null}
			</DropDown>
		</SearchStyles>
	);
}

export default Search;
