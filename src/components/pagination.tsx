/**
 * @name          Pagination
 * @version       1.0.0
 *
 * @fileoverview  Components and functions relating to the pagination process
 */

import React, {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import {
  Button,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

/**
 * simple typedef for useState set hook
 */
type Setter = Dispatch<SetStateAction<number>>

/**
 * Generate a query param for pagination
 * @param size of page
 * @param page to render
 * @returns query param
 */
export const Paginate = (size: number, page: number): string =>
  `pageSize=${size}&page=${page}`

/**
 * PaginationController properties
 */
interface IProps {
  initialState: IPageHandle
  SetState: (state: IPageHandle) => void
}

export interface IPageHandle {
  page: number
  size: number
}

export const DEFAULT_PAGE_SIZE: number = 12
export const MAX_PAGE_SIZE: number = 42
export const DEFAULT_PAGE: number = 0

/**
 * Updates pages
 * @param props component properties
 * @returns A pagination controller component
 */
export const PaginationController = (props: IProps): ReactElement => {
  const [Page, SetPage] = useState<number>(props.initialState.page)
  const [PageSize, SetPageSize] = useState<number>(props.initialState.size)

  /**
   * Handles changes to the page size input
   * @param event details relating to change
   */
  const HandleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const input: number = parseInt(event.target.value)
    if (!isNaN(input) && input > 0 && input < MAX_PAGE_SIZE) {
      SetPageSize(input)
      SetPage(0) // reset page to save extra validation
    }
  }

  const HandleClick = (step: number): void => {
    const change: number = Page + step
    if (change >= 0 && change <= MAX_PAGE_SIZE) {
      SetPage(change)
    }
  }

  useEffect(
    () => props.SetState({ page: Page, size: PageSize }),
    [Page, PageSize]
  )

  return (
    <>
      <section
        style={{
          display: 'flex',
          gap: '1em',
          height: '2em',
          alignItems: 'center',
        }}
      >
        <Input
          style={{ width: '3.5em' }}
          onChange={HandleChange}
          placeholder="size"
        />
        <br />
        <Button onClick={() => HandleClick(-1)}>{'<'}</Button>
        <p style={{ margin: '0' }}>{Page}</p>
        <Button onClick={() => HandleClick(1)}>{'>'}</Button>
      </section>
    </>
  )
}
