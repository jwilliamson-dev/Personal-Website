import {
  Autocomplete,
  AutocompleteRenderOptionState,
  Box,
  Chip,
  FormControl,
  MenuItem,
  styled,
  TextField,
  useTheme,
} from '@mui/material'

import type { SortOrder } from '../pages/Projects'
import Select from './Select'

interface Props {
  keywordFilter: {
    options: string[]
    setter: React.Dispatch<React.SetStateAction<string[]>>
    value: string[]
  }
  sortOrder: {
    options: SortOrder[]
    setter: React.Dispatch<React.SetStateAction<SortOrder>>
    value: string
  }
  typeFilter: {
    options: string[]
    setter: React.Dispatch<React.SetStateAction<string>>
    value: string
  }
}

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  backgroundColor: theme.palette.secondary.main,
  margin: '10px 0 10px 0',
  padding: '5px 15px 5px 15px',
  borderRadius: '20px',
  gap: '10px',
}))

const SearchBarItem = styled(FormControl)(({ theme }) => ({
  minWidth: '150px',
  maxWidth: '300px',
  color: theme.palette.text.primary,
  '&& .Mui-focused': {
    color: theme.palette.text.primary,
  },
}))

const handleChange = <T,>(
  value: T,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  setter(value)
}

const renderOption = (
  optionProps: React.HTMLAttributes<HTMLLIElement> & {
    key: string
  },
  value: string,
  state: AutocompleteRenderOptionState
) => {
  const isSelected = state.selected
  const { key, ...props } = optionProps

  return (
    <MenuItem {...props} key={key} sx={{ textWrap: 'wrap' }}>
      {isSelected ? <strong>{value}</strong> : value}
    </MenuItem>
  )
}

const renderAutocompleteTags = (selected: string[]) => (
  <>
    {selected.map((value) => (
      <Chip key={value} label={value} />
    ))}
  </>
)

const ProjectSearchBar = (props: Props) => {
  const { keywordFilter, typeFilter, sortOrder } = props
  const theme = useTheme()
  const fieldStyle = {
    // This works on the Select fields
    '&&:after': {
      borderBottomColor: theme.palette.secondary.dark,
    },
    // This works on the Autocomplete field
    '&& :after': {
      borderBottomColor: theme.palette.secondary.dark,
    },
  }

  return (
    <SearchBar>
      {/* Keyword Filter */}
      <SearchBarItem variant="standard">
        <Autocomplete
          multiple
          disableCloseOnSelect
          id="keyword-filter-select"
          options={keywordFilter.options}
          renderOption={renderOption}
          value={keywordFilter.value}
          renderInput={(p) => (
            <TextField {...p} variant="standard" label="Keyword Filter" />
          )}
          renderTags={renderAutocompleteTags}
          onChange={(_e, v) => {
            handleChange(v, keywordFilter.setter)
          }}
          sx={fieldStyle}
        />
      </SearchBarItem>

      {/* Type Filter */}
      <SearchBarItem variant="standard">
        <Select
          handleChange={typeFilter.setter}
          id="type-filter"
          label="Type Filter"
          options={typeFilter.options}
          value={typeFilter.value}
          sx={fieldStyle}
        />
      </SearchBarItem>

      {/* Sort Order */}
      <SearchBarItem variant="standard">
        <Select
          handleChange={sortOrder.setter}
          id="sort-order"
          label="Sort Order"
          options={sortOrder.options}
          value={sortOrder.value}
          sx={fieldStyle}
        />
      </SearchBarItem>
    </SearchBar>
  )
}

export default ProjectSearchBar
