import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
  InputLabel,
  MenuItem,
  Popper as MuiPopper,
  Select as MuiSelect,
  styled,
  SxProps,
  Theme,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'

interface Props<T extends string | number> {
  handleChange: React.Dispatch<React.SetStateAction<T>>
  id: string
  label: string
  options: T[]
  value: string
  sx?: SxProps<Theme>
}

const Popper = styled(MuiPopper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

const Select = <T extends string | number>(props: Props<T>) => {
  const [width, setWidth] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const selectRef = useRef<HTMLElement>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'select-popper' : undefined

  const handleSelectClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement

    props.handleChange(props.options[target.value])
    setAnchorEl(null)
  }

  const handleClickAway = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (selectRef.current) {
      setWidth(selectRef.current.offsetWidth)
    }
  }, [])

  return (
    <>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <MuiSelect
        ref={selectRef}
        labelId={`${props.id}-label`}
        id={props.id}
        value={props.value}
        label={props.label}
        open={false}
        IconComponent={open ? ArrowDropUp : ArrowDropDown}
        onClick={handleSelectClick}
        sx={props.sx}
      >
        {props.options.map((v, i) => (
          <MenuItem value={v} key={i}>
            {v}
          </MenuItem>
        ))}
      </MuiSelect>
      {open && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            sx={{ width: `${width.toString()}px` }}
          >
            {props.options.map((v, i) => {
              const isSelected = v === props.value
              return (
                <MenuItem
                  value={i}
                  key={i}
                  onClick={handleMenuItemClick}
                  selected={isSelected}
                >
                  {isSelected ? <strong>{v}</strong> : v}
                </MenuItem>
              )
            })}
          </Popper>
        </ClickAwayListener>
      )}
    </>
  )
}

export default Select
