import {
  Autocomplete,
  AutocompleteRenderInputParams,
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
  padding: '5px 0 5px 0',
  borderRadius: '20px',
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
    <MenuItem {...props} key={key}>
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

const renderInput = (params: AutocompleteRenderInputParams) => (
  <TextField {...params} variant="standard" label="Keyword Filter" />
)

const ProjectSearchBar = (props: Props) => {
  const { keywordFilter, typeFilter, sortOrder } = props
  const theme = useTheme()
  const fieldStyle = {
    '&& ::after': {
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
          renderInput={renderInput}
          renderTags={renderAutocompleteTags}
          onChange={(_e, v) => {
            handleChange(v, keywordFilter.setter)
          }}
          sx={fieldStyle}
        />
      </SearchBarItem>

      {/* Type Filter */}
      <SearchBarItem variant="standard">
        <Autocomplete
          disableClearable
          id="type-filter-select"
          options={typeFilter.options}
          renderOption={renderOption}
          value={typeFilter.value}
          renderInput={renderInput}
          onChange={(_e, v) => {
            handleChange(v, typeFilter.setter)
          }}
          sx={fieldStyle}
        />
      </SearchBarItem>

      {/* Sort Order */}
      <SearchBarItem variant="standard">
        <Autocomplete
          disableClearable
          id="sort-order-select"
          options={sortOrder.options}
          renderOption={renderOption}
          value={sortOrder.value}
          renderInput={renderInput}
          onChange={(_e, v) => {
            sortOrder.setter(v as SortOrder)
          }}
          sx={fieldStyle}
        />
      </SearchBarItem>
    </SearchBar>
  )
}

export default ProjectSearchBar
