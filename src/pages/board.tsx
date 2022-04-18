import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchList } from 'src/sagas/sagaBoard'
import { writeBBS, deleteBBS } from 'src/services/board'
import Input from '../components/forms/Input'

import type { NextPage } from 'next'
import type { ReactElement, ReactNode, MouseEventHandler } from 'react'
import type { State } from 'src/interface/state'
import type { BoardResponse } from 'src/services/board'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Board: NextPageWithLayout = () => {
  const dispatch = useDispatch()
  const { bbsList } = useSelector((state: State) => ({
    bbsList: state.board.bbsList,
  }))
  const [inputs, setInputs] = useState({
    title: '',
    body: '',
  })
  const { title, body } = inputs

  useEffect(() => {
    loadBBS()
  }, [])

  const loadBBS = () => {
    dispatch(fetchList())
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onWrite = async (): Promise<void> => {
    const result = await writeBBS({ title, body })
    if (result) {
      setInputs({ title: '', body: '' })
      loadBBS()
    }
  }

  const onDelete = async (id?: number): Promise<void> => {
    const result = await deleteBBS(id!)
    if (result) {
      loadBBS()
    }
  }

  return (
    <>
      <section>Board</section>
      <section>
        <Input type="text" name="title" onChange={onChange} value={title} />
        <Input type="text" name="body" onChange={onChange} value={body} />
        <button type="button" onClick={onWrite}>
          write
        </button>
        <ul>
          {bbsList.map(
            (data: BoardResponse): React.ReactNode => (
              <li key={data.bbs_id}>
                {data.bbs_id} {data.title} {data.body} <button onClick={() => onDelete(data.bbs_id)}>del</button>
              </li>
            ),
          )}
        </ul>
        <div>
          <button onClick={loadBBS}>get bbs</button>
        </div>
      </section>
    </>
  )
}

export default Board